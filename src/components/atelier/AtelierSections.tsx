import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Search, Download, CreditCard, MousePointerClick,
  Star, Quote, Check, Sparkles, Mail, Twitter, Github, Dribbble,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { products, reviews } from '@/data/store';
import { MagneticButton } from './AtelierCore';

const EASE = [0.22, 1, 0.36, 1] as const;

// ──────────────────────────────────────────────
// SHOP TEASER — bridges cinematic to practical
// ──────────────────────────────────────────────
export function ShopTeaser() {
  const { navigate } = useApp();

  return (
    <section className="relative py-32 px-4 lg:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-3xs font-mono tracking-[0.3em] uppercase text-atelier-cyan mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            The Full Collection
          </motion.span>
          <motion.h2
            className="font-display font-bold tracking-display text-atelier-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Browse <span className="text-gradient-cyan">500+ digital assets</span>
          </motion.h2>
        </div>

        {/* Preview grid — 4 items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {products.slice(4, 8).map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                className="rounded-2xl glass-card p-4 cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div
                  className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                  style={{ background: `${product.color}12`, border: `1px solid ${product.color}20` }}
                >
                  <Icon size={18} style={{ color: product.color }} strokeWidth={1.4} />
                </div>
                <p className="text-sm font-semibold text-atelier-white mb-1">{product.name}</p>
                <p className="text-2xs text-atelier-muted mb-2">{product.creator}</p>
                <span className="text-sm font-mono font-bold" style={{ color: product.color }}>${product.price}</span>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <MagneticButton onClick={() => navigate('/products')} variant="primary">
            Explore All Assets
            <ArrowRight size={16} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// LIGHT PATH — How it works, glowing path draws on scroll
// ──────────────────────────────────────────────
const STEPS: { icon: LucideIcon; title: string; desc: string; color: string }[] = [
  { icon: Search, title: 'Browse', desc: 'Explore curated wings of premium digital assets', color: '#7B5CFF' },
  { icon: CreditCard, title: 'Purchase', desc: 'Secure checkout with instant processing', color: '#3FE0D0' },
  { icon: Download, title: 'Instant Download', desc: 'Access your files immediately after purchase', color: '#FFC15E' },
  { icon: MousePointerClick, title: 'Use & Create', desc: 'Deploy in your projects and start creating', color: '#7B5CFF' },
];

export function LightPath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const pathScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative py-32 px-4 lg:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            className="inline-block text-3xs font-mono tracking-[0.3em] uppercase text-atelier-gold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            How It Works
          </motion.span>
          <motion.h2
            className="font-display font-bold tracking-display text-atelier-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Follow the <span className="text-gradient-trio">light path</span>
          </motion.h2>
        </div>

        {/* Path with steps */}
        <div className="relative">
          {/* Glowing vertical line — draws as you scroll */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-white/5" />
            <motion.div
              className="absolute inset-0 origin-top"
              style={{
                scaleY: pathScale,
                background: 'linear-gradient(180deg, #7B5CFF, #3FE0D0, #FFC15E)',
                boxShadow: '0 0 10px rgba(123,92,255,0.4)',
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-24">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <div className="flex-1" />
                  {/* Node on the path */}
                  <div className="relative shrink-0">
                    <motion.div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        background: `${step.color}15`,
                        border: `1px solid ${step.color}30`,
                        boxShadow: `0 0 20px ${step.color}20`,
                      }}
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      <Icon size={22} style={{ color: step.color }} strokeWidth={1.4} />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-atelier-white mb-1">{step.title}</h3>
                    <p className="text-sm text-atelier-white-soft/50 font-light">{step.desc}</p>
                    <span className="text-3xs font-mono tracking-[0.2em] uppercase mt-2 block" style={{ color: step.color }}>
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// TESTIMONIAL WALL — rotating gallery of framed portraits
// ──────────────────────────────────────────────
export function TestimonialWall() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="relative py-32 px-4 lg:px-6 overflow-hidden">
      {/* Ambient light */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(123,92,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-3xs font-mono tracking-[0.3em] uppercase text-atelier-violet-soft mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Voices from the Gallery
          </motion.span>
          <motion.h2
            className="font-display font-bold tracking-display text-atelier-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            What creators say
          </motion.h2>
        </div>

        {/* Framed portrait carousel */}
        <div
          className="relative min-h-[280px] flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="relative max-w-2xl w-full"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {/* Spotlight behind */}
              <div
                className="absolute inset-0 -z-10 rounded-3xl"
                style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 30%, rgba(123,92,255,0.06) 0%, transparent 70%)' }}
              />

              <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
                {/* Frame glow */}
                <div className="absolute inset-0 rounded-3xl" style={{ border: '1px solid rgba(123,92,255,0.1)' }} />

                <Quote size={28} className="text-atelier-violet/30 mb-4" />
                <p className="text-lg md:text-xl text-atelier-white font-light leading-relaxed mb-8">
                  "{reviews[active].content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold text-atelier-white"
                    style={{ background: 'linear-gradient(135deg, rgba(123,92,255,0.2) 0%, rgba(63,224,208,0.1) 100%)', border: '1px solid rgba(123,92,255,0.15)' }}>
                    {reviews[active].avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-atelier-white">{reviews[active].author}</p>
                    <p className="text-2xs text-atelier-muted">{reviews[active].role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(reviews[active].rating)].map((_, j) => (
                      <Star key={j} size={12} className="text-atelier-gold fill-atelier-gold" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex gap-2 mt-8 justify-center">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === active ? 28 : 8,
                  background: i === active ? 'rgba(123,92,255,0.5)' : 'rgba(255,255,255,0.12)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// PRICING VAULTS — glowing tier cards
// ──────────────────────────────────────────────
const TIERS = [
  { name: 'Starter', price: '$0', period: 'forever', color: '#7C7A9E', glow: 0.15, features: ['Browse all assets', '3 free downloads / month', 'Community access'], popular: false },
  { name: 'Creator', price: '$19', period: '/month', color: '#7B5CFF', glow: 0.3, features: ['Unlimited downloads', 'All categories unlocked', 'Commercial license', 'Priority support'], popular: true },
  { name: 'Studio', price: '$49', period: '/month', color: '#3FE0D0', glow: 0.25, features: ['Everything in Creator', '5 team seats', 'Custom requests', 'Early access assets'], popular: false },
  { name: 'Enterprise', price: 'Custom', period: '', color: '#FFC15E', glow: 0.2, features: ['Everything in Studio', 'Unlimited seats', 'Dedicated manager', 'Custom licensing'], popular: false },
];

export function PricingVaults() {
  const { navigate } = useApp();

  return (
    <section className="relative py-32 px-4 lg:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-3xs font-mono tracking-[0.3em] uppercase text-atelier-gold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Membership Vaults
          </motion.span>
          <motion.h2
            className="font-display font-bold tracking-display text-atelier-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Choose your <span className="text-gradient-trio">vault</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              className="relative rounded-3xl glass-card p-6 flex flex-col"
              style={{
                boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 ${tier.glow * 60}px ${tier.color}${tier.popular ? '30' : '15'}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                border: tier.popular ? `1px solid ${tier.color}40` : '1px solid rgba(255,255,255,0.08)',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              whileHover={{ y: -8, boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 ${tier.glow * 100}px ${tier.color}30, inset 0 1px 0 rgba(255,255,255,0.08)` }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-3xs font-mono uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: tier.color, color: '#000', boxShadow: `0 0 15px ${tier.color}50` }}>
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-atelier-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-display font-bold" style={{ color: tier.color }}>{tier.price}</span>
                <span className="text-2xs text-atelier-muted">{tier.period}</span>
              </div>

              <div className="space-y-3 flex-1">
                {tier.features.map((feat, j) => (
                  <motion.div
                    key={feat}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.05, duration: 0.4 }}
                  >
                    <Check size={14} style={{ color: tier.color }} />
                    <span className="text-xs text-atelier-white-soft/70 font-light">{feat}</span>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => navigate('/signup')}
                className="mt-6 w-full py-2.5 rounded-full text-sm font-medium transition-all duration-500"
                style={{
                  background: tier.popular ? tier.color : 'rgba(255,255,255,0.04)',
                  color: tier.popular ? '#000' : '#F0EEFF',
                  border: tier.popular ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// FINAL CTA — closing cinematic moment
// ──────────────────────────────────────────────
export function FinalCTA() {
  const { navigate } = useApp();

  return (
    <section className="relative py-40 px-4 lg:px-6 overflow-hidden">
      {/* Warming color shift */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: EASE }}
        style={{ background: 'radial-gradient(ellipse 50% 70% at 50% 50%, rgba(255,193,94,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          className="flex items-center justify-center gap-2.5 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-atelier-violet via-atelier-cyan to-atelier-gold" style={{ filter: 'blur(2px)' }} />
            <div className="absolute inset-[2px] rounded-[10px] bg-atelier-void flex items-center justify-center">
              <Sparkles size={16} className="text-atelier-violet-soft" />
            </div>
          </div>
        </motion.div>

        <motion.h2
          className="font-display font-bold tracking-display leading-[1.05] text-atelier-white"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          Your journey
          <br />
          starts <span className="text-gradient-trio">here</span>
        </motion.h2>

        <motion.p
          className="mt-6 text-base text-atelier-white-soft/50 font-light max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
        >
          Step through the portal. The atelier is open.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
        >
          <MagneticButton onClick={() => navigate('/products')} variant="primary" className="text-base px-8 py-4">
            Enter the Gallery
            <ArrowRight size={18} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// EXIT PORTAL — footer styled as closing portal
// ──────────────────────────────────────────────
export function ExitPortal() {
  const { navigate } = useApp();
  const [email, setEmail] = useState('');

  return (
    <footer className="relative pt-24 pb-12 px-4 lg:px-6 overflow-hidden">
      {/* Closing radial glow frame */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[800px] h-[800px] rounded-full"
          style={{
            border: '1px solid rgba(123,92,255,0.06)',
            boxShadow: 'inset 0 0 100px rgba(123,92,255,0.03)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Newsletter */}
        <div className="text-center mb-20">
          <h3 className="font-display text-2xl font-bold text-atelier-white mb-3">
            Join the <span className="text-gradient-violet">atelier</span>
          </h3>
          <p className="text-sm text-atelier-muted mb-6 font-light">
            Get notified when new artifacts arrive. No noise, just craft.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
            className="flex items-center gap-2 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-atelier-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full glass rounded-full pl-10 pr-4 py-3 text-sm text-atelier-white placeholder:text-atelier-muted/50 focus:outline-none focus:border-atelier-violet/30 transition-colors"
              />
            </div>
            <button type="submit" className="px-5 py-3 rounded-full bg-atelier-violet text-white text-sm font-medium hover:shadow-glow-violet transition-all duration-500">
              Subscribe
            </button>
          </form>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { title: 'Explore', links: [['All Products', '/products'], ['Categories', '/categories'], ['Services', '/services'], ['Pricing', '/pricing']] },
            { title: 'Company', links: [['About', '/about'], ['Blog', '/blog'], ['Contact', '/contact'], ['Careers', '/about']] },
            { title: 'Support', links: [['Help Center', '/support'], ['FAQ', '/faq'], ['Privacy', '/privacy'], ['Terms', '/terms']] },
            { title: 'Account', links: [['Login', '/login'], ['Sign Up', '/signup'], ['Dashboard', '/dashboard'], ['Wishlist', '/wishlist']] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-3xs font-mono uppercase tracking-[0.2em] text-atelier-muted mb-4">{col.title}</h4>
              <div className="space-y-2.5">
                {col.links.map(([label, path]) => (
                  <button
                    key={label}
                    onClick={() => navigate(path)}
                    className="block text-sm text-atelier-white-soft/50 hover:text-atelier-white transition-colors duration-300 group relative"
                  >
                    <span className="relative">
                      {label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-atelier-violet transition-all duration-300 group-hover:w-full" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-atelier-violet via-atelier-cyan to-atelier-gold" style={{ filter: 'blur(1px)' }} />
              <div className="absolute inset-[1.5px] rounded-[7px] bg-atelier-void flex items-center justify-center">
                <Sparkles size={12} className="text-atelier-violet-soft" />
              </div>
            </div>
            <span className="text-sm font-bold tracking-tightest text-atelier-white font-display">NOVIXA</span>
            <span className="text-2xs text-atelier-muted ml-2 font-mono">© 2026 The Infinite Atelier</span>
          </div>

          <div className="flex items-center gap-4">
            {[Twitter, Github, Dribbble].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-atelier-muted hover:text-atelier-white hover:border-atelier-violet/20 transition-all duration-300"
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
