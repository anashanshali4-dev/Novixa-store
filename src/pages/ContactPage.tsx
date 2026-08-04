import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageSquare, Send, Check } from 'lucide-react';
import { PageHeader } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/Button';

export function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Contact Us"
        subtitle="Have a question? Want to work with us? We'd love to hear from you."
        breadcrumb={['Home', 'Contact']}
      />
      <div className="max-w-[1000px] mx-auto px-4 lg:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: Mail, title: 'Email', value: 'hello@novixa.com', color: '#0099FF' },
              { icon: MapPin, title: 'Office', value: 'San Francisco, CA', color: '#7C3AED' },
              { icon: MessageSquare, title: 'Live Chat', value: 'Available 24/7', color: '#22D3EE' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-card rounded-2xl p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}20` }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-novixa-white">{item.title}</p>
                    <p className="text-2xs text-novixa-muted">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                    <Check size={32} className="text-emerald-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-novixa-white mb-2">Message Sent!</h3>
                  <p className="text-sm text-novixa-muted">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">Name</label>
                      <input required placeholder="Your name" className="w-full glass rounded-xl px-4 py-2.5 text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none focus:border-novixa-blue/40" />
                    </div>
                    <div>
                      <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">Email</label>
                      <input required type="email" placeholder="you@example.com" className="w-full glass rounded-xl px-4 py-2.5 text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none focus:border-novixa-blue/40" />
                    </div>
                  </div>
                  <div>
                    <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">Subject</label>
                    <input required placeholder="How can we help?" className="w-full glass rounded-xl px-4 py-2.5 text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none focus:border-novixa-blue/40" />
                  </div>
                  <div>
                    <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">Message</label>
                    <textarea required rows={6} placeholder="Tell us more..." className="w-full glass rounded-xl px-4 py-2.5 text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none focus:border-novixa-blue/40 resize-none" />
                  </div>
                  <Button type="submit" fullWidth size="lg" rightIcon={<Send size={16} />}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
