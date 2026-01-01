'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Terminal, Globe, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminView() {
    const [webhookUrl, setWebhookUrl] = useState('https://n8n.srv1185915.hstgr.cloud/webhook/...');
    const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant...');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call to update settings
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast.success("Admin configuration updated successfully!");
    };

    return (
        <div className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-rose-600" />
                        Admin Developer Panel
                    </h1>
                    <p className="text-slate-500 mt-1">Configure global application parameters and neural link settings.</p>
                </div>

                <div className="grid gap-6">
                    {/* Webhook Configuration */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">n8n Webhook URL</h3>
                                <p className="text-xs text-slate-500">The neural link endpoint for prompt generation.</p>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="https://..."
                        />
                    </motion.div>

                    {/* System Prompt Editor */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                <Terminal className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900">Global System Prompt</h3>
                                <p className="text-xs text-slate-500">Override the base persona for all generated prompts.</p>
                            </div>
                        </div>
                        <textarea
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            className="w-full h-48 p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
                            placeholder="Act as a..."
                        />
                    </motion.div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Configuration</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
