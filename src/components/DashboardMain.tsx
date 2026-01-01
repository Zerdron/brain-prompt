'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Copy,
    Bookmark,
    ExternalLink,
    Sparkles,
    ChevronDown,
    Loader2,
    Check
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { generatePrompt } from '@/lib/n8n';
import { toast } from 'sonner';

interface DashboardMainProps {
    initialPrompt?: string;
    initialOutput?: string;
    onHistoryUpdated?: () => void;
    userRole?: 'user' | 'developer' | null;
    subscriptionStatus?: string | null;
}

export default function DashboardMain({ initialPrompt, initialOutput, onHistoryUpdated, userRole, subscriptionStatus }: DashboardMainProps) {
    const [input, setInput] = useState(initialPrompt || '');
    const [isGenerating, setIsGenerating] = useState(false);
    const [output, setOutput] = useState(initialOutput || '');
    const [model, setModel] = useState('Google Gemini 1.5 Pro');

    const [hasReachedLimit, setHasReachedLimit] = useState(false);
    const [usageCount, setUsageCount] = useState<number | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (initialPrompt) setInput(initialPrompt);
        if (initialOutput) setOutput(initialOutput);
    }, [initialPrompt, initialOutput]);

    useEffect(() => {
        const checkInitialLimit = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.id) {
                await checkUsageLimit(session.user.id, false);
            }
        };
        checkInitialLimit();
    }, []);

    const checkUsageLimit = async (userId: string, showToast = true) => {
        // Bypass for Developers and Elite Subscribers
        if (userRole === 'developer' || subscriptionStatus === 'elite') return true;

        const now = new Date();
        let startDate: Date;
        let limit: number;

        if (subscriptionStatus === 'pro') {
            // Pro: 200 generations per month
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            startDate.setHours(0, 0, 0, 0);
            limit = 200;
        } else {
            // Free: 2 generations per day
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            limit = 2;
        }

        try {
            const { count, error } = await supabase
                .from('generations')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
                .gte('created_at', startDate.toISOString());

            if (error) {
                console.error('Error checking usage limit:', error);
                return true; // Allow on error to be safe
            }

            setUsageCount(count);

            if (count !== null && count >= limit) {
                setHasReachedLimit(true);
                if (showToast) {
                    const period = subscriptionStatus === 'pro' ? 'monthly' : 'daily';
                    toast.error(`${period.charAt(0).toUpperCase() + period.slice(1)} limit reached (${count}/${limit}). Upgrade for more.`);
                }
                return false;
            } else {
                setHasReachedLimit(false);
            }

            return true;
        } catch (err) {
            console.error('Unexpected error checking limit:', err);
            return true;
        }
    };

    const handleGenerate = async () => {
        if (!input.trim()) return;

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const userId = session?.user.id || '00000000-0000-0000-0000-000000000000'; // Valid UUID for dev mode

            // Check Usage Limit First
            const canProceed = await checkUsageLimit(userId);
            if (!canProceed) return;

            setIsGenerating(true);
            // Move setOutput('') down so we don't clear the last result if the next one fails

            // Call n8n Webhook
            const response = await generatePrompt(input, model, userId);
            console.log('Raw n8n response:', response);

            // Handle both array and object responses
            const data = Array.isArray(response) ? response[0] : response;

            // Strict Validation: check for empty data or {}
            if (!data || Object.keys(data).length === 0) {
                toast.error("AI provider returned an empty response. Please check your n8n workflow.");
                // Keep the loading state as requested, so we do NOT set isGenerating(false)
                // We also do not clear the output panel
                return;
            }

            // If we have data, we can clear the previous output and show the new one
            setOutput('');

            // Check if data has 'output_json' field (common if returning from DB or specific n8n node)
            if (data.output_json) {
                try {
                    let jsonString = data.output_json;

                    // Clean Markdown code blocks if present
                    if (typeof jsonString === 'string') {
                        jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
                    }

                    const parsed = typeof jsonString === 'string'
                        ? JSON.parse(jsonString)
                        : jsonString;

                    // Merge parsed fields into data
                    Object.assign(data, parsed);
                    console.log('Parsed output_json:', parsed);
                } catch (e) {
                    console.error('Failed to parse output_json string:', e);
                }
            }

            // Format Response (assuming n8n returns structured JSON)

            // Strict Response Validation for required fields
            if (!data.role || !data.objective) {
                console.error('Invalid n8n response structure:', data);
                throw new Error('Neural link returned incomplete data. Please check your n8n workflow.');
            }

            const role = data.role;
            const objective = data.objective;

            let constraints = 'No constraints provided.';
            if (Array.isArray(data.constraints)) {
                constraints = data.constraints.map((c: string) => `- ${c}`).join('\n');
            } else if (typeof data.constraints === 'string') {
                constraints = data.constraints;
            }

            let instructions = 'No instructions provided.';
            // Handle both output_structure (preferred) and output_format
            const rawInstructions = data.output_structure || data.output_format;
            if (Array.isArray(rawInstructions)) {
                instructions = rawInstructions.map((i: string, index: number) => `${index + 1}. ${i}`).join('\n');
            } else if (typeof rawInstructions === 'string') {
                instructions = rawInstructions;
            }

            const formattedResult = `// Generated for: ${input}

[SYSTEM_ROLE]
${role}

[OBJECTIVE]
${objective}

[CONSTRAINTS]
${constraints}

[INSTRUCTIONS]
${instructions}`;

            setOutput(formattedResult);
            toast.success("Prompt synthesized successfully!");

            // Re-check limit to update count
            await checkUsageLimit(userId, false);

            // Save to Supabase (History)
            if (session || process.env.NODE_ENV === 'development') {
                const finalUserId = session?.user?.id || '00000000-0000-0000-0000-000000000000';
                const { error } = await supabase.from('generations').insert({
                    user_id: finalUserId,
                    input_text: input,
                    output_text: formattedResult,
                    model: model,
                });
                if (error) {
                    console.error('Error saving generation:', error);
                }
                onHistoryUpdated?.();
            }

        } catch (error) {
            console.error('Generation failed:', error);
            if (error instanceof Error && error.message.includes('Network Error')) {
                toast.error("Neural link failed (Network Error)");
            } else {
                toast.error("Generation failed. Please try again.");
            }
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        toast.success("Copied to clipboard!");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="flex-1 flex flex-col md:flex-row h-screen overflow-hidden">
            {/* Left Column: Input */}
            <div className="w-full md:w-1/2 flex flex-col bg-white border-r border-slate-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Input Context</span>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-6 text-slate-900">
                    <div className="space-y-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g. Act as a senior copywriter and write a thread about..."
                            className="w-full h-64 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none resize-none font-sans text-slate-900 placeholder:text-slate-400 text-base"
                        />
                    </div>

                    {userRole === 'developer' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="relative group">
                                <select
                                    value={model}
                                    disabled
                                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-not-allowed opacity-70 font-medium"
                                >
                                    <option>Google Gemini 1.5 Pro</option>
                                </select>
                                <span className="absolute right-8 top-1/2 -translate-y-1/2 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                            <div className="relative group">
                                <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                    <option>Professional</option>
                                    <option>Witty</option>
                                    <option>Academic</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                            <div className="relative group">
                                <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                    <option>JSON</option>
                                    <option>Markdown</option>
                                    <option>Plain Text</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {/* Usage Limit Indicator */}
                    {subscriptionStatus !== 'elite' && userRole !== 'developer' && (
                        <div className="flex items-center justify-between text-xs px-1">
                            <span className="text-slate-500 font-medium">
                                {subscriptionStatus === 'pro' ? (
                                    <>Pro Plan: <span className={hasReachedLimit ? "text-red-500" : "text-emerald-600"}>{usageCount ?? 0}/200</span> monthly prompts remaining</>
                                ) : (
                                    <>Free Tier: <span className={hasReachedLimit ? "text-red-500" : "text-slate-700"}>{usageCount ?? 0}/2</span> daily prompts remaining</>
                                )}
                            </span>
                            {hasReachedLimit && (
                                <button
                                    onClick={() => window.location.href = '/#pricing'}
                                    className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                                >
                                    <Sparkles className="w-3 h-3" /> Upgrade
                                </button>
                            )}
                        </div>
                    )}

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !input.trim() || hasReachedLimit}
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
                    >
                        {isGenerating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        )}
                        {hasReachedLimit
                            ? (subscriptionStatus === 'pro' ? 'Monthly Limit Reached' : 'Daily Limit Reached')
                            : (isGenerating ? 'Thinking...' : 'Generate Prompt')
                        }
                    </button>
                </div>
            </div>

            {/* Right Column: Output */}
            <div className="w-full md:w-1/2 flex flex-col bg-[#0F172A] relative overflow-hidden">
                <div className="px-4 py-2 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5 px-2">
                            <div className="w-3 h-3 rounded-full bg-slate-700" />
                            <div className="w-3 h-3 rounded-full bg-slate-700" />
                            <div className="w-3 h-3 rounded-full bg-slate-700" />
                        </div>
                        <div className="h-8 px-4 flex items-center bg-[#0F172A] border-x border-slate-800 rounded-t-md">
                            <span className="text-xs font-mono text-slate-300">output_prompt.md</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={copyToClipboard}
                            disabled={!output}
                            className="p-1.5 text-slate-400 hover:text-white transition-colors disabled:opacity-30" title="Copy"
                        >
                            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-white transition-colors disabled:opacity-30" title="Save" disabled={!output}>
                            <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-white transition-colors disabled:opacity-30" title="Open in Playground" disabled={!output}>
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-6 font-mono text-sm relative overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {isGenerating ? (
                            <motion.div
                                key="thinking"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col gap-6"
                            >
                                <div className="space-y-4">
                                    <div className="h-4 bg-slate-800/50 rounded w-3/4 animate-pulse relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
                                    </div>
                                    <div className="h-4 bg-slate-800/50 rounded w-1/2 animate-pulse relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
                                    </div>
                                    <div className="h-4 bg-slate-800/50 rounded w-5/6 animate-pulse relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
                                    </div>
                                    <div className="h-4 bg-slate-800/50 rounded w-2/3 animate-pulse relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
                                    </div>
                                </div>
                                <div className="mt-auto flex items-center justify-center text-slate-500 gap-3">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                                    </div>
                                    <span className="text-xs tracking-widest uppercase">Thinking...</span>
                                </div>
                            </motion.div>
                        ) : output ? (
                            <motion.div
                                key="output"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-slate-300 selection:bg-indigo-500/30"
                            >
                                <pre className="whitespace-pre-wrap break-words">
                                    {output.split('\n').map((line, i) => {
                                        let className = "";
                                        if (line.trim().startsWith('[')) className = "text-indigo-400 font-bold";
                                        else if (line.trim().startsWith('//')) className = "text-slate-500 italic";
                                        else if (line.trim().startsWith('-')) className = "text-emerald-400";

                                        return (
                                            <div key={i} className={className}>
                                                {line || '\u00A0'}
                                            </div>
                                        );
                                    })}
                                </pre>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                                    <Sparkles className="w-8 h-8 opacity-20 text-indigo-400" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-500 mb-1">Waiting for your idea...</p>
                                    <p className="text-xs text-slate-600">Enter a topic to generate a prompt</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
