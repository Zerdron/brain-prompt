'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const tabs = ['Marketing', 'Coding', 'E-commerce'];

const examples = {
    Marketing: {
        input: 'Write a product launch email for our new AI analytics dashboard targeting enterprise CTOs.',
        output: {
            role: 'Senior Marketing Strategist with B2B SaaS expertise',
            objective: 'Create a compelling product launch email that drives demo requests',
            constraints: 'Professional tone, emphasize ROI and time savings, include one clear CTA, under 300 words',
            output: 'Email format with subject line, preview text, body with 3 key benefits, and CTA button text',
        },
    },
    Coding: {
        input: 'Help me refactor this React component to use hooks instead of class components.',
        output: {
            role: 'Senior React Developer with 5+ years experience',
            objective: 'Convert class component to functional component with hooks while maintaining all functionality',
            constraints: 'Use TypeScript, follow React best practices, preserve existing prop types, add comments for complex logic',
            output: 'Complete refactored component code with explanatory comments',
        },
    },
    'E-commerce': {
        input: 'Generate product descriptions for a premium wireless headphone.',
        output: {
            role: 'E-commerce Copywriter specializing in consumer electronics',
            objective: 'Write persuasive product descriptions that highlight features and drive conversions',
            constraints: 'SEO-optimized, include technical specs naturally, emotional appeal, 150-200 words',
            output: 'Product title, bullet points for features, short description, and long description',
        },
    },
};

export default function Examples() {
    const [activeTab, setActiveTab] = useState('Marketing');
    const example = examples[activeTab as keyof typeof examples];

    return (
        <section id="examples" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-medium text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100">
                        Examples
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        See It In Action
                    </h2>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">
                        Real examples across different use cases.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-10">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === tab
                                    ? 'tab-active'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Example Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
                >
                    {/* Left: Input */}
                    <div className="bg-white rounded-lg border border-slate-200 p-6 soft-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                                User Input
                            </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                            &ldquo;{example.input}&rdquo;
                        </p>
                    </div>

                    {/* Right: Output */}
                    <div className="bg-slate-900 rounded-lg p-6 soft-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                                Generated Prompt
                            </span>
                        </div>
                        <div className="space-y-4 font-mono text-sm">
                            <div>
                                <span className="text-indigo-400">Role:</span>
                                <span className="text-slate-300 ml-2">{example.output.role}</span>
                            </div>
                            <div>
                                <span className="text-blue-400">Objective:</span>
                                <span className="text-slate-300 ml-2">{example.output.objective}</span>
                            </div>
                            <div>
                                <span className="text-amber-400">Constraints:</span>
                                <span className="text-slate-300 ml-2">{example.output.constraints}</span>
                            </div>
                            <div>
                                <span className="text-emerald-400">Output:</span>
                                <span className="text-slate-300 ml-2">{example.output.output}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
