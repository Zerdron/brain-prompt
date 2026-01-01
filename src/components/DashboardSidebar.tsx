'use client';

import { motion } from 'framer-motion';
import {
    Plus,
    Clock,
    Layout,
    Settings,
    User,
    ChevronLeft,
    ChevronRight,
    LogOut,
    FileText,
    ShieldCheck,
    CreditCard
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

interface HistoryItem {
    id: string;
    created_at: string;
    input_text: string;
    output_text: string;
    model: string;
    output_json?: unknown;
}

interface DashboardSidebarProps {
    activeView: string;
    onViewChange: (view: string) => void;
    mobileOpen: boolean;
    onMobileClose: () => void;
    history?: HistoryItem[];
    onSelectHistory: (item: HistoryItem) => void;
    userRole?: 'user' | 'developer' | null;
    usageCount?: number;
    userName?: string;
    userEmail?: string;
    subscriptionStatus?: string | null;
}

export default function DashboardSidebar({
    activeView,
    onViewChange,
    mobileOpen,
    onMobileClose,
    history = [],
    onSelectHistory,
    userRole,
    usageCount = 0,
    userName = '',
    userEmail = '',
    subscriptionStatus
}: DashboardSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const router = useRouter();

    const isPro = userRole === 'developer' || subscriptionStatus === 'pro';

    const menuItems = [
        { icon: Plus, label: 'New Project', id: 'new_project', color: 'text-indigo-600' },
        { icon: Clock, label: 'All History', id: 'history' },
        { icon: Layout, label: 'Templates', id: 'templates' },
    ];

    if (userRole === 'developer') {
        menuItems.push({ icon: ShieldCheck, label: 'Admin Panel', id: 'admin', color: 'text-rose-600' });
    }

    const bottomItems = [
        // Only show settings to developers to simplify navigation for users
        // ...(userRole === 'developer' ? [{ icon: Settings, label: 'Settings', id: 'settings' }] : []),
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const handleBilling = () => {
        if (subscriptionStatus === 'pro' || subscriptionStatus === 'elite') {
            window.open('https://brainpromt.lemonsqueezy.com', '_blank');
        } else {
            router.push('/#pricing');
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
                    onClick={onMobileClose}
                />
            )}

            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? 80 : 280 }}
                className={`fixed md:static inset-y-0 left-0 bg-white border-r border-slate-200 z-30 flex flex-col transition-all duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                {/* Header */}
                <div className="h-16 flex items-center px-4 border-b border-slate-100 justify-between">
                    {!isCollapsed && (
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            BrainPrompt
                        </span>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg hidden md:block"
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                    {/* Mobile Close */}
                    <button
                        onClick={onMobileClose}
                        className="p-1.5 text-slate-400 hover:text-slate-600 md:hidden"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>

                {/* Main Nav */}
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeView === item.id
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                } ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 ${item.color || ''}`} />
                            {!isCollapsed && (
                                <span className="text-sm font-medium">{item.label}</span>
                            )}
                        </button>
                    ))}

                    {!isCollapsed && (
                        <div className="mt-8 mb-2 px-3">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Recent History
                            </span>
                        </div>
                    )}

                    {!isCollapsed && (
                        <div className="space-y-1">
                            {history.length > 0 ? (
                                history.slice(0, 5).map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => onSelectHistory(item)}
                                        className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg truncate group relative"
                                    >
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="truncate flex-1">
                                                {item.input_text.substring(0, 25)}...
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="px-3 py-4 text-center">
                                    <p className="text-xs text-slate-500 italic">No history yet.</p>
                                    <p className="text-[10px] text-indigo-500 font-medium mt-1 cursor-pointer hover:underline" onClick={() => onViewChange('new_project')}>Start creating!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="px-3 py-4 space-y-1 border-t border-slate-100 relative">
                    {/* Billing Button */}
                    <button
                        onClick={handleBilling}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <CreditCard className="w-5 h-5 shrink-0" />
                        {!isCollapsed && (
                            <span className="text-sm font-medium">Billing</span>
                        )}
                    </button>

                    {/* Settings Button */}
                    <button
                        onClick={() => onViewChange('settings')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${isCollapsed ? 'justify-center' : ''} ${activeView === 'settings' ? 'bg-indigo-50 text-indigo-700' : ''}`}
                    >
                        <Settings className="w-5 h-5 shrink-0" />
                        {!isCollapsed && (
                            <span className="text-sm font-medium">Settings</span>
                        )}
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className={`w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-lg hover:bg-slate-50 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 overflow-hidden">
                                <User className="w-4 h-4 text-indigo-600" />
                            </div>
                            {!isCollapsed && (
                                <div className="flex flex-col min-w-0 text-left">
                                    <span className="text-sm font-medium text-slate-900 truncate">
                                        {userName || (userEmail ? userEmail.split('@')[0] : 'User')}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${subscriptionStatus === 'elite' || userRole === 'developer'
                                            ? 'bg-purple-500'
                                            : subscriptionStatus === 'pro'
                                                ? 'bg-emerald-500'
                                                : 'bg-slate-400'
                                            }`} />
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${subscriptionStatus === 'elite' || userRole === 'developer'
                                            ? 'text-purple-600'
                                            : subscriptionStatus === 'pro'
                                                ? 'text-emerald-600'
                                                : 'text-slate-500'
                                            }`}>
                                            {subscriptionStatus === 'elite' || userRole === 'developer'
                                                ? '∞ / ∞'
                                                : subscriptionStatus === 'pro'
                                                    ? `Pro: ${usageCount}/200`
                                                    : `Free: ${usageCount}/2`}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </button>

                        {/* User Popup Menu */}
                        {userMenuOpen && (
                            <div className={`absolute bottom-full left-0 w-full mb-2 bg-white rounded-lg shadow-lg border border-slate-200 py-1 overflow-hidden ${isCollapsed ? 'left-10 w-48' : ''}`}>
                                <button
                                    onClick={() => {
                                        onViewChange('settings');
                                        setUserMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                    <Settings className="w-4 h-4" /> Settings
                                </button>
                                <button
                                    onClick={() => {
                                        handleBilling();
                                        setUserMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                    <CreditCard className="w-4 h-4" /> Billing
                                </button>
                                <div className="border-t border-slate-100 my-1" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" /> Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.aside>
        </>
    );
}
