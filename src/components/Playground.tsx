'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';

interface PromptConfig {
    role: string;
    objective: string;
    constraints: string;
    outputFormat: string;
    strictMode: boolean;
    verboseMode: boolean;
}

export default function Playground() {
    const [config, setConfig] = useState<PromptConfig>({
        role: 'Senior Software Engineer',
        objective: 'Review and optimize code for performance',
        constraints: 'Focus on time complexity, suggest alternatives',
        outputFormat: 'Markdown with code blocks',
        strictMode: false,
        verboseMode: true,
    });

    const updateConfig = (key: keyof PromptConfig, value: string | boolean) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-medium text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100">
                        Interactive Playground
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Try It Yourself
                    </h2>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">
                        Configure parameters and see the output update in real-time.
                    </p>
                </motion.div>

                {/* Split Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
                >
                    {/* Left: Controls */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6 soft-shadow">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
                            Configuration
                        </h3>

                        <div className="space-y-5">
                            {/* Role */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    value={config.role}
                                    onChange={(e) => updateConfig('role', e.target.value)}
                                    className="w-full px-4 py-2.5 font-mono text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                                />
                            </div>

                            {/* Objective */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Objective
                                </label>
                                <input
                                    type="text"
                                    value={config.objective}
                                    onChange={(e) => updateConfig('objective', e.target.value)}
                                    className="w-full px-4 py-2.5 font-mono text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                                />
                            </div>

                            {/* Constraints */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Constraints
                                </label>
                                <input
                                    type="text"
                                    value={config.constraints}
                                    onChange={(e) => updateConfig('constraints', e.target.value)}
                                    className="w-full px-4 py-2.5 font-mono text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                                />
                            </div>

                            {/* Output Format */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Output Format
                                </label>
                                <input
                                    type="text"
                                    value={config.outputFormat}
                                    onChange={(e) => updateConfig('outputFormat', e.target.value)}
                                    className="w-full px-4 py-2.5 font-mono text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                                />
                            </div>

                            {/* Toggles */}
                            <div className="flex gap-6 pt-2">
                                <div className="flex items-center gap-3">
                                    <Switch.Root
                                        checked={config.strictMode}
                                        onCheckedChange={(checked) => updateConfig('strictMode', checked)}
                                        className="w-10 h-5 bg-slate-200 rounded-full relative data-[state=checked]:bg-indigo-500 transition-colors"
                                    >
                                        <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                                    </Switch.Root>
                                    <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                                        Strict Mode
                                    </label>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Switch.Root
                                        checked={config.verboseMode}
                                        onCheckedChange={(checked) => updateConfig('verboseMode', checked)}
                                        className="w-10 h-5 bg-slate-200 rounded-full relative data-[state=checked]:bg-indigo-500 transition-colors"
                                    >
                                        <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                                    </Switch.Root>
                                    <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                                        Verbose
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Live Preview */}
                    <div className="bg-slate-900 rounded-lg p-6 soft-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Live Preview
                            </h3>
                            <span className="px-2 py-0.5 text-xs font-mono text-emerald-400 bg-emerald-400/10 rounded">
                                JSON
                            </span>
                        </div>

                        <pre className="font-mono text-sm leading-relaxed overflow-auto">
                            <code>
                                <span className="text-slate-500">{'{'}</span>{'\n'}
                                <span className="text-slate-400">  </span>
                                <span className="syntax-property">&quot;role&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className="syntax-string">&quot;{config.role}&quot;</span>
                                <span className="text-slate-400">,</span>{'\n'}
                                <span className="text-slate-400">  </span>
                                <span className="syntax-property">&quot;objective&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className="syntax-string">&quot;{config.objective}&quot;</span>
                                <span className="text-slate-400">,</span>{'\n'}
                                <span className="text-slate-400">  </span>
                                <span className="syntax-property">&quot;constraints&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className="syntax-string">&quot;{config.constraints}&quot;</span>
                                <span className="text-slate-400">,</span>{'\n'}
                                <span className="text-slate-400">  </span>
                                <span className="syntax-property">&quot;outputFormat&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className="syntax-string">&quot;{config.outputFormat}&quot;</span>
                                <span className="text-slate-400">,</span>{'\n'}
                                <span className="text-slate-400">  </span>
                                <span className="syntax-property">&quot;options&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className="text-slate-500">{'{'}</span>{'\n'}
                                <span className="text-slate-400">    </span>
                                <span className="syntax-property">&quot;strictMode&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className={config.strictMode ? 'text-emerald-400' : 'text-rose-400'}>
                                    {String(config.strictMode)}
                                </span>
                                <span className="text-slate-400">,</span>{'\n'}
                                <span className="text-slate-400">    </span>
                                <span className="syntax-property">&quot;verboseMode&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className={config.verboseMode ? 'text-emerald-400' : 'text-rose-400'}>
                                    {String(config.verboseMode)}
                                </span>{'\n'}
                                <span className="text-slate-400">  </span>
                                <span className="text-slate-500">{'}'}</span>{'\n'}
                                <span className="text-slate-500">{'}'}</span>
                            </code>
                        </pre>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
