import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-10 md:p-14">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>

                <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Last updated: {new Date().getFullYear()}
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Data Collection</h2>
                    <p className="text-slate-600 mb-4">
                        We collect minimal data necessary to operate BrainPrompt. This includes user account information (email) and the prompts you explicitly allow us to save.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. Usage of Data</h2>
                    <p className="text-slate-600 mb-4">
                        We do not sell your data. Prompts are stored securely and are only accessible by you. We use your data solely to provide functionality like history and templates.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Third-Party Services</h2>
                    <p className="text-slate-600 mb-4">
                        We use reliable third-party providers such as Supabase for authentication and database services, and n8n/Google Gemini for AI processing.
                    </p>
                </div>
            </div>
        </div>
    );
}
