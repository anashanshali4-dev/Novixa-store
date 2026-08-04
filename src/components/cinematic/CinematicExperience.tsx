import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Figma,
  Code2,
  Brain,
  Palette,
  Smartphone,
  Globe,
  PenTool,
  Layers,
  Zap,
  Shield,
  BarChart3,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { products, categories, reviews, stats, clientLogos, services } from '@/data/store';

const EASE = [0.22, 1, 0.36, 1] as const;
const SLOW = [0.16, 1, 0.3, 1] as const;
const CINEMATIC = [0.83, 0, 0.17, 1] as const;

// ──────────────────────────────────────────────
// MAIN CINEMATIC EXPERIENCE
// ──────────────────────────────────────────────
export function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    mass: 0.8,
  });

  // Global camera transforms
  const cameraY = useTransform(smoothProgress, [0, 1], ['0%', '-100%']);
  const cameraScale = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [1, 1.02, 1.02, 1.05]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '900vh' }}>
      {/* Fixed camera viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        <motion.div
          className="absolute inset-0"
          style={{ y: cameraY, scale: cameraScale }}
        >
          {/* All scenes stacked vertically, each 100vh */}
          <Scene01Void progress={smoothProgress} />
          <Scene02Grid progress={smoothProgress} />
          <Scene03Blueprint progress={smoothProgress} />
          <Scene04Creation progress={smoothProgress} />
          <Scene05Ecosystem progress={smoothProgress} />
          <Scene06Transformation progress={smoothProgress} />
          <Scene07Showcase progress={smoothProgress} />
          <Scene08Future progress={smoothProgress} />
          <Scene09Signature progress={smoothProgress} />
        </motion.div>

        {/* Persistent scroll progress indicator */}
        <ScrollProgress progress={smoothProgress} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCROLL PROGRESS INDICATOR
// ──────────────────────────────────────────────
function ScrollProgress({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, [0, 1], ['0%', '100%']);
  const [sceneLabel, setSceneLabel] = useState('The Void');

  useEffect(() => {
    const labels: [number, string][] = [
      [0.0, 'The Void'],
      [0.11, 'The Grid'],
      [0.22, 'The Blueprint'],
      [0.33, 'The Creation'],
      [0.44, 'The Ecosystem'],
      [0.55, 'The Transformation'],
      [0.66, 'The Showcase'],
      [0.77, 'The Future'],
      [0.88, 'The Signature'],
    ];
    const unsub = progress.on('change', (v) => {
      const label = [...labels].reverse().find(([t]) => v >= t);
      if (label) setSceneLabel(label[1]);
    });
    return () => unsub();
  }, [progress]);

  return (
    <div className="absolute bottom-0 inset-x-0 z-50 pointer-events-none">
      <div className="flex items-center gap-3 px-6 pb-4">
        <span className="text-[10px] font-medium text-novixa-white/30 tracking-[0.2em] uppercase">
          {sceneLabel}
        </span>
        <div className="flex-1 h-px bg-novixa-white/10 relative overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-novixa-blue" style={{ width }} />
        </div>
        <span className="text-[10px] font-medium text-novixa-white/30 tracking-[0.2em] uppercase">
          Novixa
        </span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCENE 01 — THE VOID
// ──────────────────────────────────────────────
function Scene01Void({ progress }: { progress: MotionValue<number> }) {
  const { navigate } = useApp();

  const lightScale = useTransform(progress, [0, 0.08], [0, 1]);
  const lightOpacity = useTransform(progress, [0, 0.03, 0.09], [0, 0.6, 0]);
  const logoOpacity = useTransform(progress, [0.02, 0.06, 0.09], [0, 1, 0]);
  const logoBlur = useTransform(progress, [0.02, 0.06], [12, 0]);
  const headlineOpacity = useTransform(progress, [0.04, 0.08, 0.1], [0, 1, 0]);
  const headlineY = useTransform(progress, [0.04, 0.08], [40, 0]);
  const subOpacity = useTransform(progress, [0.06, 0.09, 0.1], [0, 1, 0]);
  const ctaOpacity = useTransform(progress, [0.07, 0.09, 0.1], [0, 1, 0]);
  const sceneOpacity = useTransform(progress, [0.08, 0.11], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity: sceneOpacity }}
    >
      {/* Single tiny light that grows */}
      <motion.div
        className="absolute"
        style={{
          width: '40vw',
          height: '40vw',
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,153,255,0.06) 0%, transparent 65%)',
          filter: 'blur(40px)',
          scale: lightScale,
          opacity: lightOpacity,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo from darkness */}
        <motion.div
          className="flex items-center gap-2.5 mb-12"
          style={{ opacity: logoOpacity, filter: useBlurFilter(logoBlur) }}
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-novixa-blue to-novixa-blue-soft" />
            <div className="absolute inset-[1.5px] rounded-[7px] bg-[#050505] flex items-center justify-center">
              <Sparkles size={15} className="text-novixa-blue" />
            </div>
          </div>
          <span className="text-sm font-bold tracking-tightest text-novixa-white">NOVIXA</span>
        </motion.div>

        {/* Headline — oversized, editorial */}
        <motion.h1
          className="font-bold tracking-tightest leading-[1.02] text-novixa-white text-center"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            opacity: headlineOpacity,
            y: headlineY,
          }}
        >
          Digital products,
          <br />
          <span className="text-novixa-muted/50">born here</span>
        </motion.h1>

        {/* Subtitle — short, quiet */}
        <motion.p
          className="mt-8 text-sm md:text-base text-novixa-muted font-light tracking-wide max-w-sm"
          style={{ opacity: subOpacity }}
        >
          Not a marketplace. A creation studio.
        </motion.p>

        {/* CTA — minimal, appears last */}
        <motion.div
          className="mt-12 flex items-center gap-4"
          style={{ opacity: ctaOpacity }}
        >
          <button
            onClick={() => navigate('/products')}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-novixa-blue text-white text-sm font-medium transition-all duration-700 hover:shadow-[0_0_30px_rgba(0,153,255,0.25)]"
          >
            Enter the Studio
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 02 — THE GRID
// ──────────────────────────────────────────────
function Scene02Grid({ progress }: { progress: MotionValue<number> }) {
  const gridOpacity = useTransform(progress, [0.1, 0.16, 0.2, 0.21], [0, 1, 1, 0]);
  const gridScale = useTransform(progress, [0.1, 0.16], [1.1, 1]);
  const lineDraw = useTransform(progress, [0.11, 0.18], [0, 1]);
  const textOpacity = useTransform(progress, [0.14, 0.18, 0.2, 0.21], [0, 1, 1, 0]);
  const textY = useTransform(progress, [0.14, 0.18], [30, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ opacity: gridOpacity }}
    >
      {/* Precision design grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: gridScale,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 80%)',
        }}
      />

      {/* Construction lines — animated draw */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <motion.line
          x1="10%" y1="50%" x2="90%" y2="50%"
          stroke="rgba(0,153,255,0.15)"
          strokeWidth="1"
          style={{ pathLength: lineDraw }}
        />
        <motion.line
          x1="50%" y1="10%" x2="50%" y2="90%"
          stroke="rgba(0,153,255,0.15)"
          strokeWidth="1"
          style={{ pathLength: lineDraw }}
        />
        <motion.line
          x1="20%" y1="20%" x2="80%" y2="80%"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="4 4"
          style={{ pathLength: lineDraw }}
        />
        <motion.line
          x1="80%" y1="20%" x2="20%" y2="80%"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="4 4"
          style={{ pathLength: lineDraw }}
        />
      </svg>

      {/* Anchor points */}
      {[
        { x: '10%', y: '50%' }, { x: '90%', y: '50%' },
        { x: '50%', y: '10%' }, { x: '50%', y: '90%' },
        { x: '20%', y: '20%' }, { x: '80%', y: '80%' },
        { x: '80%', y: '20%' }, { x: '20%', y: '80%' },
      ].map((pt, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-novixa-blue/40"
          style={{
            left: pt.x, top: pt.y, transform: 'translate(-50%, -50%)',
            opacity: useTransform(progress, [0.13 + i * 0.005, 0.16], [0, 1]),
            scale: useTransform(progress, [0.13 + i * 0.005, 0.16], [0, 1]),
          }}
        />
      ))}

      {/* Typography overlay */}
      <motion.div
        className="relative z-10 text-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        <p className="text-[10px] font-medium text-novixa-blue tracking-[0.3em] uppercase mb-4">
          Scene 02
        </p>
        <h2
          className="font-bold tracking-tightest text-novixa-white/90"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Every pixel, plotted.
        </h2>
        <p className="mt-4 text-sm text-novixa-muted font-light">
          A design system, generated in real time.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 03 — THE BLUEPRINT
// ──────────────────────────────────────────────
function Scene03Blueprint({ progress }: { progress: MotionValue<number> }) {
  const sceneOpacity = useTransform(progress, [0.21, 0.25, 0.31, 0.33], [0, 1, 1, 0]);
  const wireframeScale = useTransform(progress, [0.21, 0.28], [0.8, 1]);
  const wireframeOpacity = useTransform(progress, [0.21, 0.26], [0, 1]);
  const realOpacity = useTransform(progress, [0.26, 0.3], [0, 1]);
  const textOpacity = useTransform(progress, [0.23, 0.27, 0.31, 0.33], [0, 1, 1, 0]);
  const textY = useTransform(progress, [0.23, 0.27], [30, 0]);

  const devices = [
    { label: 'Desktop', w: '320px', h: '200px', x: -180, y: -20 },
    { label: 'Tablet', w: '140px', h: '180px', x: 160, y: -60 },
    { label: 'Mobile', w: '70px', h: '140px', x: 240, y: 60 },
    { label: 'Dashboard', w: '260px', h: '160px', x: -60, y: 100 },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ opacity: sceneOpacity }}
    >
      {/* Wireframe devices */}
      <motion.div
        className="relative"
        style={{ scale: wireframeScale, opacity: wireframeOpacity }}
      >
        {devices.map((d, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: '50%', top: '50%',
              transform: `translate(calc(-50% + ${d.x}px), calc(-50% + ${d.y}px))`,
            }}
          >
            {/* Wireframe */}
            <div
              className="rounded-lg border border-dashed border-novixa-blue/30 relative overflow-hidden"
              style={{ width: d.w, height: d.h }}
            >
              {/* Wireframe internals */}
              <div className="absolute top-2 left-2 right-2 h-3 rounded-sm border border-novixa-blue/20" />
              <div className="absolute top-8 left-2 w-1/3 h-2 rounded-sm border border-novixa-blue/20" />
              <div className="absolute top-8 right-2 w-1/4 h-2 rounded-sm border border-novixa-blue/20" />
              <div className="absolute bottom-2 left-2 right-2 h-6 rounded-sm border border-novixa-blue/20" />
              <div className="absolute top-14 left-2 right-2 bottom-10 rounded-sm border border-novixa-blue/10" />

              {/* Real interface fading in */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  opacity: realOpacity,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="absolute top-2 left-2 right-2 h-3 rounded-sm bg-novixa-blue/15" />
                <div className="absolute top-8 left-2 w-1/3 h-2 rounded-sm bg-novixa-white/10" />
                <div className="absolute top-8 right-2 w-1/4 h-2 rounded-sm bg-novixa-white/10" />
                <div className="absolute bottom-2 left-2 right-2 h-6 rounded-sm bg-novixa-blue/10" />
              </motion.div>
            </div>
            <motion.p
              className="text-[9px] text-novixa-muted/50 mt-2 text-center tracking-wide"
              style={{ opacity: realOpacity }}
            >
              {d.label}
            </motion.p>
          </div>
        ))}
      </motion.div>

      {/* Text */}
      <motion.div
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center z-10"
        style={{ opacity: textOpacity, y: textY }}
      >
        <p className="text-[10px] font-medium text-novixa-blue tracking-[0.3em] uppercase mb-3">
          Scene 03
        </p>
        <h2
          className="font-bold tracking-tightest text-novixa-white/90"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Wireframes become real.
        </h2>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 04 — THE CREATION
// ──────────────────────────────────────────────
function Scene04Creation({ progress }: { progress: MotionValue<number> }) {
  const sceneOpacity = useTransform(progress, [0.33, 0.37, 0.42, 0.44], [0, 1, 1, 0]);
  const textOpacity = useTransform(progress, [0.35, 0.39, 0.42, 0.44], [0, 1, 1, 0]);

  const components: { icon: LucideIcon; label: string; color: string; x: number; y: number; delay: number }[] = [
    { icon: PenTool, label: 'Button', color: '#0099FF', x: -200, y: -120, delay: 0 },
    { icon: Layers, label: 'Card', color: '#A259FF', x: 180, y: -100, delay: 0.05 },
    { icon: Zap, label: 'Icon', color: '#22D3EE', x: -250, y: 40, delay: 0.1 },
    { icon: BarChart3, label: 'Chart', color: '#10B981', x: 220, y: 60, delay: 0.15 },
    { icon: Code2, label: 'Input', color: '#22D3EE', x: -100, y: 140, delay: 0.2 },
    { icon: Brain, label: 'Nav', color: '#7C3AED', x: 120, y: 160, delay: 0.25 },
    { icon: Shield, label: 'Badge', color: '#0099FF', x: 0, y: -160, delay: 0.3 },
    { icon: ShoppingBag, label: 'Cart', color: '#A259FF', x: -280, y: -40, delay: 0.35 },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ opacity: sceneOpacity }}
    >
      {/* Soft center light */}
      <div
        className="absolute"
        style={{
          width: '50vw', height: '50vw', maxWidth: 700, maxHeight: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,153,255,0.04) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Floating UI components */}
      {components.map((c, i) => {
        const Icon = c.icon;
        const itemOpacity = useTransform(progress, [0.35 + c.delay, 0.38 + c.delay, 0.42, 0.44], [0, 1, 1, 0]);
        const itemScale = useTransform(progress, [0.35 + c.delay, 0.38 + c.delay], [0.5, 1]);
        const itemY = useTransform(progress, [0.35 + c.delay, 0.4 + c.delay], [20, 0]);

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: '50%', top: '50%',
              x: c.x, y: c.y,
              opacity: itemOpacity,
              scale: itemScale,
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-1.5"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: `0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}
              >
                <Icon size={20} style={{ color: c.color }} strokeWidth={1.4} />
                <span className="text-[8px] text-novixa-white/40 font-medium tracking-wide">{c.label}</span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Text */}
      <motion.div
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center z-10"
        style={{ opacity: textOpacity }}
      >
        <p className="text-[10px] font-medium text-novixa-blue tracking-[0.3em] uppercase mb-3">
          Scene 04
        </p>
        <h2
          className="font-bold tracking-tightest text-novixa-white/90"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Components assemble.
        </h2>
        <p className="mt-3 text-sm text-novixa-muted font-light">
          Buttons, cards, charts, navigation — engineered into products.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 05 — THE ECOSYSTEM
// ──────────────────────────────────────────────
function Scene05Ecosystem({ progress }: { progress: MotionValue<number> }) {
  const sceneOpacity = useTransform(progress, [0.44, 0.48, 0.53, 0.55], [0, 1, 1, 0]);
  const textOpacity = useTransform(progress, [0.46, 0.5, 0.53, 0.55], [0, 1, 1, 0]);
  const orbitRotate = useTransform(progress, [0.44, 0.54], [0, 180]);
  const innerOrbitRotate = useTransform(progress, [0.44, 0.54], [0, -120]);

  const orbitItems = categories.slice(0, 6);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ opacity: sceneOpacity }}
    >
      {/* Center hub */}
      <motion.div
        className="absolute z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        style={{ scale: useTransform(progress, [0.46, 0.5], [0, 1]) }}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,153,255,0.08) 0%, rgba(124,58,237,0.04) 100%)',
            border: '1px solid rgba(0,153,255,0.15)',
            boxShadow: '0 0 60px rgba(0,153,255,0.1)',
          }}
        >
          <Sparkles size={28} className="text-novixa-blue" />
        </div>
      </motion.div>

      {/* Outer orbit ring */}
      <motion.div
        className="absolute"
        style={{ rotate: orbitRotate }}
      >
        {orbitItems.map((cat, i) => {
          const Icon = cat.icon;
          const angle = (i / orbitItems.length) * Math.PI * 2;
          const radius = 220;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const itemOpacity = useTransform(progress, [0.46 + i * 0.01, 0.5], [0, 1]);
          const itemScale = useTransform(progress, [0.46 + i * 0.01, 0.5], [0.5, 1]);

          return (
            <motion.div
              key={cat.id}
              className="absolute"
              style={{
                left: '50%', top: '50%',
                x, y,
                opacity: itemOpacity,
                scale: itemScale,
                transform: `translate(-50%, -50%)`,
              }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(145deg, ${cat.color}10 0%, ${cat.color}03 100%)`,
                    border: `1px solid ${cat.color}20`,
                  }}
                >
                  <Icon size={22} style={{ color: cat.color }} strokeWidth={1.3} />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Orbit rings — visual guides */}
      <div className="absolute rounded-full border border-novixa-white/5" style={{ width: 440, height: 440 }} />
      <div className="absolute rounded-full border border-novixa-white/3" style={{ width: 300, height: 300 }} />

      {/* Inner orbit — product icons */}
      <motion.div className="absolute" style={{ rotate: innerOrbitRotate }}>
        {products.slice(0, 4).map((p, i) => {
          const Icon = p.icon;
          const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
          const radius = 150;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: '50%', top: '50%',
                x, y,
                transform: 'translate(-50%, -50%)',
                opacity: useTransform(progress, [0.48 + i * 0.01, 0.51], [0, 0.7]),
              }}
            >
              <Icon size={16} style={{ color: p.color }} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Text */}
      <motion.div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center z-10"
        style={{ opacity: textOpacity }}
      >
        <p className="text-[10px] font-medium text-novixa-blue tracking-[0.3em] uppercase mb-3">
          Scene 05
        </p>
        <h2
          className="font-bold tracking-tightest text-novixa-white/90"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          One connected universe.
        </h2>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 06 — THE TRANSFORMATION
// ──────────────────────────────────────────────
function Scene06Transformation({ progress }: { progress: MotionValue<number> }) {
  const sceneOpacity = useTransform(progress, [0.55, 0.59, 0.64, 0.66], [0, 1, 1, 0]);
  const textOpacity = useTransform(progress, [0.57, 0.61, 0.64, 0.66], [0, 1, 1, 0]);

  const beforeOpacity = useTransform(progress, [0.57, 0.6, 0.62], [1, 1, 0]);
  const afterOpacity = useTransform(progress, [0.6, 0.63], [0, 1]);
  const transformX = useTransform(progress, [0.57, 0.63], [-100, 0]);
  const afterX = useTransform(progress, [0.6, 0.63], [100, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ opacity: sceneOpacity }}
    >
      <div className="relative flex items-center gap-12">
        {/* Before — plain */}
        <motion.div style={{ opacity: beforeOpacity, x: transformX }}>
          <div
            className="w-48 h-64 rounded-xl flex flex-col items-center justify-center gap-3"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px dashed rgba(255,255,255,0.1)',
            }}
          >
            <div className="w-20 h-20 rounded-lg bg-novixa-white/5 border border-novixa-white/10 flex items-center justify-center">
              <Layers size={28} className="text-novixa-muted/40" strokeWidth={1} />
            </div>
            <p className="text-xs text-novixa-muted/40 font-medium">Ordinary</p>
          </div>
        </motion.div>

        {/* Arrow / transformation indicator */}
        <motion.div
          className="flex flex-col items-center gap-2"
          style={{ opacity: useTransform(progress, [0.58, 0.61, 0.63], [0, 1, 0.5]) }}
        >
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight size={24} className="text-novixa-blue/60" />
          </motion.div>
          <span className="text-[9px] text-novixa-blue/50 tracking-[0.2em] uppercase">Transform</span>
        </motion.div>

        {/* After — premium */}
        <motion.div style={{ opacity: afterOpacity, x: afterX }}>
          <div
            className="w-48 h-64 rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(0,153,255,0.06) 0%, rgba(124,58,237,0.03) 100%)',
              border: '1px solid rgba(0,153,255,0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,153,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: 'radial-gradient(circle at 50% 30%, rgba(0,153,255,0.15) 0%, transparent 60%)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,153,255,0.15) 0%, rgba(124,58,237,0.08) 100%)',
                  border: '1px solid rgba(0,153,255,0.25)',
                }}
              >
                <Sparkles size={28} className="text-novixa-blue" />
              </div>
            </motion.div>
            <p className="text-xs text-novixa-white font-medium relative">Premium</p>
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center z-10"
        style={{ opacity: textOpacity }}
      >
        <p className="text-[10px] font-medium text-novixa-blue tracking-[0.3em] uppercase mb-3">
          Scene 06
        </p>
        <h2
          className="font-bold tracking-tightest text-novixa-white/90"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Ordinary becomes extraordinary.
        </h2>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 07 — THE SHOWCASE
// ──────────────────────────────────────────────
function Scene07Showcase({ progress }: { progress: MotionValue<number> }) {
  const sceneOpacity = useTransform(progress, [0.66, 0.7, 0.76, 0.77], [0, 1, 1, 0]);
  const textOpacity = useTransform(progress, [0.68, 0.72, 0.76, 0.77], [0, 1, 1, 0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const showcaseProducts = products.filter((p) => p.featured).slice(0, 4);

  useEffect(() => {
    const unsub = progress.on('change', (v) => {
      const idx = Math.min(Math.floor(((v - 0.68) / 0.08) * 4), 3);
      setActiveIndex(Math.max(0, idx));
    });
    return () => unsub();
  }, [progress]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ opacity: sceneOpacity }}
    >
      {/* Spotlight */}
      <motion.div
        className="absolute"
        style={{
          width: '40vw', height: '50vh',
          background: 'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(0,153,255,0.06) 0%, transparent 70%)',
          opacity: sceneOpacity,
        }}
      />

      {/* Product showcase — gallery style */}
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {showcaseProducts[activeIndex] && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <ShowcaseItem product={showcaseProducts[activeIndex]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-[18%] flex gap-2 z-10">
        {showcaseProducts.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? 24 : 8,
              background: i === activeIndex ? 'rgba(0,153,255,0.6)' : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center z-10"
        style={{ opacity: textOpacity }}
      >
        <p className="text-[10px] font-medium text-novixa-blue tracking-[0.3em] uppercase mb-3">
          Scene 07
        </p>
        <h2
          className="font-bold tracking-tightest text-novixa-white/90"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Gallery-quality presentation.
        </h2>
      </motion.div>
    </motion.div>
  );
}

function ShowcaseItem({ product }: { product: typeof products[0] }) {
  const Icon = product.icon;
  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="w-56 h-56 rounded-3xl flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${product.color}10 0%, ${product.color}02 100%)`,
          border: `1px solid ${product.color}20`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${product.color}08, inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 30%, ${product.color}12 0%, transparent 60%)` }}
        />
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={64} style={{ color: product.color }} strokeWidth={1.1} />
        </motion.div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-novixa-white tracking-tight">{product.name}</h3>
        <p className="text-xs text-novixa-muted mt-1">{product.creator}</p>
        <div className="flex items-center gap-3 mt-2 justify-center">
          <span className="text-sm font-bold" style={{ color: product.color }}>${product.price}</span>
          <span className="text-2xs text-novixa-muted">{product.downloads.toLocaleString()} downloads</span>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCENE 08 — THE FUTURE
// ──────────────────────────────────────────────
function Scene08Future({ progress }: { progress: MotionValue<number> }) {
  const sceneOpacity = useTransform(progress, [0.77, 0.81, 0.87, 0.88], [0, 1, 1, 0]);
  const textOpacity = useTransform(progress, [0.79, 0.83, 0.87, 0.88], [0, 1, 1, 0]);
  const lightPulse = useTransform(progress, [0.79, 0.85], [0, 1]);
  const cameraZoom = useTransform(progress, [0.77, 0.87], [1, 1.15]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (Math.random() - 0.5) * 800,
    y: (Math.random() - 0.5) * 500,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 3,
    color: ['#0099FF', '#22D3EE', '#A259FF'][i % 3],
  }));

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ opacity: sceneOpacity, scale: cameraZoom }}
    >
      {/* Deep ambient light */}
      <motion.div
        className="absolute"
        style={{
          width: '60vw', height: '60vw', maxWidth: 800, maxHeight: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,153,255,0.05) 0%, rgba(124,58,237,0.02) 40%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: lightPulse,
        }}
      />

      {/* Floating particles — very subtle */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            left: '50%', top: '50%',
            x: p.x, y: p.y,
            opacity: useTransform(progress, [0.79, 0.83, 0.87, 0.88], [0, 0.4, 0.4, 0]),
          }}
          animate={{ y: [p.y, p.y - 30, p.y], x: [p.x, p.x + 10, p.x] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* Center content — expanding ecosystem */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          className="flex items-center gap-4 mb-8"
          style={{ opacity: useTransform(progress, [0.8, 0.84], [0, 1]) }}
        >
          {categories.slice(0, 6).map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `${cat.color}08`,
                  border: `1px solid ${cat.color}15`,
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              >
                <Icon size={18} style={{ color: cat.color }} strokeWidth={1.3} />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.h2
          className="font-bold tracking-tightest text-novixa-white text-center"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            opacity: textOpacity,
          }}
        >
          The future of digital
          <br />
          <span className="text-novixa-blue">creation</span>
        </motion.h2>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 09 — THE SIGNATURE
// ──────────────────────────────────────────────
function Scene09Signature({ progress }: { progress: MotionValue<number> }) {
  const { navigate } = useApp();
  const sceneOpacity = useTransform(progress, [0.88, 0.92], [0, 1]);
  const headlineOpacity = useTransform(progress, [0.9, 0.94], [0, 1]);
  const headlineY = useTransform(progress, [0.9, 0.94], [40, 0]);
  const subOpacity = useTransform(progress, [0.93, 0.96], [0, 1]);
  const ctaOpacity = useTransform(progress, [0.95, 0.98], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity: sceneOpacity }}
    >
      {/* Very soft ambient light */}
      <div
        className="absolute"
        style={{
          width: '50vw', height: '50vw', maxWidth: 700, maxHeight: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,153,255,0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2.5 mb-16"
          style={{ opacity: headlineOpacity, y: headlineY }}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-novixa-blue to-novixa-blue-soft" />
            <div className="absolute inset-[2px] rounded-[7px] bg-[#050505] flex items-center justify-center">
              <Sparkles size={16} className="text-novixa-blue" />
            </div>
          </div>
          <span className="text-base font-bold tracking-tightest text-novixa-white">NOVIXA</span>
        </motion.div>

        {/* Huge signature statement */}
        <motion.h2
          className="font-bold tracking-tightest leading-[1.05] text-novixa-white text-center"
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            opacity: headlineOpacity,
            y: headlineY,
          }}
        >
          Where digital
          <br />
          products are
          <br />
          <span className="text-novixa-blue">born</span>
        </motion.h2>

        {/* Subtitle — calm, confident */}
        <motion.p
          className="mt-10 text-base md:text-lg text-novixa-muted font-light tracking-wide max-w-md"
          style={{ opacity: subOpacity }}
        >
          Not a marketplace. A living digital studio.
        </motion.p>

        {/* CTA — elegant, never aggressive */}
        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: ctaOpacity }}
        >
          <button
            onClick={() => navigate('/products')}
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-novixa-blue text-white text-sm font-medium transition-all duration-700 hover:shadow-[0_0_40px_rgba(0,153,255,0.3)]"
          >
            Explore Products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-novixa-white/70 hover:text-novixa-white transition-colors duration-700"
          >
            <Sparkles size={14} className="text-novixa-blue" />
            Become a Creator
          </button>
        </motion.div>

        {/* Stats — minimal, elegant */}
        <motion.div
          className="mt-20 flex flex-wrap items-center justify-center gap-12"
          style={{ opacity: ctaOpacity }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-bold tracking-tightest" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-novixa-muted mt-1 uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Trusted by */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
          style={{ opacity: ctaOpacity }}
        >
          <span className="text-[10px] text-novixa-muted/40 tracking-[0.2em] uppercase">Trusted by</span>
          {clientLogos.slice(0, 5).map((logo) => (
            <span key={logo} className="text-sm font-bold text-novixa-muted/40 tracking-tightest">{logo}</span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// HELPER: blur filter hook
// ──────────────────────────────────────────────
function useBlurFilter(blurValue: MotionValue<number>) {
  const [filter, setFilter] = useState('blur(12px)');
  useEffect(() => {
    const unsub = blurValue.on('change', (v) => {
      setFilter(`blur(${v}px)`);
    });
    return () => unsub();
  }, [blurValue]);
  return filter;
}
