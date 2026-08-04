import { motion } from 'framer-motion';
import { Sparkles, Target, Heart, Zap, Users, Globe, Award, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/shared/SectionHeading';
import { stats, clientLogos } from '@/data/store';

const VALUES = [
  { icon: Target, title: 'Quality First', desc: 'Every product is verified by AI before reaching the marketplace.', color: '#0099FF' },
  { icon: Heart, title: 'Creator-Centric', desc: 'Creators keep 80% of every sale. We succeed when you succeed.', color: '#7C3AED' },
  { icon: Zap, title: 'Instant Everything', desc: 'From purchase to download in seconds. No waiting, no friction.', color: '#22D3EE' },
  { icon: Globe, title: 'Global Community', desc: 'Serving creators and customers in 120+ countries worldwide.', color: '#A259FF' },
];

const TEAM = [
  { name: 'Sarah Chen', role: 'CEO & Co-Founder', avatar: 'SC', color: '#0099FF' },
  { name: 'Marcus Reid', role: 'CTO & Co-Founder', avatar: 'MR', color: '#7C3AED' },
  { name: 'Lena Park', role: 'Head of Design', avatar: 'LP', color: '#A259FF' },
  { name: 'David Kim', role: 'Lead Engineer', avatar: 'DK', color: '#22D3EE' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="About Novixa"
        subtitle="We're building the living digital ecosystem where products move, evolve, and find their perfect home."
        breadcrumb={['Home', 'About']}
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 pb-20">
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 mb-12"
        >
          <h2 className="text-2xl font-bold text-novixa-white mb-4">Our Story</h2>
          <div className="space-y-4 text-sm text-novixa-muted font-light leading-relaxed">
            <p>Novixa started with a simple observation: digital product marketplaces were static. Products sat in grids, waiting to be found. There was no movement, no intelligence, no life.</p>
            <p>We set out to build something different — a living ecosystem where products are constantly moving, being scanned, verified, organized by AI, and delivered with care. Where every interaction teaches the visitor how the platform works.</p>
            <p>Today, Novixa serves 89,000+ customers and 2,400+ creators worldwide, with 12,400+ premium products and 2.4M+ downloads. And we're just getting started.</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <p className="text-2xl md:text-3xl font-bold tracking-tightest" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-2xs text-novixa-muted mt-1 uppercase tracking-ultra">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-novixa-white mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-6 flex items-start gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${value.color}15`, border: `1px solid ${value.color}20` }}
                  >
                    <Icon size={22} style={{ color: value.color }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-novixa-white mb-1">{value.title}</h3>
                    <p className="text-xs text-novixa-muted font-light">{value.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-novixa-white mb-6 text-center">Leadership</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold"
                  style={{ background: `${member.color}15`, border: `1px solid ${member.color}30`, color: member.color }}
                >
                  {member.avatar}
                </div>
                <p className="text-sm font-semibold text-novixa-white">{member.name}</p>
                <p className="text-2xs text-novixa-muted mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trusted by */}
        <div>
          <h2 className="text-lg font-semibold text-novixa-white mb-4 text-center">Trusted By</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {clientLogos.map((logo) => (
              <span key={logo} className="text-base font-bold text-novixa-muted/50 hover:text-novixa-white transition-colors tracking-tightest">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
