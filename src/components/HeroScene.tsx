import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { products } from '@/data/store';
import type { LucideIcon } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;
const SLOW_EASE = [0.16, 1, 0.3, 1] as const;

const HERO_PRODUCTS = products.filter((p) => p.featured).slice(0, 4);

export function HeroScene() {
  const { navigate } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll-driven transforms
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const spotlightY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const heroProductY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const heroProductScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const heroProductOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);

  // Ecosystem products emerge on scroll
  const ecosystemY = useTransform(scrollYProgress, [0.15, 0.6], [120, 0]);
  const ecosystemOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  // Mouse-following light
  const mouseRawX = useMotionValue(0);
  const mouseRawY = useMotionValue(0);
  const mouseLightX = useSpring(mouseRawX, { stiffness: 30, damping: 40, mass: 1.5 });
  const mouseLightY = useSpring(mouseRawY, { stiffness: 30, damping: 40, mass: 1.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    mouseRawX.set(x);
    mouseRawY.set(y);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[130vh] w-full overflow-hidden bg-novixa-bg"
      onMouseMove={handleMouseMove}
      style={{ perspective: '2000px' }}
    >
      {/* ── Background: deep black studio with volumetric lighting ── */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Soft ambient base light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 55%, rgba(14,16,22,1) 0%, #050505 70%)',
        }}
      />

      {/* Cinematic spotlight — large, soft, slowly drifting */}
      <motion.div
        className="absolute"
        style={{
          left: '50%',
          top: '45%',
          x: '-50%',
          y: spotlightY,
          width: '60vw',
          height: '60vw',
          maxWidth: 800,
          maxHeight: 800,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,153,255,0.08) 0%, rgba(0,153,255,0.03) 30%, transparent 65%)',
          filter: 'blur(60px)',
          opacity: spotlightOpacity,
        }}
      />

      {/* Mouse-following light — very subtle */}
      <motion.div
        className="absolute"
        style={{
          left: `${mouseLightX.get()}%`,
          top: `${mouseLightY.get()}%`,
          x: '-50%',
          y: '-50%',
          width: '30vw',
          height: '30vw',
          maxWidth: 500,
          maxHeight: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{
          left: `${mouseLightX.get()}%`,
          top: `${mouseLightY.get()}%`,
        }}
        transition={{ ease: 'linear', duration: 0.1 }}
      />

      {/* Rim light from the left — charcoal edge */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(255,255,255,0.015) 0%, transparent 15%, transparent 85%, rgba(0,153,255,0.015) 100%)',
        }}
      />

      {/* Subtle floor reflection gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-1/3"
        style={{
          background:
            'linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 100%)',
        }}
      />

      {/* ── Hero content: typography-led, minimal ── */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        {/* Logo reveal from darkness */}
        <motion.div
          className="flex items-center gap-2.5 mb-10"
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, delay: 0.3, ease: SLOW_EASE }}
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-br from-novixa-blue to-novixa-purple"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <div className="absolute inset-[1.5px] rounded-[7px] bg-novixa-bg flex items-center justify-center">
              <Sparkles size={14} className="text-novixa-blue" />
            </div>
          </div>
          <motion.span
            className="text-sm font-bold tracking-tightest text-novixa-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            NOVIXA
          </motion.span>
        </motion.div>

        {/* Headline — the hero element, huge, elegant */}
        <motion.h1
          className="text-center font-bold tracking-tightest leading-[1.02] text-novixa-white"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 0.6, ease: EASE }}
        >
          Digital products,
          <br />
          <span className="text-novixa-muted/60">crafted to feel </span>
          <span className="text-novixa-blue">alive</span>
        </motion.h1>

        {/* Subtitle — short, confident */}
        <motion.p
          className="mt-8 text-sm md:text-base text-novixa-muted font-light tracking-wide max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
        >
          The premium marketplace for the world's finest digital assets.
        </motion.p>

        {/* CTAs — minimal, one accent */}
        <motion.div
          className="mt-12 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: EASE }}
        >
          <button
            onClick={() => navigate('/products')}
            className="group relative flex items-center gap-2 px-6 py-3 rounded-full bg-novixa-blue text-white text-sm font-medium transition-all duration-500 hover:bg-novixa-blue-soft"
            style={{ boxShadow: '0 0 0 0 rgba(0,153,255,0)' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 30px rgba(0,153,255,0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0,153,255,0)')}
          >
            Explore Marketplace
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => navigate('/assistant')}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-novixa-white/80 hover:text-novixa-white transition-colors duration-500"
          >
            <Sparkles size={14} className="text-novixa-blue" />
            AI Assistant
          </button>
        </motion.div>
      </motion.div>

      {/* ── Hero product: single flagship, spotlight-lit, premium ── */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        style={{ opacity: heroProductOpacity, y: heroProductY, scale: heroProductScale }}
      >
        <HeroProduct />
      </motion.div>

      {/* ── Ecosystem products: emerge on scroll ── */}
      <motion.div
        className="absolute inset-0 z-15 flex items-center justify-center"
        style={{ opacity: ecosystemOpacity, y: ecosystemY }}
      >
        <EcosystemProducts />
      </motion.div>

      {/* ── Scroll indicator — minimal ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-novixa-white/20 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}

// ── Single hero product: luxury object presentation ──
function HeroProduct() {
  const heroProduct = HERO_PRODUCTS[0];
  if (!heroProduct) return null;
  const Icon = heroProduct.icon;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 2, delay: 1.2, ease: SLOW_EASE }}
    >
      {/* Soft floor shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-48 h-6 rounded-full"
        style={{ background: 'rgba(0,0,0,0.5)', filter: 'blur(20px)' }}
      />

      {/* Product pedestal */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        {/* Rim light glow */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${heroProduct.color}08 0%, transparent 60%)`,
            filter: 'blur(30px)',
          }}
        />

        {/* Product card — minimal, premium */}
        <div
          className="relative w-44 h-44 md:w-52 md:h-52 rounded-3xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
          }}
        >
          {/* Inner product icon */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon size={56} style={{ color: heroProduct.color }} strokeWidth={1.2} />
          </motion.div>

          {/* Product name — subtle, at bottom */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-xs font-medium text-novixa-white/60 tracking-wide">{heroProduct.name}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Ecosystem: 3-4 products arranged elegantly, revealed on scroll ──
function EcosystemProducts() {
  const items = HERO_PRODUCTS.slice(1, 4);
  const positions = [
    { x: -220, y: -40, rotate: -6 },
    { x: 220, y: -40, rotate: 6 },
    { x: -120, y: 120, rotate: 3 },
    { x: 120, y: 120, rotate: -3 },
  ];

  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      {items.map((product, i) => {
        const Icon = product.icon;
        const pos = positions[i] || positions[0];
        return (
          <motion.div
            key={product.id}
            className="absolute left-1/2 top-1/2"
            style={{ x: pos.x, y: pos.y, rotate: pos.rotate }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.15, ease: EASE }}
            whileHover={{ scale: 1.05, y: pos.y - 8, transition: { duration: 0.4, ease: EASE } }}
          >
            <EcosystemCard product={product} icon={Icon} />
          </motion.div>
        );
      })}
    </div>
  );
}

function EcosystemCard({ product, icon: Icon }: { product: typeof products[0]; icon: LucideIcon }) {
  return (
    <div
      className="relative w-32 h-32 rounded-2xl flex flex-col items-center justify-center gap-2"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: `0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
    >
      {/* Soft inner light */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${product.color}06 0%, transparent 60%)`,
        }}
      />
      <Icon size={28} style={{ color: product.color }} strokeWidth={1.3} />
      <p className="text-2xs font-medium text-novixa-white/50 tracking-wide">{product.name}</p>
    </div>
  );
}
