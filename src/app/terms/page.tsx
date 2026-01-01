import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-10 md:p-14">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Service</h1>

                <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Welcome to BrainPrompt. By using our services, you agree to these terms.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">1. Use License</h2>
                    <p className="text-slate-600 mb-4">
                        Permission is granted to use BrainPrompt for personal and commercial prompt engineering. You may not reverse engineer the codebase.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">2. Disclaimer</h2>
                    <p className="text-slate-600 mb-4">
                        The materials on BrainPrompt's website are provided on an 'as is' basis. BrainPrompt makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">3. Ai Content</h2>
                    <p className="text-slate-600 mb-4">
                        You are responsible for the inputs you provide to the AI and the outputs you generate. We act as a tool provider and claim no ownership over your generated prompts.
                    </p>
                </div>
            </div>
        </div>
    );
}
