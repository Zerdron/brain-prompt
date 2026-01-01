'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full text-center border border-slate-200"
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                    Payment Successful!
                </h1>

                <p className="text-slate-600 mb-8">
                    Thank you for upgrading to Pro. Your account has been updated with unlimited access.
                </p>

                <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
                >
                    Return to Dashboard
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </motion.div>
        </div>
    );
}
