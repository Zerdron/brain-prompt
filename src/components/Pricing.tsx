'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { LEMONSQUEEZY_CHECKOUT_URL } from '@/lib/config';

interface Feature {
    text: string;
    included: boolean;
    bold?: boolean;
}

interface Plan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: Feature[];
    cta: string;
    ctaStyle: 'primary' | 'secondary' | 'outline';
    highlighted?: boolean;
}

const plans: Plan[] = [
    {
        name: 'Free',
        price: '$0',
        period: '',
        description: 'Perfect for testing the engine.',
        features: [
            { text: '2 Generations / day', included: true, bold: true },
            { text: 'Standard Processing Speed', included: true },
            { text: 'Community Support', included: true },
            { text: 'No History / Save Function', included: false },
            { text: 'No Export Options', included: false },
        ],
        cta: 'Start for Free',
        ctaStyle: 'secondary',
    },
    {
        name: 'Pro',
        price: '$9.99',
        period: '/ mo',
        description: 'For power users & content teams.',
        features: [
            { text: '200 Generations / month', included: true, bold: true },
            { text: 'Smart Enhance Mode', included: true },
            { text: 'Save & Organize History', included: true },
            { text: 'Export to JSON/CSV', included: true },
            { text: 'Priority Support & Speed', included: true },
        ],
        cta: 'Start Pro',
        ctaStyle: 'primary',
        highlighted: true,
    },
    {
        name: 'Elite',
        price: '$19.99',
        period: '/ mo',
        description: 'For professionals & agencies.',
        features: [
            { text: 'Unlimited Generations', included: true, bold: true },
            { text: 'Everything in Pro', included: true },
            { text: 'API Access', included: true },
            { text: 'Priority Processing', included: true },
            { text: 'Dedicated Support', included: true },
        ],
        cta: 'Start Elite',
        ctaStyle: 'outline',
    },
];

export default function Pricing() {
    const { user } = useAuth();
    const router = useRouter();

    const handlePlanClick = (planName: string) => {
        if (user) {
            // User is logged in
            if (planName === 'Pro' || planName === 'Elite') {
                // Redirect to LemonSqueezy checkout with user email
                const checkoutUrl = `${LEMONSQUEEZY_CHECKOUT_URL}?checkout[email]=${encodeURIComponent(user.email || '')}`;
                window.location.href = checkoutUrl;
            } else {
                // Free plan - go to dashboard
                router.push('/dashboard');
            }
        } else {
            // User is not logged in - redirect to login
            router.push('/login');
        }
    };

    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* ... (rest of the component keeps the same UI) ... */}
                {/* I will use exact content in the actual call */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-medium text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100">
                        Pricing
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Simple, Developer-Friendly Pricing
                    </h2>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">
                        Start free. Scale when you need to.
                    </p>
                </motion.div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-xl p-6 flex flex-col ${plan.highlighted
                                ? 'bg-white border-2 border-indigo-500 shadow-xl shadow-indigo-500/10 z-10 scale-105 md:scale-105'
                                : 'bg-white border border-slate-200'
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-full shadow-sm">
                                        Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6 pt-2">
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-slate-900 font-mono">
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span className="text-slate-500 text-sm font-medium">{plan.period}</span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500 mt-2">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className={`flex items-start gap-3 text-sm ${!feature.included ? 'text-slate-400 opacity-80' : 'text-slate-600'
                                        }`}>
                                        {feature.included ? (
                                            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        ) : (
                                            <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                                        )}
                                        <span className={feature.bold ? 'font-semibold text-slate-900' : ''}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handlePlanClick(plan.name)}
                                className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${plan.ctaStyle === 'primary'
                                    ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg'
                                    : plan.ctaStyle === 'outline'
                                        ? 'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
