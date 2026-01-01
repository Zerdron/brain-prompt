'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCcw, HelpCircle, Mail, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-6 py-20 lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Refund Policy</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-600 leading-relaxed mb-12">
                            Our priority is customer satisfaction, but as BrainPrompt provides non-tangible, irrevocable digital goods, we maintain a structured refund policy for our Pro and Elite plans.
                        </p>

                        <div className="space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-0">General Terms</h2>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    As BrainPrompt provides non-tangible, irrevocable digital goods (AI-generated credits), we generally do not issue refunds once a Pro or Elite plan is active and credits have been used. This ensures the sustainability of our high-quality AI inference engines.
                                </p>
                            </section>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-6">
                                        <RefreshCcw className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Cooling-off Period</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Refund requests may be considered within 48 hours of purchase if no credits have been used. Once credit consumption begins, the product is considered "delivered."
                                    </p>
                                </div>

                                <div className="p-8 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-6">
                                        <HelpCircle className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Technical Issues</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        If a verified system error on our end (n8n or database failure) prevents usage for more than 48 hours, a partial refund may be issued at our discretion.
                                    </p>
                                </div>
                            </div>

                            <section className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold mb-4">How to Request</h2>
                                    <p className="text-slate-300 mb-6 max-w-lg">
                                        For all refund inquiries or issues with your account, please reach out to our dedicated support team.
                                    </p>
                                    <a
                                        href="mailto:support@brainprompt.com"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
                                    >
                                        <Mail className="w-5 h-5" />
                                        support@brainprompt.com
                                    </a>
                                </div>
                                {/* Subtle background glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                            </section>
                        </div>

                        <div className="mt-16 pt-8 border-t border-slate-100 text-sm text-slate-500">
                            Last updated: December 28, 2025
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
