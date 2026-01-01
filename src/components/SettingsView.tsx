'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Moon, CreditCard, Code, Save, Loader2, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { LEMONSQUEEZY_CHECKOUT_URL } from '@/lib/config';

interface SettingsViewProps {
    userRole: 'user' | 'developer' | null;
    userName: string;
    userEmail: string;
    onUpdateProfile: () => void;
    subscriptionStatus?: string | null;
}

export default function SettingsView({ userRole, userName, userEmail, onUpdateProfile, subscriptionStatus }: SettingsViewProps) {
    const [activeTab, setActiveTab] = useState('profile');
    const [fullName, setFullName] = useState(userName);
    const [isSaving, setIsSaving] = useState(false);

    // Developer Settings State
    const [n8nUrl, setN8nUrl] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');

    const handleUpgrade = () => {
        if (!userEmail) {
            toast.error('Email is missing. Cannot verify account.');
            return;
        }
        // Append email to checkout URL
        const checkoutUrl = `${LEMONSQUEEZY_CHECKOUT_URL}?checkout[email]=${encodeURIComponent(userEmail)}`;
        window.location.href = checkoutUrl;
    };

    useEffect(() => {
        setFullName(userName);

        // Load developer settings from localStorage if available
        if (typeof window !== 'undefined') {
            const savedUrl = localStorage.getItem('brain_n8n_url');
            const savedPrompt = localStorage.getItem('brain_system_prompt');
            if (savedUrl) setN8nUrl(savedUrl);
            if (savedPrompt) setSystemPrompt(savedPrompt);
        }
    }, [userName]);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { error } = await supabase
                .from('profiles')
                .update({ full_name: fullName })
                .eq('id', session.user.id);

            if (error) throw error;

            toast.success('Profile updated successfully');
            onUpdateProfile(); // Refresh parent state
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveDeveloper = () => {
        localStorage.setItem('brain_n8n_url', n8nUrl);
        localStorage.setItem('brain_system_prompt', systemPrompt);
        toast.success('Developer settings saved (Local Override)');
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'preferences', label: 'Preferences', icon: Moon },
        { id: 'subscription', label: 'Subscription', icon: CreditCard },
    ];

    if (userRole === 'developer') {
        tabs.push({ id: 'developer', label: 'Developer', icon: Code });
    }

    return (
        <div className="flex-1 bg-slate-50 relative overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
                    <p className="text-slate-600 mt-1">Manage your account preferences and settings.</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 p-4">
                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 md:p-8">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Profile Information</h3>

                                    <div className="space-y-4 max-w-md">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={userEmail}
                                                disabled
                                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-sm cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="Enter your full name"
                                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={isSaving}
                                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                                        >
                                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Appearance</h3>

                                    <div className="flex items-center justify-between py-4">
                                        <div>
                                            <span className="block text-sm font-medium text-slate-900">Dark Mode</span>
                                            <span className="block text-sm text-slate-500">Enable dark theme for the dashboard.</span>
                                        </div>
                                        <button
                                            className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-500 rounded-full cursor-not-allowed"
                                            title="Coming soon"
                                        >
                                            Coming Soon
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'subscription' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Current Plan</h3>

                                    <div className={`border rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${subscriptionStatus === 'elite'
                                        ? 'bg-purple-50 border-purple-100'
                                        : subscriptionStatus === 'pro'
                                            ? 'bg-emerald-50 border-emerald-100'
                                            : 'bg-indigo-50 border-indigo-100'
                                        }`}>
                                        <div>
                                            <h4 className={`text-base font-bold ${subscriptionStatus === 'elite'
                                                ? 'text-purple-900'
                                                : subscriptionStatus === 'pro'
                                                    ? 'text-emerald-900'
                                                    : 'text-indigo-900'
                                                }`}>
                                                {subscriptionStatus === 'elite'
                                                    ? 'Elite Plan'
                                                    : subscriptionStatus === 'pro'
                                                        ? 'Pro Plan'
                                                        : 'Free Plan'}
                                            </h4>
                                            <p className={`text-sm mt-1 ${subscriptionStatus === 'elite'
                                                ? 'text-purple-700'
                                                : subscriptionStatus === 'pro'
                                                    ? 'text-emerald-700'
                                                    : 'text-indigo-700'
                                                }`}>
                                                {subscriptionStatus === 'elite'
                                                    ? 'Unlimited access with priority support.'
                                                    : subscriptionStatus === 'pro'
                                                        ? '200 generations per month with priority features.'
                                                        : 'You are currently on the free tier.'}
                                            </p>
                                        </div>
                                        {subscriptionStatus !== 'elite' && subscriptionStatus !== 'pro' && (
                                            <button
                                                onClick={handleUpgrade}
                                                className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm transition-colors cursor-pointer"
                                            >
                                                Upgrade to Pro ($9.99)
                                            </button>
                                        )}
                                        {subscriptionStatus === 'pro' && (
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <button
                                                    onClick={handleUpgrade}
                                                    className="px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 shadow-sm transition-colors cursor-pointer"
                                                >
                                                    Upgrade to Elite ($19.99)
                                                </button>
                                                <button
                                                    onClick={() => window.open('https://brainpromt.lemonsqueezy.com', '_blank')}
                                                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Manage Billing
                                                </button>
                                            </div>
                                        )}
                                        {subscriptionStatus === 'elite' && (
                                            <button
                                                onClick={() => window.open('https://brainpromt.lemonsqueezy.com', '_blank')}
                                                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Manage Billing
                                            </button>
                                        )}
                                    </div>

                                    <div className="text-sm text-slate-500">
                                        {subscriptionStatus === 'elite' ? (
                                            <>
                                                <p>• Unlimited generations</p>
                                                <p>• Everything in Pro</p>
                                                <p>• API Access</p>
                                                <p>• Priority processing</p>
                                                <p>• Dedicated support</p>
                                            </>
                                        ) : subscriptionStatus === 'pro' ? (
                                            <>
                                                <p>• 200 generations per month</p>
                                                <p>• Smart enhance mode</p>
                                                <p>• Save & organize history</p>
                                                <p>• Export to JSON/CSV</p>
                                                <p>• Priority support & speed</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>• 2 generations per day</p>
                                                <p>• Standard processing speed</p>
                                                <p>• Community support</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'developer' && userRole === 'developer' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Developer Configuration</h3>

                                    <div className="space-y-4 max-w-lg">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">n8n Webhook URL</label>
                                            <input
                                                type="url"
                                                value={n8nUrl}
                                                onChange={(e) => setN8nUrl(e.target.value)}
                                                placeholder="https://your-n8n-instance.com/webhook/..."
                                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">This will override the default environment variable for your session.</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">System Prompt</label>
                                            <textarea
                                                value={systemPrompt}
                                                onChange={(e) => setSystemPrompt(e.target.value)}
                                                placeholder="You are a helpful assistant..."
                                                rows={4}
                                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>

                                        <button
                                            onClick={handleSaveDeveloper}
                                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save Configuration
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
