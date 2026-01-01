'use client';

import { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardMain from '@/components/DashboardMain';
import TemplatesView from '@/components/TemplatesView';
import HistoryView from '@/components/HistoryView';
import SettingsView from '@/components/SettingsView';
import AdminView from '@/components/AdminView';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Loader2, Menu } from 'lucide-react';

interface HistoryItem {
    id: string;
    created_at: string;
    input_text: string;
    output_text: string;
    model: string;
}

export default function DashboardPage() {
    const [currentView, setCurrentView] = useState('new_project');
    const [initialPrompt, setInitialPrompt] = useState('');
    const [initialOutput, setInitialOutput] = useState('');
    const [loading, setLoading] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState<'user' | 'developer' | null>(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
    const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
    const [usageCount, setUsageCount] = useState(0);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const router = useRouter();

    const fetchUsageCount = async (
        userId: string,
        subStatus: string | null = null,
        role: 'user' | 'developer' | null = null
    ) => {
        const status = subStatus || subscriptionStatus;
        const userRoleToCheck = role || userRole;

        // For 'elite' or 'developer', we don't need to count
        if (status === 'elite' || userRoleToCheck === 'developer') {
            console.log('User is elite or developer, setting usage to 0');
            setUsageCount(0);
            return;
        }

        const now = new Date();
        let startDate: Date;

        if (status === 'pro') {
            // Monthly reset for Pro users
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            startDate.setHours(0, 0, 0, 0);
        } else {
            // Daily reset for Free users
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
        }

        const { count } = await supabase
            .from('generations')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .gte('created_at', startDate.toISOString());

        console.log(`Usage count for ${status || 'free'} user:`, count);
        setUsageCount(count || 0);
    };

    const fetchProfile = async (session: any) => {
        if (!session?.user) return null;

        setUserEmail(session.user.email || '');

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('role, full_name, subscription_status')
                .eq('id', session.user.id)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                setUserRole('user');
                setSubscriptionStatus(null);
                return null;
            }

            if (data) {
                console.log('Fetched profile data:', data); // Debug log
                setUserRole(data.role as 'user' | 'developer');
                setSubscriptionStatus(data.subscription_status);
                setUserName(data.full_name || '');
                return data;
            } else {
                setUserRole('user');
                setSubscriptionStatus(null);
                return null;
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            setUserRole('user');
            setSubscriptionStatus(null);
            return null;
        }
    };

    const handleProfileUpdate = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) await fetchProfile(session);
    };

    const fetchHistory = async () => {
        // ... (existing logic)
        const { data: { session } } = await supabase.auth.getSession();

        if (session || (process.env.NODE_ENV as string) === 'development') {
            const userId = session?.user.id || '00000000-0000-0000-0000-000000000000';
            const { data } = await supabase
                .from('generations')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (data) setHistoryItems(data);
        }
    };

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            // Strict Auth Check: No session = No access
            if (!session && (process.env.NODE_ENV as string) !== 'development') {
                console.log('No valid session found. Redirecting to login...');
                // Clear any potentially stale local state
                setUserRole(null);
                setUserName('');
                setUserEmail('');
                setSubscriptionStatus(null);
                router.push('/login');
                return;
            }

            // In development, handle missing session
            if (!session && (process.env.NODE_ENV as string) === 'development') {
                console.log('Development mode: Bypassing session check');
                setUserRole('developer'); // Default to developer for testing
                setUserName('Test User');
                setUserEmail('test@example.com');
                setSubscriptionStatus('elite');
                setLoading(false);
                fetchHistory();
                return;
            }

            // Valid session exists - fetch profile and usage
            const profileData = await fetchProfile(session);
            if (profileData && session?.user) {
                await fetchUsageCount(session.user.id, profileData.subscription_status, profileData.role);
            }
            setLoading(false);
            fetchHistory();
        };
        checkSession();

        // Session Sync Listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                const profileData = await fetchProfile(session);
                if (profileData && session?.user) {
                    await fetchUsageCount(session.user.id, profileData.subscription_status, profileData.role);
                }
                fetchHistory();
            } else if (event === 'SIGNED_OUT') {
                setUserRole(null);
                setUserName('');
                setUserEmail('');
                router.push('/login');
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    // Update usage count when subscription status changes
    useEffect(() => {
        const updateUsage = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.id && subscriptionStatus !== null) {
                await fetchUsageCount(session.user.id, subscriptionStatus, userRole);
            }
        };
        updateUsage();
    }, [subscriptionStatus, userRole]);

    const handleUseTemplate = (prompt: string) => {
        setInitialPrompt(prompt);
        setInitialOutput(''); // Clear output for new template
        setCurrentView('new_project');
    };

    const handleSelectHistory = (item: HistoryItem) => {
        setInitialPrompt(item.input_text);
        setInitialOutput(item.output_text); // Load past generation result
        setCurrentView('new_project');
        setMobileSidebarOpen(false);
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <DashboardSidebar
                activeView={currentView}
                onViewChange={(view) => {
                    setCurrentView(view);
                    setMobileSidebarOpen(false);
                }}
                mobileOpen={mobileSidebarOpen}
                onMobileClose={() => setMobileSidebarOpen(false)}
                history={historyItems}
                onSelectHistory={handleSelectHistory}
                userRole={userRole}
                usageCount={usageCount}
                userName={userName}
                userEmail={userEmail}
                subscriptionStatus={subscriptionStatus}
            />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white z-10">
                    <button
                        onClick={() => setMobileSidebarOpen(true)}
                        className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-semibold text-slate-900">BrainPrompt</span>
                    <div className="w-8" /> {/* Spacer for balance */}
                </div>

                {currentView === 'new_project' && (
                    <DashboardMain
                        initialPrompt={initialPrompt}
                        initialOutput={initialOutput}
                        onHistoryUpdated={() => {
                            const check = async () => {
                                const { data: { session } } = await supabase.auth.getSession();
                                if (session) fetchUsageCount(session.user.id, subscriptionStatus, userRole);
                                fetchHistory();
                            };
                            check();
                        }}
                        userRole={userRole}
                        subscriptionStatus={subscriptionStatus}
                    />
                )}
                {currentView === 'templates' && <TemplatesView onUseTemplate={handleUseTemplate} />}
                {currentView === 'history' && <HistoryView onSelectHistory={handleSelectHistory} />}
                {currentView === 'settings' && (
                    <SettingsView
                        userRole={userRole}
                        userName={userName}
                        userEmail={userEmail}
                        onUpdateProfile={handleProfileUpdate}
                        subscriptionStatus={subscriptionStatus}
                    />
                )}
                {currentView === 'admin' && userRole === 'developer' && <AdminView />}
            </main>
        </div>
    );
}
