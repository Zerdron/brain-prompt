'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Timer, ArrowRight, Loader2, History } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { EmptyState } from './EmptyState';

interface HistoryItem {
    id: string;
    created_at: string;
    input_text: string;
    output_text: string;
    model: string;
}

interface HistoryViewProps {
    onSelectHistory: (item: HistoryItem) => void;
}

export default function HistoryView({ onSelectHistory }: HistoryViewProps) {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                setLoading(false);
                return;
            }

            // Note: This assumes the 'generations' table exists. 
            // Since we can't create it here, we'll try to fetch, and if it fails, show empty state or handle error.
            const { data, error } = await supabase
                .from('generations')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });

            if (data) {
                setHistory(data);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 bg-slate-50 relative overflow-y-auto p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">History</h2>
                    <p className="text-slate-600 mt-1">View and restore your past prompt generations.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                    </div>
                ) : history.length === 0 ? (
                    <EmptyState
                        icon={History}
                        title="No history found"
                        description="Start your first project to automatically save your generation history here."
                    />
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Prompt Preview</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Model</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Open</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {history.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                                        onClick={() => onSelectHistory(item)}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-900 truncate max-w-md">
                                                {item.input_text.substring(0, 100)}...
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {item.model}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
