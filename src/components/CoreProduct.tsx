'use client';

import { motion } from 'framer-motion';
import { Sparkles, Target, Shield, FileCode } from 'lucide-react';

const cards = [
    {
        icon: Sparkles,
        title: 'Role',
        description: 'Define who the AI should act as.',
        example: 'Senior Marketing Strategist',
        color: 'from-purple-500 to-indigo-500',
    },
    {
        icon: Target,
        title: 'Objective',
        description: 'Clarify the mission.',
        example: 'Write compelling product copy',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Shield,
        title: 'Constraints',
        description: 'Tone, rules, limits, formatting.',
        example: 'Professional, <500 words',
        color: 'from-amber-500 to-orange-500',
    },
    {
        icon: FileCode,
        title: 'Output Structure',
        description: 'Control the final format.',
        example: 'Markdown with headers',
        color: 'from-emerald-500 to-teal-500',
    },
];

export default function CoreProduct() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-medium text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100">
                        The 4-Part Brain Model
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Structured Prompt Engineering
                    </h2>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">
                        Every great prompt needs four essential components.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-lg border border-slate-200 p-6 card-glow"
                        >
                            {/* Icon */}
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                                <card.icon className="w-5 h-5 text-white" />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-slate-600 mb-4">
                                {card.description}
                            </p>

                            {/* Example */}
                            <div className="px-3 py-2 bg-slate-50 rounded border border-slate-100">
                                <p className="text-xs font-mono text-slate-500">{card.example}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
