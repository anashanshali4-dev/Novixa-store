import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search, LifeBuoy, Mail, MessageSquare, BookOpen } from 'lucide-react';
import { PageHeader } from '@/components/shared/SectionHeading';
import { useApp } from '@/store/AppContext';
import { faqs } from '@/data/store';
import { Button } from '@/components/ui/Button';

export function SupportPage() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Support Center"
        subtitle="Find answers, get help, and learn how to get the most out of Novixa"
        breadcrumb={['Home', 'Support']}
      />
      <div className="max-w-[1000px] mx-auto px-4 lg:px-6 pb-20">
        {/* Support channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: BookOpen, title: 'Documentation', desc: 'Browse guides and tutorials', color: '#0099FF', action: () => navigate('/faq') },
            { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our team 24/7', color: '#7C3AED', action: () => navigate('/contact') },
            { icon: Mail, title: 'Email Support', desc: 'Get a response within 24h', color: '#22D3EE', action: () => navigate('/contact') },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                onClick={item.action}
                className="glass-card rounded-2xl p-6 text-center hover:border-white/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${item.color}15`, border: `1px solid ${item.color}20` }}>
                  <Icon size={22} style={{ color: item.color }} />
                </div>
                <p className="text-sm font-semibold text-novixa-white mb-1">{item.title}</p>
                <p className="text-2xs text-novixa-muted">{item.desc}</p>
              </button>
            );
          })}
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-novixa-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card rounded-3xl p-8 text-center mt-12">
          <LifeBuoy size={32} className="text-novixa-blue mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-novixa-white mb-2">Still need help?</h3>
          <p className="text-sm text-novixa-muted mb-4">Our support team is here to help you with anything.</p>
          <Button onClick={() => navigate('/contact')}>Contact Support</Button>
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="FAQ"
        subtitle="Answers to the most common questions about Novixa"
        breadcrumb={['Home', 'FAQ']}
      />
      <div className="max-w-[800px] mx-auto px-4 lg:px-6 pb-20">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-novixa-white">{q}</span>
        <ChevronDown size={16} className={`text-novixa-muted transition-transform shrink-0 ml-2 ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-xs text-novixa-muted font-light leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}
