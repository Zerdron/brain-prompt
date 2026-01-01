'use client';

import { motion } from 'framer-motion';
import { Terminal, Cpu, Shield, FileCode } from 'lucide-react';

const steps = [
    {
        icon: Terminal,
        label: '01_Input',
        title: 'User describes task.',
        description: 'Natural language input',
    },
    {
        icon: Cpu,
        label: '02_Interpret',
        title: 'AI analyzes intent.',
        description: 'Context extraction',
        animated: true,
    },
    {
        icon: Shield,
        label: '03_Structure',
        title: 'Rules & constraints applied.',
        description: 'Tone, limits, format',
    },
    {
        icon: FileCode,
        label: '04_Output',
        title: 'Generate structured prompt.',
        description: 'Production-ready output',
    },
];

export default function HowItWorks() {
    return (
        <section id="product" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-medium text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100">
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        A Pipeline for Prompts
                    </h2>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">
                        Four stages transform your description into a production-ready prompt.
                    </p>
                </motion.div>

                {/* Pipeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting line */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-200" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex flex-col items-center text-center"
                            >
                                {/* Node */}
                                <div
                                    className={`
                    relative z-10 w-14 h-14 rounded-lg bg-white border border-slate-200 
                    flex items-center justify-center mb-5 soft-shadow
                    ${step.animated ? 'node-pulse' : ''}
                  `}
                                >
                                    <step.icon className="w-6 h-6 text-indigo-600" />
                                </div>

                                {/* Label */}
                                <span className="font-mono text-xs text-slate-400 mb-2 tracking-wider">
                                    {step.label}
                                </span>

                                {/* Title */}
                                <h3 className="text-base font-semibold text-slate-900 mb-1">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-500">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Output Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 max-w-2xl mx-auto"
                >
                    <div className="code-block rounded-lg p-6 soft-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-mono text-slate-500">output.json</span>
                            <span className="px-2 py-0.5 text-xs font-mono text-emerald-400 bg-emerald-400/10 rounded">
                                Ready
                            </span>
                        </div>
                        <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
                            <code>
                                <span className="text-slate-500">{'{'}</span>{'\n'}
                                <span className="text-slate-400">  </span>
                                <span className="syntax-property">&quot;role&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className="syntax-string">&quot;Senior Marketing Strategist&quot;</span>
                                <span className="text-slate-400">,</span>{'\n'}
                                <span className="text-slate-400">  </span>
                                <span className="syntax-property">&quot;objective&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className="syntax-string">&quot;Write compelling copy...&quot;</span>
                                <span className="text-slate-400">,</span>{'\n'}
                                <span className="text-slate-400">  </span>
                                <span className="syntax-property">&quot;constraints&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className="text-slate-500">{'['}</span>
                                <span className="syntax-string">&quot;Professional tone&quot;</span>
                                <span className="text-slate-500">{']'}</span>
                                <span className="text-slate-400">,</span>{'\n'}
                                <span className="text-slate-400">  </span>
                                <span className="syntax-property">&quot;output&quot;</span>
                                <span className="text-slate-400">: </span>
                                <span className="syntax-string">&quot;Markdown format&quot;</span>{'\n'}
                                <span className="text-slate-500">{'}'}</span>
                            </code>
                        </pre>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
