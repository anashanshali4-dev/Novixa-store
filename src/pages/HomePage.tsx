import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, TrendingUp, Shield, Zap, Star, Quote,
  Check, ArrowUpRight, Download, Users, Package,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { products, categories, reviews, stats, clientLogos, services } from '@/data/store';
import { ProductCard } from '@/components/shared/ProductCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui';
import { HeroScene } from '@/components/HeroScene';

export function HomePage() {
  const { navigate, setAiOpen } = useApp();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);

  return (
    <div>
      {/* Cinematic hero */}
      <HeroScene />

      {/* Stats bar */}
      <section className="relative py-16 px-4 lg:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-bold tracking-tightest" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-2xs text-novixa-muted mt-1 uppercase tracking-ultra">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 lg:px-6 max-w-[1400px] mx-auto">
        <SectionHeading
          eyebrow="Explore"
          title="Browse by Category"
          subtitle="From design to development to AI — find exactly what you need"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="glass-card rounded-2xl p-5 text-center group cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}20` }}
                >
                  <Icon size={22} style={{ color: cat.color }} />
                </div>
                <p className="text-sm font-semibold text-novixa-white mb-0.5">{cat.name}</p>
                <p className="text-2xs text-novixa-muted">{cat.count} items</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-12 px-4 lg:px-6 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-block text-2xs font-semibold uppercase tracking-ultra text-novixa-blue mb-2">Featured</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-gradient">Premium Selections</h2>
          </div>
          <Button variant="ghost" onClick={() => navigate('/products')} rightIcon={<ArrowRight size={16} />}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* AI Assistant banner */}
      <section className="py-20 px-4 lg:px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass-strong rounded-4xl p-8 md:p-12 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(0,153,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(124,58,237,0.15) 0%, transparent 50%)' }} />
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <Badge variant="info" className="mb-3">
                  <Sparkles size={10} /> AI-Powered
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-gradient mb-3">
                  Your AI Shopping Assistant
                </h2>
                <p className="text-sm text-novixa-muted font-light mb-6 max-w-lg">
                  Search products, get recommendations, compare options, and make purchasing decisions with our multi-model AI assistant. Powered by GPT-4o, Claude 3.5, and Gemini 1.5.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setAiOpen(true)} leftIcon={<Sparkles size={16} />}>
                    Try AI Assistant
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/assistant')}>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex gap-3">
                {[
                  { name: 'GPT-4o', color: '#10A37F' },
                  { name: 'Claude 3.5', color: '#D97757' },
                  { name: 'Gemini 1.5', color: '#4285F4' },
                ].map((model, i) => (
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-2xl p-4 text-center"
                    style={{ boxShadow: `0 0 20px ${model.color}20` }}
                  >
                    <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: `${model.color}15` }}>
                      <Zap size={18} style={{ color: model.color }} />
                    </div>
                    <p className="text-xs font-semibold text-novixa-white">{model.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-12 px-4 lg:px-6 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-block text-2xs font-semibold uppercase tracking-ultra text-amber-400 mb-2">Trending</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tightest text-gradient">Bestsellers</h2>
          </div>
          <Button variant="ghost" onClick={() => navigate('/products')} rightIcon={<ArrowRight size={16} />}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestsellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 lg:px-6 max-w-[1400px] mx-auto">
        <SectionHeading
          eyebrow="Professional Services"
          title="Beyond Products"
          subtitle="Work with our team of experts on custom projects"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/service/${service.id}`)}
                className="glass-card rounded-2xl p-6 cursor-pointer group"
              >
                <div
                  className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: `${service.color}15`, border: `1px solid ${service.color}20` }}
                >
                  <Icon size={22} style={{ color: service.color }} />
                </div>
                <h3 className="text-base font-semibold text-novixa-white mb-1">{service.name}</h3>
                <p className="text-xs text-novixa-muted mb-3 font-light">{service.description}</p>
                <p className="text-sm font-semibold" style={{ color: service.color }}>{service.price}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trust section */}
      <section className="py-20 px-4 lg:px-6">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow="Trusted Worldwide"
            title="Loved by 89,000+ Customers"
            subtitle="From indie developers to enterprise teams — Novixa is the trusted choice"
          />

          {/* Client logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            {clientLogos.map((logo, i) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-lg font-bold text-novixa-muted hover:text-novixa-white transition-colors cursor-default tracking-tightest"
              >
                {logo}
              </motion.span>
            ))}
          </div>

          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.slice(0, 6).map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-5"
              >
                <Quote size={20} className="text-novixa-blue/40 mb-3" />
                <p className="text-sm text-novixa-white font-light leading-relaxed mb-4">"{review.content}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-novixa-blue/20 to-novixa-purple/20 border border-white/10 flex items-center justify-center text-xs font-semibold text-novixa-white">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-novixa-white">{review.author}</p>
                    <p className="text-2xs text-novixa-muted">{review.role}</p>
                  </div>
                  <div className="flex gap-0.5 ml-auto">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={10} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-12 px-4 lg:px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: '14-Day Guarantee', desc: 'Money-back guarantee on every purchase', color: '#10B981' },
            { icon: Zap, title: 'Instant Downloads', desc: 'Access your products immediately after purchase', color: '#22D3EE' },
            { icon: Check, title: 'Quality Verified', desc: 'Every product is scanned and verified by AI', color: '#0099FF' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}20` }}>
                  <Icon size={22} style={{ color: item.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-novixa-white mb-0.5">{item.title}</h3>
                  <p className="text-xs text-novixa-muted font-light">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 lg:px-6">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass-strong rounded-4xl p-10 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,153,255,0.2) 0%, transparent 50%)' }} />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tightest text-gradient mb-4">
                Start Building with Novixa
              </h2>
              <p className="text-sm text-novixa-muted font-light mb-8 max-w-lg mx-auto">
                Join thousands of creators and customers in the living digital ecosystem. Premium products, AI-powered discovery, instant delivery.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" onClick={() => navigate('/products')} rightIcon={<ArrowRight size={18} />}>
                  Explore Products
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/signup')}>
                  Become a Creator
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
