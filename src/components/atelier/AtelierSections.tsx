import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Search, Download, CreditCard, MousePointerClick,
  Star, Quote, Check, Sparkles, Mail, Twitter, Github, Dribbble,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { useI18n } from '@/i18n/I18nContext';
import { products, reviews } from '@/data/store';
import { MagneticButton } from './AtelierCore';

const EASE = [0.22, 1, 0.36, 1] as const;

export function ShopTeaser() {
  const { navigate } = useApp();
  const { t, isRTL } = useI18n();

  return (
    <section className="relative py-32 px-4 lg:px-6 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-3xs font-mono tracking-[0.3em] uppercase text-atelier-cyan mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {t.shopLabel}
          </motion.span>
          <motion.h2
            className="font-display font-bold tracking-display text-atelier-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {t.shopTitle1} <span className="text-gradient-cyan">{t.shopTitle2}</span>
          </motion.h2>
        </div>

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

        <div className="text-center">
          <MagneticButton onClick={() => navigate('/products')} variant="primary">
            {t.shopCta}
            <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

export function LightPath() {
  const { t, isRTL } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const pathScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const STEPS: { icon: LucideIcon; title: string; desc: string; color: string }[] = [
    { icon: Search, title: t.step01Title, desc: t.step01Desc, color: '#7B5CFF' },
    { icon: CreditCard, title: t.step02Title, desc: t.step02Desc, color: '#3FE0D0' },
    { icon: Download, title: t.step03Title, desc: t.step03Desc, color: '#FFC15E' },
    { icon: MousePointerClick, title: t.step04Title, desc: t.step04Desc, color: '#7B5CFF' },
  ];

  return (
    <section ref={ref} className="relative py-32 px-4 lg:px-6 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            className="inline-block text-3xs font-mono tracking-[0.3em] uppercase text-atelier-gold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {t.pathLabel}
          </motion.span>
          <motion.h2
            className="font-display font-bold tracking-display text-atelier-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {t.pathTitle1} <span className="text-gradient-trio">{t.pathTitle2}</span>
          </motion.h2>
        </div>

        <div className="relative">
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
                      {t.step} {String(i + 1).padStart(2, '0')}
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

export function TestimonialWall() {
  const { t, isRTL } = useI18n();
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
    <section className="relative py-32 px-4 lg:px-6 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
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
            {t.voicesLabel}
          </motion.span>
          <motion.h2
            className="font-display font-bold tracking-display text-atelier-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {t.voicesTitle}
          </motion.h2>
        </div>

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
              <div
                className="absolute inset-0 -z-10 rounded-3xl"
                style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 30%, rgba(123,92,255,0.06) 0%, transparent 70%)' }}
              />

              <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
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

export function PricingVaults() {
  const { navigate } = useApp();
  const { t, isRTL } = useI18n();

  const TIERS = [
    { name: t.tierStarter, price: '$0', period: t.tierForever, color: '#7C7A9E', glow: 0.15, features: [t.featBrowse, t.feat3Free, t.featCommunity], popular: false },
    { name: t.tierCreator, price: '$19', period: t.tierMonth, color: '#7B5CFF', glow: 0.3, features: [t.featUnlimited, t.featAllCat, t.featCommercial, t.featPriority], popular: true },
    { name: t.tierStudio, price: '$49', period: t.tierMonth, color: '#3FE0D0', glow: 0.25, features: [t.featCreatorPlus, t.feat5Seats, t.featCustomReq, t.featEarly], popular: false },
    { name: t.tierEnterprise, price: t.tierCustom, period: '', color: '#FFC15E', glow: 0.2, features: [t.featStudioPlus, t.featUnlimitedSeats, t.featManager, t.featCustomLic], popular: false },
  ];

  return (
    <section className="relative py-32 px-4 lg:px-6 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-3xs font-mono tracking-[0.3em] uppercase text-atelier-gold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {t.vaultsLabel}
          </motion.span>
          <motion.h2
            className="font-display font-bold tracking-display text-atelier-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {t.vaultsTitle1} <span className="text-gradient-trio">{t.vaultsTitle2}</span>
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
                    {t.tierPopular}
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
                    initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
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
                {tier.price === t.tierCustom ? t.tierContact : t.tierGetStarted}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { navigate } = useApp();
  const { t, isRTL } = useI18n();

  return (
    <section className="relative py-40 px-4 lg:px-6 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
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
          {t.finalTitle1}
          <br />
          {t.finalTitle2.includes('here') ? (
            <>starts <span className="text-gradient-trio">here</span></>
          ) : (
            <span className="text-gradient-trio">{t.finalTitle2}</span>
          )}
        </motion.h2>

        <motion.p
          className="mt-6 text-base text-atelier-white-soft/50 font-light max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
        >
          {t.finalSub}
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
        >
          <MagneticButton onClick={() => navigate('/products')} variant="primary" className="text-base px-8 py-4">
            {t.finalCta}
            <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

export function ExitPortal() {
  const { navigate } = useApp();
  const { t, isRTL } = useI18n();
  const [email, setEmail] = useState('');

  const FOOTER_LINKS = [
    { title: t.footerExplore, links: [[t.footerProducts, '/products'], [t.footerCategories, '/categories'], [t.footerServices, '/services'], [t.footerPricing, '/pricing']] },
    { title: t.footerCompany, links: [[t.footerAbout, '/about'], [t.footerBlog, '/blog'], [t.footerContact, '/contact'], [t.footerCareers, '/about']] },
    { title: t.footerSupport, links: [[t.footerHelp, '/support'], [t.footerFaq, '/faq'], [t.footerPrivacy, '/privacy'], [t.footerTerms, '/terms']] },
    { title: t.footerAccount, links: [[t.footerLogin, '/login'], [t.footerSignup, '/signup'], [t.footerDashboard, '/dashboard'], [t.footerWishlist, '/wishlist']] },
  ];

  return (
    <footer className="relative pt-24 pb-12 px-4 lg:px-6 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
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
        <div className="text-center mb-20">
          <h3 className="font-display text-2xl font-bold text-atelier-white mb-3">
            {t.footerJoin} <span className="text-gradient-violet">{t.footerJoinTitle}</span>
          </h3>
          <p className="text-sm text-atelier-muted mb-6 font-light">
            {t.footerSub}
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
            className="flex items-center gap-2 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <Mail size={16} className="absolute top-1/2 -translate-y-1/2 text-atelier-muted" style={isRTL ? { right: 12 } : { left: 12 }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footerPlaceholder}
                className="w-full glass rounded-full py-3 text-sm text-atelier-white placeholder:text-atelier-muted/50 focus:outline-none focus:border-atelier-violet/30 transition-colors"
                style={isRTL ? { paddingRight: 40, paddingLeft: 16 } : { paddingLeft: 40, paddingRight: 16 }}
              />
            </div>
            <button type="submit" className="px-5 py-3 rounded-full bg-atelier-violet text-white text-sm font-medium hover:shadow-glow-violet transition-all duration-500">
              {t.footerSubscribe}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {FOOTER_LINKS.map((col) => (
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
                      <span className="absolute -bottom-0.5 w-0 h-px bg-atelier-violet transition-all duration-300 group-hover:w-full" style={isRTL ? { right: 0 } : { left: 0 }} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-atelier-violet via-atelier-cyan to-atelier-gold" style={{ filter: 'blur(1px)' }} />
              <div className="absolute inset-[1.5px] rounded-[7px] bg-atelier-void flex items-center justify-center">
                <Sparkles size={12} className="text-atelier-violet-soft" />
              </div>
            </div>
            <span className="text-sm font-bold tracking-tightest text-atelier-white font-display">NOVIXA</span>
            <span className="text-2xs text-atelier-muted mx-2 font-mono">{t.footerRights}</span>
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
