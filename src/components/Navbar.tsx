'use client';

import { motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'Examples', href: '#examples' },
    { label: 'Docs', href: '#docs' },
    { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const handleStartBuilding = () => {
        if (user) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    };

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                        <Brain className="w-4.5 h-4.5 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-slate-900 tracking-tight">BrainPrompt</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-3">
                    {!user ? (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Log In
                            </Link>
                            <button
                                onClick={handleStartBuilding}
                                className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                Start Building
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/dashboard"
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 text-slate-600"
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden glass border-t border-slate-200 px-6 py-4"
                >
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                handleStartBuilding();
                                setMobileOpen(false);
                            }}
                            className="mt-2 w-full px-4 py-2 text-center text-sm font-medium text-white bg-slate-900 rounded-lg"
                        >
                            {user ? 'Go to Dashboard' : 'Start Building'}
                        </button>
                        {user && (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileOpen(false);
                                }}
                                className="w-full px-4 py-2 text-center text-sm font-medium text-red-600 border border-red-100 rounded-lg"
                            >
                                Logout
                            </button>
                        )}
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
}

