import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  ShoppingBag,
  BarChart3,
  Palette,
  Code2,
  Brain,
  Globe,
  PenTool,
  Layers,
  Zap,
  Shield,
  Figma,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { products, categories } from '@/data/store';

const EASE = [0.22, 1, 0.36, 1] as const;
const SLOW = [0.16, 1, 0.3, 1] as const;

// Scene timing — 9 segments across the full scroll
// Each scene gets ~11% of scroll progress
const S = {
  void:       [0.00, 0.11],
  wireframe:  [0.11, 0.22],
  interface:  [0.22, 0.33],
  explode:    [0.33, 0.44],
  assemble:   [0.44, 0.55],
  ecosystem:  [0.55, 0.66],
  gallery:    [0.66, 0.77],
  store:      [0.77, 0.88],
  final:      [0.88, 1.00],
};

// ──────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────
export function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    mass: 1,
  });

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '1000vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#040404]">
        <Scene01Void p={p} />
        <Scene02Wireframe p={p} />
        <Scene03Interface p={p} />
        <Scene04Explosion p={p} />
        <Scene05Assembly p={p} />
        <Scene06Ecosystem p={p} />
        <Scene07Gallery p={p} />
        <Scene08Store p={p} />
        <Scene09Final p={p} />
        <ScrollProgress p={p} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCROLL PROGRESS
// ──────────────────────────────────────────────
function ScrollProgress({ p }: { p: MotionValue<number> }) {
  const width = useTransform(p, [0, 1], ['0%', '100%']);
  const [label, setLabel] = useState('Nothing');

  useEffect(() => {
    const labels: [number, string][] = [
      [0.0, 'Nothing'],
      [0.11, 'Wireframe'],
      [0.22, 'Interface'],
      [0.33, 'Explosion'],
      [0.44, 'Assembly'],
      [0.55, 'Ecosystem'],
      [0.66, 'Gallery'],
      [0.77, 'Store'],
      [0.88, 'Reality'],
    ];
    const unsub = p.on('change', (v) => {
      const found = [...labels].reverse().find(([t]) => v >= t);
      if (found) setLabel(found[1]);
    });
    return () => unsub();
  }, [p]);

  return (
    <div className="absolute bottom-0 inset-x-0 z-[100] pointer-events-none">
      <div className="flex items-center gap-3 px-6 pb-5">
        <span className="text-[9px] font-medium text-white/25 tracking-[0.25em] uppercase min-w-[80px]">
          {label}
        </span>
        <div className="flex-1 h-px bg-white/8 relative overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-novixa-blue" style={{ width }} />
        </div>
        <span className="text-[9px] font-medium text-white/25 tracking-[0.25em] uppercase">
          Novixa
        </span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCENE 01 — THE VOID: darkness → line draws grid
// ──────────────────────────────────────────────
function Scene01Void({ p }: { p: MotionValue<number> }) {
  const [a, b] = S.void;
  const sceneOpacity = useTransform(p, [a, b - 0.01, b], [1, 1, 0]);

  // The single white line
  const lineGrow = useTransform(p, [a, a + 0.04], [0, 1]);
  const lineOpacity = useTransform(p, [a, a + 0.01, b - 0.02, b], [0, 1, 1, 0]);

  // Grid draws after the line
  const gridOpacity = useTransform(p, [a + 0.03, a + 0.08], [0, 1]);
  const gridScale = useTransform(p, [a + 0.03, a + 0.08], [1.15, 1]);

  // Perspective lines
  const perspDraw = useTransform(p, [a + 0.05, a + 0.09], [0, 1]);

  // Measurement marks
  const marksOpacity = useTransform(p, [a + 0.07, a + 0.1], [0, 1]);

  // Text
  const textOpacity = useTransform(p, [a + 0.06, a + 0.09, b - 0.02, b], [0, 1, 1, 0]);
  const textY = useTransform(p, [a + 0.06, a + 0.09], [30, 0]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: sceneOpacity }}>
      {/* Single white line — horizontal, center */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-px bg-white/40"
        style={{
          width: useTransform(lineGrow, [0, 1], ['0%', '60vw']),
          x: '-50%',
          y: '-50%',
          opacity: lineOpacity,
        }}
      />

      {/* Precision grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          scale: gridScale,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 85%)',
        }}
      />

      {/* Perspective / construction lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <motion.line x1="15%" y1="85%" x2="85%" y2="15%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" style={{ pathLength: perspDraw }} />
        <motion.line x1="85%" y1="85%" x2="15%" y2="15%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" style={{ pathLength: perspDraw }} />
        <motion.line x1="50%" y1="5%" x2="50%" y2="95%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 6" style={{ pathLength: perspDraw }} />
      </svg>

      {/* Measurement marks — tiny ticks on the horizontal line */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: marksOpacity }}>
        <div className="relative" style={{ width: '60vw' }}>
          {[10, 25, 40, 50, 60, 75, 90].map((pct) => (
            <div key={pct} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${pct}%` }}>
              <div className="w-px h-3 bg-white/20" />
              <span className="text-[7px] text-white/15 mt-1 font-mono">{pct}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Text */}
      <motion.div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center z-10" style={{ opacity: textOpacity, y: textY }}>
        <h2 className="font-bold tracking-tightest text-white/80" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
          From nothing
        </h2>
        <p className="mt-2 text-xs text-white/30 font-light tracking-[0.15em] uppercase">
          Design mathematics, made visible
        </p>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 02 — WIREFRAME: grid becomes wireframes
// ──────────────────────────────────────────────
function Scene02Wireframe({ p }: { p: MotionValue<number> }) {
  const [a, b] = S.wireframe;
  const sceneOpacity = useTransform(p, [a, a + 0.02, b - 0.02, b], [0, 1, 1, 0]);

  // Wireframe boxes appear
  const boxes = [
    { x: -180, y: -100, w: 200, h: 120, delay: 0 },
    { x: 60, y: -110, w: 140, h: 80, delay: 0.02 },
    { x: -200, y: 40, w: 120, h: 100, delay: 0.04 },
    { x: 80, y: 30, w: 180, h: 110, delay: 0.06 },
    { x: -60, y: -30, w: 100, h: 60, delay: 0.08 },
  ];

  const textOpacity = useTransform(p, [a + 0.04, a + 0.08, b - 0.02, b], [0, 1, 1, 0]);
  const textY = useTransform(p, [a + 0.04, a + 0.08], [30, 0]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ opacity: sceneOpacity }}>
      {/* Faint grid still visible */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 85%)',
        }}
      />

      {/* Wireframe boxes */}
      {boxes.map((box, i) => {
        const boxOpacity = useTransform(p, [a + box.delay, a + box.delay + 0.03], [0, 1]);
        const boxScale = useTransform(p, [a + box.delay, a + box.delay + 0.03], [0.85, 1]);
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: '50%', top: '50%',
              x: box.x, y: box.y,
              width: box.w, height: box.h,
              opacity: boxOpacity,
              scale: boxScale,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-full h-full rounded-lg border border-dashed border-white/15 relative">
              {/* Internal wireframe elements */}
              <div className="absolute top-2 left-2 right-2 h-2.5 rounded-sm border border-white/10" />
              <div className="absolute top-8 left-2 w-1/3 h-1.5 rounded-sm border border-white/8" />
              <div className="absolute top-8 right-2 w-1/4 h-1.5 rounded-sm border border-white/8" />
              <div className="absolute bottom-2 left-2 right-2 h-5 rounded-sm border border-white/10" />
              {box.h > 90 && <div className="absolute top-14 left-2 right-2 bottom-10 rounded-sm border border-white/6" />}
            </div>
          </motion.div>
        );
      })}

      {/* Text */}
      <motion.div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center z-10" style={{ opacity: textOpacity, y: textY }}>
        <h2 className="font-bold tracking-tightest text-white/70" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
          Structure emerges
        </h2>
        <p className="mt-2 text-xs text-white/25 font-light tracking-[0.15em] uppercase">
          Boxes, layouts, spacing, components
        </p>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 03 — INTERFACE: wireframe becomes premium
// ──────────────────────────────────────────────
function Scene03Interface({ p }: { p: MotionValue<number> }) {
  const [a, b] = S.interface;
  const sceneOpacity = useTransform(p, [a, a + 0.02, b - 0.02, b], [0, 1, 1, 0]);

  // Wireframe fades, real interface fades in
  const wireOpacity = useTransform(p, [a, a + 0.04], [1, 0]);
  const realOpacity = useTransform(p, [a + 0.02, a + 0.06], [0, 1]);

  // Color seeps in
  const colorOpacity = useTransform(p, [a + 0.04, a + 0.08], [0, 1]);

  // Micro-interaction pulse
  const pulseScale = useTransform(p, [a + 0.06, a + 0.09], [0.95, 1]);

  const textOpacity = useTransform(p, [a + 0.05, a + 0.09, b - 0.02, b], [0, 1, 1, 0]);
  const textY = useTransform(p, [a + 0.05, a + 0.09], [30, 0]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ opacity: sceneOpacity }}>
      {/* Main interface card */}
      <div className="relative" style={{ width: 360, height: 240 }}>
        {/* Wireframe version */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-dashed border-white/15"
          style={{ opacity: wireOpacity }}
        >
          <div className="absolute top-3 left-3 right-3 h-4 rounded-sm border border-white/10" />
          <div className="absolute top-12 left-3 w-1/3 h-2 rounded-sm border border-white/8" />
          <div className="absolute top-12 right-3 w-1/4 h-2 rounded-sm border border-white/8" />
          <div className="absolute bottom-3 left-3 right-3 h-8 rounded-sm border border-white/10" />
        </motion.div>

        {/* Real interface */}
        <motion.div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            opacity: realOpacity,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Nav bar */}
          <div className="absolute top-0 inset-x-0 h-10 flex items-center justify-between px-4 border-b border-white/8">
            <div className="flex items-center gap-1.5">
              <motion.div className="w-4 h-4 rounded bg-novixa-blue/30" style={{ opacity: colorOpacity }} />
              <div className="w-12 h-1.5 rounded-full bg-white/15" />
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-1.5 rounded-full bg-white/10" />
              <div className="w-6 h-1.5 rounded-full bg-white/10" />
              <div className="w-6 h-1.5 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Content area */}
          <div className="absolute top-12 inset-x-0 bottom-0 p-4 flex gap-3">
            {/* Left column */}
            <div className="flex-1 flex flex-col gap-2">
              <motion.div
                className="h-2 w-2/3 rounded-full bg-white/20"
                style={{ scale: pulseScale }}
              />
              <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
              <div className="h-1.5 w-2/5 rounded-full bg-white/10" />
              <motion.div className="flex-1 mt-1 rounded-lg" style={{ background: `linear-gradient(135deg, rgba(0,153,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`, opacity: colorOpacity, border: '1px solid rgba(0,153,255,0.1)' }} />
            </div>
            {/* Right column */}
            <div className="w-24 flex flex-col gap-2">
              <motion.div
                className="h-8 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, rgba(0,153,255,0.15) 0%, rgba(0,153,255,0.05) 100%)`,
                  opacity: colorOpacity,
                  border: '1px solid rgba(0,153,255,0.15)',
                }}
              />
              <div className="h-8 rounded-lg bg-white/8" />
              <div className="h-8 rounded-lg bg-white/6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <motion.div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center z-10" style={{ opacity: textOpacity, y: textY }}>
        <h2 className="font-bold tracking-tightest text-white/80" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
          The design breathes
        </h2>
        <p className="mt-2 text-xs text-white/25 font-light tracking-[0.15em] uppercase">
          Typography, color, micro-interactions
        </p>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 04 — EXPLOSION: phone wraps interface, explodes
// ──────────────────────────────────────────────
function Scene04Explosion({ p }: { p: MotionValue<number> }) {
  const [a, b] = S.explode;
  const sceneOpacity = useTransform(p, [a, a + 0.02, b - 0.02, b], [0, 1, 1, 0]);

  // Phase 1: phone appears (0.33-0.37)
  const phoneScale = useTransform(p, [a, a + 0.04], [0, 1]);
  const phoneOpacity = useTransform(p, [a, a + 0.02], [0, 1]);
  const phoneRotate = useTransform(p, [a, a + 0.08], [-8, 0]);

  // Phase 2: phone rotates slowly (0.37-0.40)
  const phoneOrbit = useTransform(p, [a + 0.04, a + 0.07], [0, 15]);

  // Phase 3: explosion (0.40-0.44)
  const explodeProgress = useTransform(p, [a + 0.07, a + 0.1], [0, 1]);
  const phoneExplodeScale = useTransform(p, [a + 0.07, a + 0.1], [1, 1.3]);
  const phoneExplodeOpacity = useTransform(p, [a + 0.07, a + 0.09, a + 0.1], [1, 0.8, 0]);

  // Components flying out
  const components: { icon: LucideIcon; label: string; color: string; angle: number; distance: number; delay: number }[] = [
    { icon: PenTool, label: 'Button', color: '#0099FF', angle: 0, distance: 200, delay: 0 },
    { icon: Layers, label: 'Card', color: '#22D3EE', angle: 45, distance: 180, delay: 0.005 },
    { icon: Zap, label: 'Icon', color: '#10B981', angle: 90, distance: 220, delay: 0.01 },
    { icon: BarChart3, label: 'Chart', color: '#0099FF', angle: 135, distance: 190, delay: 0.015 },
    { icon: Code2, label: 'Input', color: '#22D3EE', angle: 180, distance: 210, delay: 0.02 },
    { icon: Shield, label: 'Badge', color: '#10B981', angle: 225, distance: 170, delay: 0.025 },
    { icon: ShoppingBag, label: 'Cart', color: '#0099FF', angle: 270, distance: 200, delay: 0.03 },
    { icon: Brain, label: 'Nav', color: '#22D3EE', angle: 315, distance: 180, delay: 0.035 },
  ];

  const textOpacity = useTransform(p, [a + 0.03, a + 0.06, b - 0.02, b], [0, 1, 1, 0]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ opacity: sceneOpacity }}>
      {/* Soft area light from above */}
      <div
        className="absolute"
        style={{
          width: '40vw', height: '50vh', top: '10%', left: '50%', transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Phone — pre-explosion */}
      <motion.div
        className="absolute z-20"
        style={{
          scale: phoneScale,
          opacity: phoneExplodeOpacity,
          rotateY: phoneOrbit,
          rotate: phoneRotate,
          transformStyle: 'preserve-3d',
        }}
      >
        <PhoneMockup />
      </motion.div>

      {/* Exploded phone — scaling out */}
      <motion.div
        className="absolute z-10"
        style={{
          scale: phoneExplodeScale,
          opacity: phoneExplodeOpacity,
        }}
      >
        <PhoneMockup wireframe />
      </motion.div>

      {/* UI Components flying outward */}
      {components.map((c, i) => {
        const Icon = c.icon;
        const compOpacity = useTransform(p, [a + 0.07 + c.delay, a + 0.08 + c.delay, b - 0.02, b], [0, 1, 1, 0]);
        const rad = (c.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * c.distance;
        const ty = Math.sin(rad) * c.distance;
        const compX = useTransform(explodeProgress, [0, 1], [0, tx]);
        const compY = useTransform(explodeProgress, [0, 1], [0, ty]);
        const compScale = useTransform(explodeProgress, [0, 0.3, 1], [0, 1, 0.8]);
        const compRotate = useTransform(explodeProgress, [0, 1], [0, c.angle * 0.3]);

        return (
          <motion.div
            key={i}
            className="absolute z-15"
            style={{
              left: '50%', top: '50%',
              x: compX, y: compY,
              opacity: compOpacity,
              scale: compScale,
              rotate: compRotate,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            >
              <div
                className="w-16 h-16 rounded-xl flex flex-col items-center justify-center gap-1"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}
              >
                <Icon size={16} style={{ color: c.color }} strokeWidth={1.4} />
                <span className="text-[7px] text-white/30 font-medium">{c.label}</span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Text */}
      <motion.div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center z-30" style={{ opacity: textOpacity }}>
        <h2 className="font-bold tracking-tightest text-white/80" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
          Components released
        </h2>
        <p className="mt-2 text-xs text-white/25 font-light tracking-[0.15em] uppercase">
          Buttons, cards, icons, navigation — floating in space
        </p>
      </motion.div>
    </motion.div>
  );
}

function PhoneMockup({ wireframe = false }: { wireframe?: boolean }) {
  return (
    <div
      className="relative"
      style={{
        width: 140,
        height: 280,
        borderRadius: 24,
        background: wireframe
          ? 'transparent'
          : 'linear-gradient(145deg, #1a1a1f 0%, #0d0d11 100%)',
        border: wireframe
          ? '1px dashed rgba(255,255,255,0.15)'
          : '1px solid rgba(255,255,255,0.12)',
        boxShadow: wireframe
          ? 'none'
          : '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {/* Notch */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 50, height: 5,
          background: wireframe ? 'transparent' : '#000',
          border: wireframe ? '1px dashed rgba(255,255,255,0.1)' : 'none',
        }}
      />
      {/* Screen content */}
      <div className="absolute inset-x-2 top-10 bottom-8 rounded-xl overflow-hidden">
        {wireframe ? (
          <>
            <div className="absolute top-2 left-2 right-2 h-3 rounded-sm border border-white/10" />
            <div className="absolute top-8 left-2 w-2/3 h-1.5 rounded-sm border border-white/8" />
            <div className="absolute top-14 left-2 right-2 h-10 rounded border border-white/8" />
            <div className="absolute bottom-2 left-2 right-2 h-6 rounded border border-white/10" />
          </>
        ) : (
          <>
            {/* Status bar */}
            <div className="absolute top-0 inset-x-0 h-4 flex items-center justify-between px-2">
              <div className="w-6 h-1 rounded-full bg-white/20" />
              <div className="w-3 h-1 rounded-full bg-white/15" />
            </div>
            {/* App content */}
            <div className="absolute top-5 inset-x-0 bottom-0 p-2 flex flex-col gap-1.5">
              <div className="h-2 w-2/3 rounded-full bg-white/20" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
              <div className="flex-1 mt-1 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(0,153,255,0.12) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(0,153,255,0.1)' }} />
              <div className="flex gap-1.5 mt-1">
                <div className="flex-1 h-8 rounded-lg bg-white/8" />
                <div className="flex-1 h-8 rounded-lg" style={{ background: 'rgba(0,153,255,0.1)', border: '1px solid rgba(0,153,255,0.12)' }} />
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/8" />
              <div className="h-1.5 w-3/4 rounded-full bg-white/6" />
            </div>
          </>
        )}
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full" style={{ background: wireframe ? 'transparent' : 'rgba(255,255,255,0.2)', border: wireframe ? '1px dashed rgba(255,255,255,0.1)' : 'none' }} />
    </div>
  );
}

// ──────────────────────────────────────────────
// SCENE 05 — ASSEMBLY: components morph into store
// ──────────────────────────────────────────────
function Scene05Assembly({ p }: { p: MotionValue<number> }) {
  const [a, b] = S.assemble;
  const sceneOpacity = useTransform(p, [a, a + 0.02, b - 0.02, b], [0, 1, 1, 0]);

  // Components fly inward
  const flyIn = useTransform(p, [a, a + 0.04], [1, 0]);

  // Store grid assembles
  const storeOpacity = useTransform(p, [a + 0.02, a + 0.06], [0, 1]);
  const storeScale = useTransform(p, [a + 0.02, a + 0.06], [0.9, 1]);

  // Store items pop in sequentially
  const items = products.slice(0, 6);
  const textOpacity = useTransform(p, [a + 0.04, a + 0.08, b - 0.02, b], [0, 1, 1, 0]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ opacity: sceneOpacity }}>
      {/* Incoming component fragments — flying to center */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const dist = 250;
        const x = Math.cos(rad) * dist;
        const y = Math.sin(rad) * dist;
        const fragX = useTransform(flyIn, [0, 1], [0, x]);
        const fragY = useTransform(flyIn, [0, 1], [0, y]);
        const fragOpacity = useTransform(flyIn, [0, 0.7, 1], [0.6, 0.3, 0]);
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-sm bg-white/15"
            style={{
              left: '50%', top: '50%',
              x: fragX, y: fragY,
              opacity: fragOpacity,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}

      {/* Assembled store grid */}
      <motion.div
        className="relative z-10"
        style={{
          opacity: storeOpacity,
          scale: storeScale,
        }}
      >
        <div className="grid grid-cols-3 gap-3" style={{ width: 'min(480px, 80vw)' }}>
          {items.map((product, i) => {
            const Icon = product.icon;
            const itemDelay = i * 0.008;
            const itemOpacity = useTransform(p, [a + 0.03 + itemDelay, a + 0.05 + itemDelay], [0, 1]);
            const itemScale = useTransform(p, [a + 0.03 + itemDelay, a + 0.05 + itemDelay], [0.7, 1]);
            return (
              <motion.div
                key={product.id}
                style={{ opacity: itemOpacity, scale: itemScale }}
              >
                <div
                  className="aspect-square rounded-xl flex flex-col items-center justify-center gap-1.5 p-2"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <Icon size={20} style={{ color: product.color }} strokeWidth={1.3} />
                  <span className="text-[7px] text-white/40 font-medium text-center leading-tight">{product.name}</span>
                  <span className="text-[7px] font-bold" style={{ color: product.color }}>${product.price}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Text */}
      <motion.div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center z-20" style={{ opacity: textOpacity }}>
        <h2 className="font-bold tracking-tightest text-white/80" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
          The store assembles
        </h2>
        <p className="mt-2 text-xs text-white/25 font-light tracking-[0.15em] uppercase">
          Components morph into products — not fade, physically reorganize
        </p>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 06 — ECOSYSTEM: store transforms into universe
// ──────────────────────────────────────────────
function Scene06Ecosystem({ p }: { p: MotionValue<number> }) {
  const [a, b] = S.ecosystem;
  const sceneOpacity = useTransform(p, [a, a + 0.02, b - 0.02, b], [0, 1, 1, 0]);

  // Store grid fades
  const storeFade = useTransform(p, [a, a + 0.03], [1, 0]);

  // Ecosystem nodes appear
  const orbitRotate = useTransform(p, [a + 0.02, b], [0, 90]);
  const innerOrbit = useTransform(p, [a + 0.02, b], [0, -60]);

  const ecosystemItems = [
    { icon: BarChart3, label: 'Analytics', color: '#10B981' },
    { icon: PenTool, label: 'Dashboard', color: '#0099FF' },
    { icon: Zap, label: 'Marketing', color: '#22D3EE' },
    { icon: Brain, label: 'Automation', color: '#7C3AED' },
    { icon: Sparkles, label: 'Brand', color: '#A259FF' },
    { icon: Palette, label: 'Canva', color: '#00C7CC' },
    { icon: Figma, label: 'Figma', color: '#A259FF' },
    { icon: Globe, label: 'Websites', color: '#10B981' },
    { icon: Smartphone, label: 'Apps', color: '#0099FF' },
    { icon: Code2, label: 'Code', color: '#22D3EE' },
    { icon: Layers, label: 'Design', color: '#A259FF' },
    { icon: Brain, label: 'AI', color: '#7C3AED' },
  ];

  const textOpacity = useTransform(p, [a + 0.04, a + 0.08, b - 0.02, b], [0, 1, 1, 0]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ opacity: sceneOpacity }}>
      {/* Center hub */}
      <motion.div
        className="absolute z-10"
        style={{ scale: useTransform(p, [a + 0.02, a + 0.05], [0, 1]) }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,153,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(0,153,255,0.12)',
            boxShadow: '0 0 50px rgba(0,153,255,0.06)',
          }}
        >
          <Sparkles size={24} className="text-novixa-blue" />
        </div>
      </motion.div>

      {/* Outer orbit */}
      <motion.div className="absolute" style={{ rotate: orbitRotate }}>
        {ecosystemItems.slice(0, 6).map((item, i) => {
          const Icon = item.icon;
          const angle = (i / 6) * Math.PI * 2;
          const r = 200;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          const itemOpacity = useTransform(p, [a + 0.03 + i * 0.008, a + 0.06], [0, 1]);
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%', top: '50%',
                x, y,
                opacity: itemOpacity,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: `${item.color}10`, border: `1px solid ${item.color}18` }}
                >
                  <Icon size={18} style={{ color: item.color }} strokeWidth={1.3} />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Inner orbit */}
      <motion.div className="absolute" style={{ rotate: innerOrbit }}>
        {ecosystemItems.slice(6).map((item, i) => {
          const Icon = item.icon;
          const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
          const r = 120;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%', top: '50%',
                x, y,
                opacity: useTransform(p, [a + 0.05 + i * 0.008, a + 0.08], [0, 0.7]),
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Icon size={14} style={{ color: item.color }} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Orbit rings */}
      <div className="absolute rounded-full border border-white/5" style={{ width: 400, height: 400 }} />
      <div className="absolute rounded-full border border-white/3" style={{ width: 240, height: 240 }} />

      {/* Text */}
      <motion.div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center z-20" style={{ opacity: textOpacity }}>
        <h2 className="font-bold tracking-tightest text-white/80" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
          One design system, infinite forms
        </h2>
        <p className="mt-2 text-xs text-white/25 font-light tracking-[0.15em] uppercase">
          Analytics, marketing, Figma, Canva, websites, apps, AI — all from the same source
        </p>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 07 — GALLERY: products as art installations
// ──────────────────────────────────────────────
function Scene07Gallery({ p }: { p: MotionValue<number> }) {
  const [a, b] = S.gallery;
  const sceneOpacity = useTransform(p, [a, a + 0.02, b - 0.02, b], [0, 1, 1, 0]);
  const [activeIdx, setActiveIdx] = useState(0);
  const galleryProducts = products.filter((pr) => pr.featured).slice(0, 4);

  useEffect(() => {
    const unsub = p.on('change', (v) => {
      const t = (v - a - 0.02) / (b - a - 0.04);
      const idx = Math.max(0, Math.min(galleryProducts.length - 1, Math.floor(t * galleryProducts.length)));
      setActiveIdx(idx);
    });
    return () => unsub();
  }, [p, a, b]);

  const textOpacity = useTransform(p, [a + 0.03, a + 0.06, b - 0.02, b], [0, 1, 1, 0]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ opacity: sceneOpacity }}>
      {/* Spotlight per product */}
      <div
        className="absolute"
        style={{
          width: '35vw', height: '45vh',
          background: 'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 70%)',
        }}
      />

      {/* Gallery product — one at a time */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {galleryProducts[activeIdx] && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -30 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <GalleryInstallation product={galleryProducts[activeIdx]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gallery progress */}
      <div className="absolute bottom-[20%] flex gap-2 z-10">
        {galleryProducts.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-700"
            style={{
              width: i === activeIdx ? 28 : 8,
              background: i === activeIdx ? 'rgba(0,153,255,0.5)' : 'rgba(255,255,255,0.12)',
            }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center z-20" style={{ opacity: textOpacity }}>
        <h2 className="font-bold tracking-tightest text-white/80" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
          Every product, an installation
        </h2>
        <p className="mt-2 text-xs text-white/25 font-light tracking-[0.15em] uppercase">
          No cards. No grids. Each product earns its own environment.
        </p>
      </motion.div>
    </motion.div>
  );
}

function GalleryInstallation({ product }: { product: typeof products[0] }) {
  const Icon = product.icon;
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <div
      className="flex flex-col items-center gap-6"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
    >
      <motion.div
        className="relative"
        animate={{ rotateY: mouse.x, rotateX: -mouse.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="w-52 h-52 rounded-3xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${product.color}12 0%, ${product.color}02 100%)`,
            border: `1px solid ${product.color}20`,
            boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 80px ${product.color}06, inset 0 1px 0 rgba(255,255,255,0.06)`,
          }}
        >
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 30%, ${product.color}15 0%, transparent 60%)` }} />
          <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <Icon size={56} style={{ color: product.color }} strokeWidth={1.1} />
          </motion.div>
        </div>
      </motion.div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white tracking-tight">{product.name}</h3>
        <p className="text-xs text-white/40 mt-0.5">{product.creator}</p>
        <p className="text-xs text-white/30 mt-2 max-w-xs font-light leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// SCENE 08 — STORE: gallery becomes actual store
// ──────────────────────────────────────────────
function Scene08Store({ p }: { p: MotionValue<number> }) {
  const [a, b] = S.store;
  const sceneOpacity = useTransform(p, [a, a + 0.02, b - 0.02, b], [0, 1, 1, 0]);

  // Gallery dissolves, store appears
  const galleryFade = useTransform(p, [a, a + 0.03], [1, 0]);
  const storeAppear = useTransform(p, [a + 0.02, a + 0.06], [0, 1]);
  const storeY = useTransform(p, [a + 0.02, a + 0.06], [40, 0]);

  const textOpacity = useTransform(p, [a + 0.04, a + 0.08, b - 0.02, b], [0, 1, 1, 0]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ opacity: sceneOpacity }}>
      {/* Store interface — minimal, real */}
      <motion.div
        className="relative z-10 w-full max-w-3xl px-6"
        style={{ opacity: storeAppear, y: storeY }}
      >
        {/* Store header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-novixa-blue to-novixa-blue-soft flex items-center justify-center">
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="text-sm font-bold tracking-tightest text-white">Novixa Store</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-white/8" />
            <div className="w-5 h-5 rounded-full bg-white/8" />
            <div className="w-5 h-5 rounded-full" style={{ background: 'rgba(0,153,255,0.15)', border: '1px solid rgba(0,153,255,0.2)' }} />
          </div>
        </div>

        {/* Product grid — real store */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {products.slice(0, 6).map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, ease: EASE }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-4 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                  style={{ background: `${product.color}12`, border: `1px solid ${product.color}18` }}
                >
                  <Icon size={18} style={{ color: product.color }} strokeWidth={1.3} />
                </div>
                <p className="text-xs font-semibold text-white mb-0.5">{product.name}</p>
                <p className="text-[10px] text-white/40 mb-2">{product.creator}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: product.color }}>${product.price}</span>
                  <span className="text-[9px] text-white/30">{product.downloads > 999 ? `${(product.downloads / 1000).toFixed(1)}k` : product.downloads} dl</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Text */}
      <motion.div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center z-20" style={{ opacity: textOpacity }}>
        <h2 className="font-bold tracking-tightest text-white/80" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
          You are already inside
        </h2>
        <p className="mt-2 text-xs text-white/25 font-light tracking-[0.15em] uppercase">
          The gallery was always the store. Buying is the final chapter.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// SCENE 09 — FINAL: everything dissolves → statement
// ──────────────────────────────────────────────
function Scene09Final({ p }: { p: MotionValue<number> }) {
  const { navigate } = useApp();
  const [a, b] = S.final;
  const sceneOpacity = useTransform(p, [a, a + 0.02], [0, 1]);

  const headlineOpacity = useTransform(p, [a + 0.01, a + 0.05], [0, 1]);
  const headlineY = useTransform(p, [a + 0.01, a + 0.05], [40, 0]);
  const subOpacity = useTransform(p, [a + 0.04, a + 0.07], [0, 1]);
  const ctaOpacity = useTransform(p, [a + 0.06, a + 0.09], [0, 1]);
  const ctaScale = useTransform(p, [a + 0.06, a + 0.09], [0.9, 1]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: sceneOpacity }}>
      {/* Very faint light */}
      <div
        className="absolute"
        style={{
          width: '40vw', height: '40vw', maxWidth: 600, maxHeight: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo */}
        <motion.div className="flex items-center gap-2.5 mb-16" style={{ opacity: headlineOpacity, y: headlineY }}>
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-novixa-blue to-novixa-blue-soft" />
            <div className="absolute inset-[1.5px] rounded-[7px] bg-[#040404] flex items-center justify-center">
              <Sparkles size={14} className="text-novixa-blue" />
            </div>
          </div>
          <span className="text-sm font-bold tracking-tightest text-white">NOVIXA</span>
        </motion.div>

        {/* The statement */}
        <motion.h2
          className="font-bold tracking-tightest leading-[1.05] text-white text-center"
          style={{
            fontSize: 'clamp(2.5rem, 9vw, 7rem)',
            opacity: headlineOpacity,
            y: headlineY,
          }}
        >
          From Ideas
          <br />
          to Digital
          <br />
          <span className="text-novixa-blue">Reality</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p className="mt-10 text-sm md:text-base text-white/40 font-light tracking-wide max-w-sm" style={{ opacity: subOpacity }}>
          Not a marketplace. A living digital studio where products are born.
        </motion.p>

        {/* CTA */}
        <motion.div className="mt-14" style={{ opacity: ctaOpacity, scale: ctaScale }}>
          <button
            onClick={() => navigate('/products')}
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-novixa-blue text-white text-sm font-medium transition-all duration-700 hover:shadow-[0_0_40px_rgba(0,153,255,0.25)]"
          >
            Explore the Collection
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
