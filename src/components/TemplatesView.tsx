'use client';

import { motion } from 'framer-motion';
import {
    Video, Hash, User, ShoppingBag, Mail, MessageSquare,
    FileSpreadsheet, Code, FileText, Database, Workflow,
    Terminal, Calendar, Dumbbell, Sparkles
} from 'lucide-react';

interface Template {
    id: string;
    title: string;
    description: string;
    prompt: string;
    category: 'Social' | 'Business' | 'Productivity' | 'Technical' | 'Lifestyle';
    icon: any;
}

const templates: Template[] = [
    // Social Media & Trends
    {
        id: 'insta-reel',
        title: 'Instagram Reel Script',
        description: 'Viral hooks and 30-sec video scripts for the "Man Glow Up" trend.',
        prompt: 'Act as a social media strategist. Write a 30-second Instagram Reel script for the "Man Glow Up" trend. Include 3 viral hook options at the start, scene-by-scene visual descriptions, and a strong call-to-action for the caption.',
        category: 'Social',
        icon: Video,
    },
    {
        id: 'tiktok-hook',
        title: 'TikTok Hook Generator',
        description: '10 different hooks to start a short-form video that grabs attention.',
        prompt: 'Generate 10 viral TikTok hooks for a video about [TOPIC]. The hooks should be under 5 seconds, punchy, and trigger curiosity or immediate value. Include a mix of visual and verbal hooks.',
        category: 'Social',
        icon: Hash,
    },
    {
        id: 'linkedin-story',
        title: 'LinkedIn Story',
        description: 'Conversion-focused storytelling for personal branding.',
        prompt: 'Write a LinkedIn post using the "Hero\'s Journey" framework about [TOPIC/EXPERIENCE]. Focus on a professional challenge I overcame. The tone should be authentic, professional yet vulnerable, and optimized for engagement (line breaks, hook in first line).',
        category: 'Social',
        icon: User,
    },

    // Business & E-Commerce
    {
        id: 'marketplace-seo',
        title: 'Marketplace SEO Desc',
        description: 'Sales-focused product descriptions optimized for Trendyol/Amazon.',
        prompt: 'Write a conversion-optimized product description for [PRODUCT_NAME] on Trendyol/Amazon. Include high-volume SEO keywords related to [CATEGORY]. Structure it with bullet points for key features and a persuasive opening paragraph.',
        category: 'Business',
        icon: ShoppingBag,
    },
    {
        id: 'b2b-email',
        title: 'Professional B2B Email',
        description: 'Formal business communication for cold outreach or client follow-ups.',
        prompt: 'Draft a professional cold outreach email to a [JOB_TITLE] at [COMPANY_TYPE]. The goal is to schedule a 15-minute demo of [PRODUCT/SERVICE]. Keep it under 150 words, focus on their pain points, and provide a clear value proposition.',
        category: 'Business',
        icon: Mail,
    },
    {
        id: 'support-macro',
        title: 'Customer Support Macro',
        description: 'Empathetic and clear responses for common support tickets.',
        prompt: 'Write an empathetic and clear customer support response to a client complaining about [ISSUE]. Acknowledge their frustration, explain the solution briefly, and offer a specific next step or compensation if applicable.',
        category: 'Business',
        icon: MessageSquare,
    },

    // Professional & Productivity
    {
        id: 'excel-vba',
        title: 'Excel/VBA Automation',
        description: 'Complex macro scripts and advanced formula generation.',
        prompt: 'Act as an Excel Expert. Write a VBA macro to [DESCRIBE_TASK, e.g., consolidate data from multiple sheets]. Also provide the non-macro Excel formula equivalent if possible. Explain the code with comments.',
        category: 'Productivity',
        icon: FileSpreadsheet,
    },
    {
        id: 'saas-section',
        title: 'SaaS Website Section',
        description: 'Modern UI components (Hero, Pricing, FAQ) with React/Tailwind.',
        prompt: 'Create a modern, responsive [SECTION_TYPE, e.g., Pricing Table] component using React and Tailwind CSS. Use a dark mode design with gradients. Include clean code with comments explaining the layout choices.',
        category: 'Productivity',
        icon: Code,
    },
    {
        id: 'meeting-summary',
        title: 'Meeting Summary Architect',
        description: 'Converts raw notes into structured action items and summaries.',
        prompt: 'Process the following raw meeting notes into a structured summary. Include: 1) Executive Summary, 2) Key Decisions Made, 3) Action Items (with owners if mentioned), and 4) Open Questions. \n\nNotel: [PASTE_NOTES_HERE]',
        category: 'Productivity',
        icon: FileText,
    },
    {
        id: 'cover-letter',
        title: 'Smart Cover Letter',
        description: 'Tailored cover letters based on job descriptions.',
        prompt: 'Write a compelling cover letter for the position of [JOB_TITLE] at [COMPANY]. Highlight my experience in [KEY_SKILL_1] and [KEY_SKILL_2]. Keep it professional, concise, and aligned with the company\'s values.',
        category: 'Productivity',
        icon: Sparkles,
    },

    // Technical & Advanced
    {
        id: 'sql-optimizer',
        title: 'SQL Query Optimizer',
        description: 'Designing complex database schemas and efficient JOIN queries.',
        prompt: 'Act as a Database Administrator. Optimize this SQL query for performance: [PASTE_QUERY]. Explain the improvements, specifically regarding index usage and JOIN efficiency.',
        category: 'Technical',
        icon: Database,
    },
    {
        id: 'n8n-workflow',
        title: 'n8n Workflow Logic',
        description: 'Step-by-step logic for building complex business automation nodes.',
        prompt: 'Design an n8n workflow logic to automate [PROCESS_DESCRIPTION]. List the necessary nodes (Webhook, HTTP Request, If/Else, etc.) and the data mapping required between them.',
        category: 'Technical',
        icon: Workflow,
    },
    {
        id: 'python-script',
        title: 'Python Automation Script',
        description: 'Scripts for data scraping, file management, or API integrations.',
        prompt: 'Write a Python script to [DESCRIBE_TASK, e.g., scrape product prices from a list of URLs]. Use libraries like BeautifulSoup or Pandas. Ensure error handling is included.',
        category: 'Technical',
        icon: Terminal,
    },

    // Personal Growth & Lifestyle
    {
        id: 'routine-planner',
        title: 'Daily Routine Planner',
        description: 'Optimized daily schedules for productivity and personal care.',
        prompt: 'Create a balanced daily routine for a [ROLE/LIFESTYLE]. Include blocks for deep work, exercise ([TYPE]), meals, and wind-down time. base it on the Huberman Lab protocols for maximizing energy.',
        category: 'Lifestyle',
        icon: Calendar,
    },
    {
        id: 'gym-nutrition',
        title: 'Gym/Nutrition Guide',
        description: 'Structured workout plans and macro-based meal suggestions.',
        prompt: 'Create a weekly workout plan focused on [GOAL, e.g., hypertrophy] for a beginner/intermediate. Also provide a daily meal plan structure with target macros (Protein/Carb/Fat) for a [WEIGHT] individual.',
        category: 'Lifestyle',
        icon: Dumbbell,
    },
    {
        id: 'book-summary',
        title: 'Deep Book Summarizer',
        description: 'Extract key mental models and actionable takeaways from any book.',
        prompt: 'Summarize the book [BOOK_TITLE] by [AUTHOR]. Extract the top 5 mental models or key concepts. For each concept, provide a real-world application or actionable takeaway.',
        category: 'Lifestyle',
        icon: Sparkles,
    }
];

const categoryColors = {
    Social: 'bg-pink-50 text-pink-600 border-pink-100',
    Business: 'bg-blue-50 text-blue-600 border-blue-100',
    Productivity: 'bg-slate-100 text-slate-600 border-slate-200',
    Technical: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    Lifestyle: 'bg-emerald-50 text-emerald-600 border-emerald-100',
};

interface TemplatesViewProps {
    onUseTemplate: (prompt: string) => void;
}

export default function TemplatesView({ onUseTemplate }: TemplatesViewProps) {
    return (
        <div className="flex-1 bg-slate-50 relative overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Template Library</h2>
                    <p className="text-slate-600 mt-1">Select a template to jumpstart your prompt engineering.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {templates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
                            onClick={() => onUseTemplate(template.prompt)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2.5 rounded-lg ${categoryColors[template.category]}`}>
                                    <template.icon className="w-5 h-5" />
                                </div>
                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${categoryColors[template.category]}`}>
                                    {template.category}
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                {template.title}
                            </h3>
                            <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">
                                {template.description}
                            </p>

                            <button
                                className="w-full py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-900 hover:text-white transition-all"
                            >
                                Use Template
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
