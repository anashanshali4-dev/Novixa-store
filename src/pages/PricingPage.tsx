import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/store/AppContext';

const PLANS = [
  {
    name: 'Starter',
    icon: Zap,
    color: '#0099FF',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for trying out Novixa',
    features: ['Browse all products', 'AI assistant (10 queries/month)', 'Wishlist & cart', 'Community support'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    icon: Sparkles,
    color: '#7C3AED',
    price: { monthly: 19, yearly: 15 },
    description: 'For creators and regular buyers',
    features: ['Everything in Starter', 'Unlimited AI assistant', 'Priority support', 'Exclusive discounts', 'Early access to new products', 'Multi-model AI (GPT, Claude, Gemini)'],
    cta: 'Start Pro Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    icon: Crown,
    color: '#22D3EE',
    price: { monthly: 99, yearly: 79 },
    description: 'For teams and agencies',
    features: ['Everything in Pro', 'Team seats (up to 20)', 'Custom AI workflows', 'Dedicated account manager', 'API access', 'White-label options', 'SLA guarantee'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export function PricingPage() {
  const { navigate } = useApp();
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Pricing"
        subtitle="Simple, transparent pricing for everyone — from individuals to enterprise teams"
        breadcrumb={['Home', 'Pricing']}
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 pb-20">
        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={`text-sm ${billing === 'monthly' ? 'text-novixa-white' : 'text-novixa-muted'}`}>Monthly</span>
          <button
            onClick={() => setBilling((b) => (b === 'monthly' ? 'yearly' : 'monthly'))}
            className="relative w-12 h-6 rounded-full glass"
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-gradient-to-r from-novixa-blue to-novixa-purple"
              animate={{ left: billing === 'monthly' ? '2px' : '26px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          </button>
          <span className={`text-sm ${billing === 'yearly' ? 'text-novixa-white' : 'text-novixa-muted'}`}>Yearly</span>
          <span className="text-2xs text-emerald-400 ml-1">Save 20%</span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            const price = billing === 'yearly' ? plan.price.yearly : plan.price.monthly;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card rounded-3xl p-8 relative ${plan.highlight ? 'border-novixa-purple/30' : ''}`}
                style={plan.highlight ? { boxShadow: '0 0 60px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.08)' } : {}}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 glass-strong rounded-full px-3 py-1 text-2xs font-semibold text-novixa-purple border border-novixa-purple/30">
                    Most Popular
                  </div>
                )}
                <div
                  className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: `${plan.color}15`, border: `1px solid ${plan.color}20` }}
                >
                  <Icon size={22} style={{ color: plan.color }} />
                </div>
                <h3 className="text-lg font-bold text-novixa-white mb-1">{plan.name}</h3>
                <p className="text-xs text-novixa-muted mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-novixa-white">${price}</span>
                  <span className="text-xs text-novixa-muted">/{billing === 'yearly' ? 'mo billed yearly' : 'month'}</span>
                </div>
                <Button
                  fullWidth
                  variant={plan.highlight ? 'primary' : 'secondary'}
                  onClick={() => navigate('/signup')}
                  className="mb-6"
                >
                  {plan.cta}
                </Button>
                <div className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-novixa-muted">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ teaser */}
        <div className="text-center mt-16">
          <p className="text-sm text-novixa-muted mb-3">Still have questions about pricing?</p>
          <Button variant="outline" onClick={() => navigate('/contact')} rightIcon={<ArrowRight size={16} />}>
            Talk to Our Team
          </Button>
        </div>
      </div>
    </div>
  );
}
