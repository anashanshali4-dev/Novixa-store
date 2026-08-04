import { motion, useTransform, AnimatePresence } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Figma, ScanLine, CheckCircle2, ShoppingBag, Download, Eye, Package } from 'lucide-react';

interface ProductTransformationProps {
  scrollProgress: MotionValue<number>;
}

// Phases — the product transforms through 6 stages:
// 0.00-0.08: Title
// 0.08-0.18: Stage 1 — Flat icon (simple file)
// 0.18-0.28: Stage 2 — Scanned + verified → Premium card
// 0.28-0.42: Stage 3 — Interactive preview (UI mockup expands)
// 0.42-0.58: Stage 4 — Marketplace listing (price, rating appear)
// 0.58-0.72: Stage 5 — Purchased (purchase flash, badge)
// 0.72-0.90: Stage 6 — Downloaded (progress, success, in downloads)
// 0.90-1.00: Fade out

export function ProductTransformation({ scrollProgress }: ProductTransformationProps) {
  const titleOpacity = useTransform(scrollProgress, [0, 0.06, 0.12, 0.2], [0, 1, 1, 0]);
  const titleY = useTransform(scrollProgress, [0, 0.06, 0.12, 0.2], [40, 0, 0, -30]);

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px' }}>
      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center z-30"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tightest text-gradient">
          Product Evolution
        </h2>
        <p className="mt-3 text-sm text-novixa-muted font-light tracking-wide">
          A simple file becomes a premium experience
        </p>
      </motion.div>

      {/* Stage progression indicator */}
      <StageIndicator scrollProgress={scrollProgress} />

      {/* The transforming product at center */}
      <TransformingProduct scrollProgress={scrollProgress} />

      {/* Stage labels */}
      <StageLabels scrollProgress={scrollProgress} />
    </div>
  );
}

const STAGES = [
  { name: 'File', icon: Figma, color: '#A259FF', threshold: 0.08 },
  { name: 'Verified', icon: CheckCircle2, color: '#0099FF', threshold: 0.18 },
  { name: 'Preview', icon: Eye, color: '#22D3EE', threshold: 0.28 },
  { name: 'Listing', icon: Package, color: '#7C3AED', threshold: 0.42 },
  { name: 'Purchased', icon: ShoppingBag, color: '#7C3AED', threshold: 0.58 },
  { name: 'Downloaded', icon: Download, color: '#22D3EE', threshold: 0.72 },
];

function StageIndicator({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.08, 0.12, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute top-[22%] left-1/2 -translate-x-1/2 z-30"
      style={{ opacity }}
    >
      <div className="flex items-center gap-2">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = useTransform(scrollProgress, [stage.threshold - 0.02, stage.threshold], [0, 1]);
          const activeColor = useTransform(isActive, (v) => v > 0.5 ? stage.color : 'rgba(255,255,255,0.15)');
          const activeOpacity = useTransform(isActive, (v) => v > 0.5 ? 1 : 0.3);

          return (
            <div key={i} className="flex items-center">
              <motion.div
                className="flex items-center gap-1.5"
                style={{ opacity: activeOpacity }}
              >
                <motion.div
                  className="flex items-center justify-center w-7 h-7 rounded-lg"
                  style={{
                    background: useTransform(activeColor, (c) => `${c}15`),
                    border: useTransform(activeColor, (c) => `1px solid ${c}30`),
                  }}
                >
                  <Icon size={12} style={{ color: stage.color }} />
                </motion.div>
                <motion.span className="text-[10px] font-medium whitespace-nowrap" style={{ color: activeColor }}>{stage.name}</motion.span>
              </motion.div>
              {i < STAGES.length - 1 && (
                <div className="w-6 h-px mx-1.5" style={{ background: 'rgba(255,255,255,0.08)' }} />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function TransformingProduct({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  // The product stays centered but transforms through stages
  const baseScale = useTransform(scrollProgress, [0.08, 0.18, 0.28, 0.42], [0.6, 0.7, 0.9, 1]);
  const baseRotateY = useTransform(scrollProgress, [0.08, 0.28], [10, 0]);

  return (
    <motion.div
      className="relative z-10"
      style={{
        scale: baseScale,
        rotateY: baseRotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
    >
      {/* Stage 1: Flat icon */}
      <Stage1FlatIcon scrollProgress={scrollProgress} />
      {/* Stage 2: Premium card */}
      <Stage2PremiumCard scrollProgress={scrollProgress} />
      {/* Stage 3: Interactive preview */}
      <Stage3Preview scrollProgress={scrollProgress} />
      {/* Stage 4: Marketplace listing */}
      <Stage4Listing scrollProgress={scrollProgress} />
      {/* Stage 5: Purchased */}
      <Stage5Purchased scrollProgress={scrollProgress} />
      {/* Stage 6: Downloaded */}
      <Stage6Downloaded scrollProgress={scrollProgress} />
    </motion.div>
  );
}

function Stage1FlatIcon({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.08, 0.1, 0.16, 0.18], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.08, 0.18], [0.5, 1]);

  return (
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity, scale }}>
      <div className="glass-card rounded-xl w-14 h-14 flex items-center justify-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
        <Figma size={20} className="text-novixa-purple" />
      </div>
    </motion.div>
  );
}

function Stage2PremiumCard({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.18, 0.2, 0.26, 0.28], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.18, 0.28], [0.7, 1]);

  return (
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity, scale }}>
      <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-2.5 relative overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 24px rgba(162,89,255,0.2), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(162,89,255,0.15) 0%, transparent 50%)' }} />
        <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'rgba(162,89,255,0.15)', border: '1px solid rgba(162,89,255,0.3)' }}>
          <Figma size={16} className="text-[#A259FF]" />
        </div>
        <span className="text-xs font-medium whitespace-nowrap text-novixa-white">Figma UI Kit</span>
        <CheckCircle2 size={12} className="text-novixa-blue" />
      </div>
    </motion.div>
  );
}

function Stage3Preview({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.28, 0.3, 0.4, 0.42], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.28, 0.42], [0.7, 1]);

  return (
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity, scale }}>
      <div className="glass-card rounded-2xl overflow-hidden relative" style={{ width: '240px', boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 32px rgba(34,211,238,0.15), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.1) 0%, transparent 50%)' }} />
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-red-400/30" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/30" />
          <div className="w-2 h-2 rounded-full bg-green-400/30" />
          <div className="ml-2 flex-1 h-4 rounded-md bg-white/5" />
        </div>
        {/* Preview content */}
        <div className="p-3 space-y-2">
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-novixa-purple/20 to-novixa-blue/20 border border-white/5" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 rounded-full bg-white/10 w-3/4" />
              <div className="h-1.5 rounded-full bg-white/5 w-1/2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-10 rounded-lg bg-gradient-to-br from-novixa-blue/10 to-transparent border border-white/5" />
            <div className="h-10 rounded-lg bg-gradient-to-br from-novixa-purple/10 to-transparent border border-white/5" />
          </div>
          <div className="h-1.5 rounded-full bg-white/5 w-full" />
          <div className="h-1.5 rounded-full bg-white/5 w-2/3" />
        </div>
        {/* Preview label */}
        <div className="px-3 pb-2 flex items-center gap-1.5">
          <Eye size={10} className="text-novixa-cyan" />
          <span className="text-[9px] font-medium text-novixa-muted">Interactive Preview</span>
        </div>
      </div>
    </motion.div>
  );
}

function Stage4Listing({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.42, 0.44, 0.56, 0.58], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.42, 0.58], [0.7, 1]);

  return (
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity, scale }}>
      <div className="glass-card rounded-2xl overflow-hidden relative" style={{ width: '220px', boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 32px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, transparent 50%)' }} />
        {/* Product image area */}
        <div className="h-20 bg-gradient-to-br from-novixa-purple/15 to-novixa-blue/10 border-b border-white/5 flex items-center justify-center">
          <Figma size={28} className="text-[#A259FF]" />
        </div>
        {/* Listing info */}
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-novixa-white">Figma UI Kit</span>
            <span className="text-xs font-bold text-novixa-cyan">$49</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i < 4 ? '#22D3EE' : 'rgba(255,255,255,0.1)' }} />
              ))}
            </div>
            <span className="text-[9px] text-novixa-muted ml-1">4.0 (128)</span>
          </div>
          <div className="h-7 rounded-full bg-gradient-to-r from-novixa-blue/30 to-novixa-purple/30 border border-white/10 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-novixa-white">Add to Cart</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Stage5Purchased({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.58, 0.6, 0.7, 0.72], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.58, 0.72], [0.7, 1]);

  return (
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity, scale }}>
      <div className="glass-card rounded-2xl overflow-hidden relative" style={{ width: '220px', boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 32px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, transparent 50%)' }} />
        <div className="h-20 bg-gradient-to-br from-novixa-purple/15 to-novixa-blue/10 border-b border-white/5 flex items-center justify-center relative">
          <Figma size={28} className="text-[#A259FF]" />
          {/* Purchased overlay */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.1)' }}>
            <div className="glass-strong rounded-full px-3 py-1.5 flex items-center gap-1.5" style={{ boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}>
              <ShoppingBag size={12} className="text-novixa-purple" />
              <span className="text-[10px] font-semibold text-novixa-white">Purchased</span>
            </div>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-novixa-white">Figma UI Kit</span>
            <span className="text-xs font-bold text-novixa-purple line-through opacity-50">$49</span>
          </div>
          <div className="h-7 rounded-full bg-gradient-to-r from-novixa-purple/30 to-novixa-blue/30 border border-white/10 flex items-center justify-center gap-1.5">
            <Download size={12} className="text-novixa-white" />
            <span className="text-[10px] font-semibold text-novixa-white">Download Now</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Stage6Downloaded({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.72, 0.75, 0.88, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.72, 0.9], [0.7, 1]);
  const progress = useTransform(scrollProgress, [0.72, 0.85], [0, 100]);
  const strokeDashoffset = useTransform(progress, (v) => 88 - (88 * v) / 100);

  return (
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity, scale }}>
      <div className="glass-card rounded-2xl px-5 py-4 flex flex-col items-center gap-3 relative overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 32px rgba(34,211,238,0.2), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, transparent 50%)' }} />
        {/* Progress ring */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" width="64" height="64">
            <circle cx="32" cy="32" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
            <motion.circle
              cx="32" cy="32" r="14" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray="88"
              style={{ strokeDashoffset, filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.5))' }}
            />
          </svg>
          <CheckCircle2 size={20} className="text-novixa-cyan" />
        </div>
        <span className="text-xs font-semibold text-novixa-white">Downloaded</span>
        <div className="flex items-center gap-1.5">
          <Figma size={10} className="text-[#A259FF]" />
          <span className="text-[10px] text-novixa-muted">Figma UI Kit</span>
        </div>
      </div>
    </motion.div>
  );
}

function StageLabels({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.08, 0.12, 0.9, 1], [0, 1, 1, 0]);

  const labels = [
    { threshold: 0.13, text: 'A simple file appears', color: '#A259FF' },
    { threshold: 0.23, text: 'Scanned and verified', color: '#0099FF' },
    { threshold: 0.35, text: 'Interactive preview', color: '#22D3EE' },
    { threshold: 0.5, text: 'Listed in marketplace', color: '#7C3AED' },
    { threshold: 0.65, text: 'Purchased by customer', color: '#7C3AED' },
    { threshold: 0.8, text: 'Downloaded and ready', color: '#22D3EE' },
  ];

  return (
    <motion.div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 z-30" style={{ opacity }}>
      <AnimatePresence mode="wait">
        {labels.map((label, i) => {
          const isVisible = useTransform(scrollProgress, [label.threshold - 0.03, label.threshold, label.threshold + 0.08], [0, 1, 0]);
          const labelOpacity = isVisible;

          return (
            <motion.div key={i} style={{ opacity: labelOpacity, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <div className="glass rounded-full px-4 py-2 flex items-center gap-2" style={{ boxShadow: `0 4px 16px rgba(0,0,0,0.3)` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: label.color, boxShadow: `0 0 8px ${label.color}` }} />
                <span className="text-xs font-medium text-novixa-white whitespace-nowrap">{label.text}</span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
