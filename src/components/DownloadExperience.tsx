import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import {
  Figma, Palette, Code2, Brain, Download, CheckCircle2, ArrowRight, Package,
} from 'lucide-react';

interface DownloadExperienceProps {
  scrollProgress: MotionValue<number>;
}

// Phases:
// 0.00-0.10: Title appears
// 0.10-0.25: Purchased products travel from marketplace to download zone
// 0.25-0.55: Download progress ring fills (premium, not generic)
// 0.55-0.70: Success pulse + glow
// 0.70-0.90: Downloaded products sit in downloads folder
// 0.90-1.00: Everything glows — ecosystem complete

export function DownloadExperience({ scrollProgress }: DownloadExperienceProps) {
  const titleOpacity = useTransform(scrollProgress, [0, 0.06, 0.12, 0.2], [0, 1, 1, 0]);
  const titleY = useTransform(scrollProgress, [0, 0.06, 0.12, 0.2], [40, 0, 0, -30]);

  const finalOpacity = useTransform(scrollProgress, [0.88, 0.93, 0.98, 1], [0, 1, 1, 0]);
  const finalY = useTransform(scrollProgress, [0.88, 0.93], [30, 0]);

  return (
    <div className="absolute inset-0" style={{ perspective: '1200px' }}>
      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center z-30"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tightest text-gradient">
          Premium Delivery
        </h2>
        <p className="mt-3 text-sm text-novixa-muted font-light tracking-wide">
          Every download is a beautiful, satisfying experience
        </p>
      </motion.div>

      {/* Connection lines */}
      <DownloadConnections scrollProgress={scrollProgress} />

      {/* Zone nodes */}
      <DownloadZoneNodes scrollProgress={scrollProgress} />

      {/* Traveling products */}
      <TravelingProducts scrollProgress={scrollProgress} />

      {/* Central download progress ring */}
      <DownloadRing scrollProgress={scrollProgress} />

      {/* Success pulse */}
      <SuccessPulse scrollProgress={scrollProgress} />

      {/* Downloaded products */}
      <DownloadedProducts scrollProgress={scrollProgress} />

      {/* Final message */}
      <motion.div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center z-30"
        style={{ opacity: finalOpacity, y: finalY }}
      >
        <p className="text-lg md:text-xl font-light text-novixa-white tracking-wide max-w-lg">
          The Novixa ecosystem — alive from creation to delivery
        </p>
      </motion.div>
    </div>
  );
}

function DownloadConnections({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.08, 0.15, 0.9, 1], [0, 0.5, 0.5, 0]);

  return (
    <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
      <defs>
        <linearGradient id="dl-line" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <line x1="30%" y1="50%" x2="70%" y2="50%" stroke="url(#dl-line)" strokeWidth="1.5" strokeDasharray="4 6" />
    </motion.svg>
  );
}

function DownloadZoneNodes({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.08, 0.15, 0.9, 1], [0, 1, 1, 0]);

  const nodes = [
    { x: '30%', y: '50%', label: 'Marketplace', color: '#7C3AED', glow: 'rgba(124,58,237,0.3)', icon: Package },
    { x: '70%', y: '50%', label: 'Downloads', color: '#22D3EE', glow: 'rgba(34,211,238,0.3)', icon: Download },
  ];

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <div key={node.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: node.x, top: node.y }}>
            <div
              className="glass-strong rounded-2xl w-14 h-14 flex items-center justify-center"
              style={{
                boxShadow: `0 0 40px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                border: `1px solid ${node.color}30`,
              }}
            >
              <Icon size={20} style={{ color: node.color }} />
            </div>
            <div className="text-center mt-3">
              <span className="text-[10px] font-semibold tracking-ultra uppercase" style={{ color: node.color }}>{node.label}</span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

interface TravelProduct {
  id: string;
  label: string;
  icon: typeof Figma;
  color: string;
  glow: string;
  delay: number;
}

const TRAVEL_PRODUCTS: TravelProduct[] = [
  { id: 't-figma', label: 'Figma Kit', icon: Figma, color: '#A259FF', glow: 'rgba(162,89,255,0.3)', delay: 0 },
  { id: 't-canva', label: 'Canva', icon: Palette, color: '#00C7CC', glow: 'rgba(0,199,204,0.3)', delay: 0.03 },
  { id: 't-react', label: 'React', icon: Code2, color: '#22D3EE', glow: 'rgba(34,211,238,0.3)', delay: 0.06 },
  { id: 't-ai', label: 'AI Prompt', icon: Brain, color: '#7C3AED', glow: 'rgba(124,58,237,0.3)', delay: 0.09 },
];

function TravelingProducts({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <>
      {TRAVEL_PRODUCTS.map((product, i) => {
        const Icon = product.icon;
        const travelStart = 0.1 + product.delay;
        const travelEnd = travelStart + 0.12;

        const x = useTransform(scrollProgress, [travelStart, travelEnd], [30, 70]);
        const xPercent = useTransform(x, (v) => `${v}%`);
        const yOffset = (i - 1.5) * 25;
        const opacity = useTransform(scrollProgress, [travelStart, travelStart + 0.02, travelEnd, travelEnd + 0.02], [0, 1, 1, 0]);
        const scale = useTransform(scrollProgress, [travelStart, travelEnd], [0.7, 0.5]);

        return (
          <motion.div
            key={product.id}
            className="absolute z-20 pointer-events-none"
            style={{
              left: xPercent, top: '50%',
              translateY: `calc(-50% + ${yOffset}px)`,
              opacity, scale,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="glass-card rounded-xl px-3 py-2 flex items-center gap-2"
              style={{ boxShadow: `0 4px 16px rgba(0,0,0,0.3), 0 0 12px ${product.glow}` }}
            >
              <Icon size={12} style={{ color: product.color }} />
              <span className="text-[10px] font-medium whitespace-nowrap text-novixa-white">{product.label}</span>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

function DownloadRing({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.25, 0.28, 0.55, 0.6], [0, 1, 1, 0]);
  const progress = useTransform(scrollProgress, [0.25, 0.55], [0, 100]);
  const progressText = useTransform(progress, (v) => `${Math.round(v)}%`);
  const strokeDashoffset = useTransform(progress, (v) => 138 - (138 * v) / 100);

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{
        left: '50%', top: '50%',
        translateX: '-50%', translateY: '-50%',
        opacity,
      }}
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer glow ring */}
        <motion.div
          className="absolute w-24 h-24 rounded-full"
          style={{ border: '1px solid rgba(34,211,238,0.15)', boxShadow: '0 0 40px rgba(34,211,238,0.1)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <svg className="absolute inset-0 -rotate-90" width="96" height="96">
          <circle cx="48" cy="48" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <motion.circle
            cx="48" cy="48" r="22" fill="none" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="138"
            style={{ strokeDashoffset, filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.5))' }}
          />
        </svg>
        <div className="flex flex-col items-center">
          <Download size={16} className="text-novixa-cyan mb-1" />
          <motion.span className="text-xs font-semibold text-novixa-white tabular-nums">{progressText}</motion.span>
        </div>
      </div>
    </motion.div>
  );
}

function SuccessPulse({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.55, 0.58, 0.65, 0.7], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.55, 0.58, 0.65, 0.7], [0.5, 1.2, 1.3, 1.8]);
  const checkScale = useTransform(scrollProgress, [0.55, 0.58, 0.62], [0, 1.3, 1]);

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{
        left: '50%', top: '50%',
        translateX: '-50%', translateY: '-50%',
        opacity, scale,
      }}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{ border: '1.5px solid rgba(34,211,238,0.4)', boxShadow: '0 0 40px rgba(34,211,238,0.3)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="glass-strong rounded-full w-12 h-12 flex items-center justify-center"
          style={{ boxShadow: '0 0 30px rgba(34,211,238,0.3)', border: '1px solid rgba(34,211,238,0.4)' }}
          animate={{ scale: checkScale.get() ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.4 }}
        >
          <CheckCircle2 size={22} className="text-novixa-cyan" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function DownloadedProducts({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.7, 0.78, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.7, 0.78], [40, 0]);

  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: '70%', top: '50%',
        translateX: '-50%', translateY: '-50%',
        marginTop: '70px',
        opacity, y,
      }}
    >
      <div className="flex flex-col gap-2 items-center">
        {TRAVEL_PRODUCTS.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              className="glass-card rounded-xl px-3 py-2 flex items-center gap-2"
              style={{ boxShadow: `0 4px 12px rgba(0,0,0,0.3), 0 0 8px ${p.glow}` }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-md" style={{ background: `${p.color}15` }}>
                <Icon size={10} style={{ color: p.color }} />
              </div>
              <span className="text-[10px] font-medium whitespace-nowrap text-novixa-white">{p.label}</span>
              <CheckCircle2 size={10} className="text-novixa-cyan" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
