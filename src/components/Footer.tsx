'use client';

import { motion } from 'framer-motion';
import { Brain, Twitter, Linkedin, ShieldCheck, Mail, Globe, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

interface FooterLink {
    label: string;
    href: string;
    onClick?: (e: React.MouseEvent) => void;
    isExternal?: boolean;
}

export default function Footer() {
    const router = useRouter();
    const { user } = useAuth();

    // Secure Auth Guard: verifies session before navigating
    const handleProtectedLink = async (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            router.push(path);
        } else {
            router.push('/login');
        }
    };

    const handleDocsClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const companyLinks = [
        { icon: Twitter, href: 'https://twitter.com/brainprompt', label: 'Twitter' },
        { icon: Linkedin, href: 'https://linkedin.com/company/brainprompt', label: 'LinkedIn' },
    ];

    const productLinks: FooterLink[] = [
        { label: 'Generator', href: '#', onClick: (e) => handleProtectedLink(e, '/dashboard') },
        { label: 'Templates', href: '#', onClick: (e) => handleProtectedLink(e, '/dashboard') },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'Rewards & Quests', href: '/dashboard#rewards', onClick: (e) => handleProtectedLink(e, '/dashboard#rewards') },
    ];

    const supportLinks: FooterLink[] = [
        { label: 'Documentation', href: '#', onClick: handleDocsClick },
        { label: 'Contact Support', href: 'mailto:support@brainprompt.com', isExternal: true },
        { label: 'Status Page', href: 'https://status.brainprompt.com', isExternal: true },
    ];

    const legalLinks: FooterLink[] = [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
        { label: 'Refund Policy', href: '/refund-policy' },
    ];

    const renderLinks = (links: FooterLink[]) => (
        <ul className="space-y-3">
            {links.map((link) => (
                <li key={link.label}>
                    {link.onClick ? (
                        <button
                            onClick={link.onClick}
                            className="text-sm text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer text-left focus:outline-none"
                        >
                            {link.label}
                        </button>
                    ) : link.isExternal ? (
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
                        >
                            {link.label}
                            {link.label === 'Status Page' && <ExternalLink className="w-3 h-3 opacity-50" />}
                        </a>
                    ) : (
                        <Link
                            href={link.href}
                            className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                            {link.label}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Column 1: Brand */}
                    <div className="flex flex-col">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-105 transition-transform">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">BrainPrompt</span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-[280px]">
                            BrainPrompt: The professional framework for neural prompt engineering.
                        </p>
                        <div className="flex items-center gap-4">
                            {companyLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-indigo-600 rounded-lg transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Product */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6 underline decoration-indigo-500 decoration-2 underline-offset-8">Product</h4>
                        {renderLinks(productLinks)}
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6 underline decoration-indigo-500 decoration-2 underline-offset-8">Support</h4>
                        {renderLinks(supportLinks)}
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6 underline decoration-indigo-500 decoration-2 underline-offset-8">Legal</h4>
                        {renderLinks(legalLinks)}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-sm text-slate-400">
                            © 2025 BrainPrompt. All rights reserved.
                        </p>

                        {/* Secure Payments Badge */}
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 group">
                            <ShieldCheck className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                Secure Payments by <span className="text-slate-900">LemonSqueezy</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-slate-400" />
                            <span className="text-xs font-medium text-slate-500">System Identity: Verified</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-4">
                            <div className="h-4 w-px bg-slate-200" />
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                Build v1.0.8-stable
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
