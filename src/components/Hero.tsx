'use client';

import { motion } from 'framer-motion';
import { Play, Sparkles, Target, Shield, FileCode } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const miniCards = [
    { label: 'Role', icon: Sparkles, color: 'text-purple-400' },
    { label: 'Objective', icon: Target, color: 'text-blue-400' },
    { label: 'Constraints', icon: Shield, color: 'text-amber-400' },
    { label: 'Output', icon: FileCode, color: 'text-emerald-400' },
];

export default function Hero() {
    const { user } = useAuth();
    const router = useRouter();
    return (
        <section className="relative pt-28 pb-24 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 grid-pattern opacity-60" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Badge */}
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-center mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                        Now in Public Beta
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
                >
                    Programmable Prompts for
                    <br />
                    <span className="gradient-text">Every AI Model.</span>
                </motion.h1>

                {/* Subline */}
                <motion.p
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Stop writing prose. Start engineering prompts. Brain Prompt Generator
                    converts your idea into a structured 4-part prompt for maximum accuracy and reliability.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <button
                        onClick={() => {
                            if (user) router.push('/dashboard');
                            else router.push('/login');
                        }}
                        className="px-6 py-3 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    >
                        Start generating prompts
                    </button>
                </motion.div>

                {/* Hero Visual - Brain Prompt Generator Mock UI */}
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 80 }}
                    className="relative max-w-4xl mx-auto"
                >
                    {/* Glow effect */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-3xl glow-pulse" />

                    {/* Main Panel */}
                    <div className="relative bg-slate-900 rounded-xl overflow-hidden soft-shadow float-animation border border-slate-700">
                        {/* Header */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-3 text-xs font-mono text-slate-400">brain-prompt-generator</span>
                        </div>

                        {/* Content */}
                        <div className="p-6 lg:p-8">
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* Left - Input */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                        Describe your task
                                    </label>
                                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 min-h-[160px]">
                                        <p className="text-slate-300 font-mono text-sm leading-relaxed">
                                            Write a product description for a new AI-powered code editor
                                            that helps developers write better code faster. Focus on
                                            enterprise customers and highlight security features.
                                            <span className="cursor-blink text-indigo-400 ml-0.5">|</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Right - 4 Mini Cards */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                        Generated Structure
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {miniCards.map((card) => (
                                            <div
                                                key={card.label}
                                                className="bg-slate-800 rounded-lg p-3 border border-slate-700 hover:border-slate-600 transition-colors"
                                            >
                                                <card.icon className={`w-4 h-4 ${card.color} mb-2`} />
                                                <p className="text-xs font-semibold text-slate-300">{card.label}</p>
                                                <p className="text-xs text-slate-500 mt-1">Auto-generated</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <div className="mt-6 flex justify-center">
                                <button className="px-8 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg transition-all">
                                    Generate Prompt
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
