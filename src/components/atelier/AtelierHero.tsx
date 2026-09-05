import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { useI18n } from '@/i18n/I18nContext';
import { MagneticButton } from './AtelierCore';

const EASE = [0.22, 1, 0.36, 1] as const;

export function AtelierHero() {
  const { navigate } = useApp();
  const { t, isRTL } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const spotlightX = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-atelier-void" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Cursor-reactive spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 40% at ${50 + mouse.x * 15}% ${50 + mouse.y * 15}%, rgba(123,92,255,0.06) 0%, transparent 60%)`,
        }}
      />

      {/* Particle field — CSS animated dots */}
      <ParticleField mouseX={mouse.x} mouseY={mouse.y} />

      {/* Nebula glow layers */}
      <motion.div
        className="absolute"
        style={{
          width: '60vw', height: '60vw', maxWidth: 800, maxHeight: 800,
          top: '20%', left: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,92,255,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          x: mouse.x * 20,
          y: mouse.y * 20,
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{
          width: '50vw', height: '50vw', maxWidth: 600, maxHeight: 600,
          bottom: '10%', right: '5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(63,224,208,0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
          x: mouse.x * -25,
          y: mouse.y * -25,
        }}
        animate={{ scale: [1, 0.9, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        {/* Logo assembly */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
          }}
        >
          <motion.div
            className="relative w-11 h-11 flex items-center justify-center"
            variants={{ hidden: { opacity: 0, scale: 0, y: -20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { ease: EASE } } }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-atelier-violet via-atelier-cyan to-atelier-gold" style={{ filter: 'blur(2px)' }} />
            <div className="absolute inset-[2px] rounded-[10px] bg-atelier-void flex items-center justify-center">
              <Sparkles size={18} className="text-atelier-violet-soft" />
            </div>
          </motion.div>
          {['N', 'O', 'V', 'I', 'X', 'A'].map((char, i) => (
            <motion.span
              key={i}
              className="text-2xl font-bold tracking-tightest text-atelier-white font-display"
              variants={{
                hidden: { opacity: 0, y: -30, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { ease: EASE } },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display font-bold tracking-display leading-[1.05] text-center text-atelier-white"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1, ease: EASE }}
        >
          {t.heroHeadline1}
          <br />
          {t.heroHeadline2.includes('Art') ? (
            <>Becomes <span className="text-gradient-trio">Art</span></>
          ) : (
            <span className="text-gradient-trio">{t.heroHeadline2}</span>
          )}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mt-6 text-base md:text-lg text-atelier-white-soft/60 font-light tracking-wide max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
        >
          {t.heroSub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: EASE }}
        >
          <MagneticButton onClick={() => navigate('/products')} variant="primary">
            {t.heroCtaEnter}
            <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
          </MagneticButton>
          <MagneticButton onClick={() => navigate('/categories')} variant="outline">
            {t.heroCtaBrowse}
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — animated light trail */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: heroOpacity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xs font-mono text-atelier-muted tracking-[0.3em] uppercase">{t.scroll}</span>
          <div className="relative w-px h-12 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-atelier-violet to-transparent"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Particle Field — lightweight CSS/canvas particles
// ──────────────────────────────────────────────
function ParticleField({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const particles: { x: number; y: number; z: number; vx: number; vy: number; size: number; color: string }[] = [];
    const colors = ['rgba(123,92,255,', 'rgba(63,224,208,', 'rgba(255,193,94,'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 0.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx + mouseX * 0.3 * p.z;
        p.y += p.vy + mouseY * 0.3 * p.z;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.z, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (0.15 * p.z) + ')';
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [mouseX, mouseY]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}
