'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, ShieldCheck, Lock } from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicy() {
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

                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Cookie Policy</h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-600 leading-relaxed mb-12">
                            BrainPrompt uses cookies to manage user sessions (via Supabase) and handle secure payments (via LemonSqueezy).
                        </p>

                        <div className="grid gap-8">
                            <section className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <Lock className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-900">Essential Cookies</h2>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    Necessary for login and security. Without these, the Dashboard will not function. These cookies are automatically provided by our authentication partner, Supabase, to keep you signed in securely.
                                </p>
                            </section>

                            <section className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-900">Analytical Cookies</h2>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    Used to improve our n8n workflows and AI response quality. We analyze anonymized usage data to understand which features are most valuable and where the AI engine can be optimized.
                                </p>
                            </section>

                            <section className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <Cookie className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-900">Marketing Cookies</h2>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    Used by our payment processor, LemonSqueezy, to manage subscriptions and prevent fraud. These help verify your identity during checkout and ensure your subscription status is accurately recorded.
                                </p>
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
