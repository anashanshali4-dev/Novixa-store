import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Figma, CheckCircle2, ScanLine, ShoppingBag, Download, ArrowRight } from 'lucide-react';

interface ProductLifecycleProps {
  scrollProgress: MotionValue<number>;
}

// Phases:
// 0.00-0.10: Product appears (flat icon fades in)
// 0.10-0.20: Scanning (scan line sweeps across)
// 0.20-0.28: Verified (holographic checkmark)
// 0.28-0.40: Transform (flat icon → premium card)
// 0.40-0.55: Travel to marketplace (card moves right along connection line)
// 0.55-0.68: In marketplace (sits among other products)
// 0.68-0.78: Purchased (purchase flash)
// 0.78-0.90: Travel to downloads (moves down along connection line)
// 0.90-1.00: Downloaded (success pulse)

export function ProductLifecycle({ scrollProgress }: ProductLifecycleProps) {
  const titleOpacity = useTransform(scrollProgress, [0, 0.06, 0.12, 0.2], [0, 1, 1, 0]);
  const titleY = useTransform(scrollProgress, [0, 0.06, 0.12, 0.2], [40, 0, 0, -30]);

  return (
    <div className="absolute inset-0" style={{ perspective: '1200px' }}>
      {/* Title */}
      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center z-30"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tightest text-gradient">
          The Life of a Product
        </h2>
        <p className="mt-3 text-sm text-novixa-muted font-light tracking-wide">
          From creation to download — every step is alive
        </p>
      </motion.div>

      {/* Connection lines between zones */}
      <EcosystemConnections scrollProgress={scrollProgress} />

      {/* Zone labels */}
      <ZoneLabels scrollProgress={scrollProgress} />

      {/* The product journey */}
      <ProductJourney scrollProgress={scrollProgress} />

      {/* Scanning effect */}
      <ScanningEffect scrollProgress={scrollProgress} />

      {/* Verification checkmark */}
      <VerificationBadge scrollProgress={scrollProgress} />

      {/* Purchase flash */}
      <PurchaseFlash scrollProgress={scrollProgress} />

      {/* Download progress ring */}
      <DownloadProgress scrollProgress={scrollProgress} />

      {/* Zone nodes */}
      <ZoneNodes scrollProgress={scrollProgress} />
    </div>
  );
}

function EcosystemConnections({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.05, 0.15, 0.9, 1], [0, 0.6, 0.6, 0]);

  return (
    <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
      <defs>
        <linearGradient id="eco-line-1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#0099FF" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="eco-line-2" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Creation → Marketplace */}
      <line x1="22%" y1="50%" x2="50%" y2="50%" stroke="url(#eco-line-1)" strokeWidth="1.5" strokeDasharray="4 6" />
      {/* Marketplace → Downloads */}
      <line x1="50%" y1="50%" x2="78%" y2="50%" stroke="url(#eco-line-1)" strokeWidth="1.5" strokeDasharray="4 6" />
      {/* Upload → Marketplace */}
      <line x1="50%" y1="85%" x2="50%" y2="50%" stroke="url(#eco-line-2)" strokeWidth="1.5" strokeDasharray="4 6" />
    </motion.svg>
  );
}

function ZoneLabels({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.08, 0.15, 0.9, 1], [0, 1, 1, 0]);

  const zones = [
    { x: '22%', y: '50%', label: 'Creation', sublabel: 'Products appear here', color: '#0099FF' },
    { x: '50%', y: '50%', label: 'Marketplace', sublabel: 'Ready for purchase', color: '#7C3AED' },
    { x: '78%', y: '50%', label: 'Downloads', sublabel: 'Delivered to customers', color: '#22D3EE' },
    { x: '50%', y: '85%', label: 'Upload', sublabel: 'Cloud ingestion', color: '#A259FF' },
  ];

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {zones.map((zone) => (
        <div key={zone.label} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: zone.x, top: zone.y, marginTop: '60px' }}>
          <span className="text-[10px] font-semibold tracking-ultra uppercase" style={{ color: zone.color }}>{zone.label}</span>
          <p className="text-[9px] text-novixa-muted mt-0.5 font-light">{zone.sublabel}</p>
        </div>
      ))}
    </motion.div>
  );
}

function ZoneNodes({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.08, 0.15, 0.9, 1], [0, 1, 1, 0]);

  const nodes = [
    { x: '22%', y: '50%', color: '#0099FF', glow: 'rgba(0,153,255,0.3)', icon: Figma },
    { x: '50%', y: '50%', color: '#7C3AED', glow: 'rgba(124,58,237,0.3)', icon: ShoppingBag },
    { x: '78%', y: '50%', color: '#22D3EE', glow: 'rgba(34,211,238,0.3)', icon: Download },
    { x: '50%', y: '85%', color: '#A259FF', glow: 'rgba(162,89,255,0.3)', icon: ArrowRight },
  ];

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <div
            key={node.x + node.y}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: node.x, top: node.y }}
          >
            <div
              className="glass-strong rounded-2xl w-14 h-14 flex items-center justify-center"
              style={{
                boxShadow: `0 0 40px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                border: `1px solid ${node.color}30`,
              }}
            >
              <Icon size={20} style={{ color: node.color }} />
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

function ProductJourney({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  // Position interpolation across the full lifecycle
  // Creation (22%) → Marketplace (50%) → Downloads (78%)
  const x = useTransform(scrollProgress, [0.05, 0.38, 0.42, 0.55, 0.75, 0.78, 0.88], [22, 22, 50, 50, 50, 78, 78]);
  const xPercent = useTransform(x, (v) => `${v}%`);

  const y = useTransform(scrollProgress, [0.05, 0.38, 0.42, 0.55, 0.75, 0.78, 0.88], [50, 50, 50, 50, 50, 50, 50]);
  const yPercent = useTransform(y, (v) => `${v}%`);

  // Opacity: appear, stay visible, fade at end
  const opacity = useTransform(scrollProgress, [0.05, 0.08, 0.85, 0.95], [0, 1, 1, 0]);

  // Scale: grows as it transforms from flat icon to premium card
  const scale = useTransform(scrollProgress, [0.05, 0.28, 0.38, 0.42], [0.5, 0.5, 0.7, 1]);

  // Rotation during travel
  const rotate = useTransform(scrollProgress, [0.38, 0.42, 0.75, 0.78], [0, 5, 5, 0]);

  // Card vs flat icon state
  const isCard = useTransform(scrollProgress, [0.35, 0.4], [0, 1]);
  const isCardOpacity = useTransform(isCard, (v) => `${v}`);
  const isIconOpacity = useTransform(isCard, (v) => `${1 - v}`);

  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{
        left: xPercent,
        top: yPercent,
        translateX: '-50%',
        translateY: '-50%',
        opacity,
        scale,
        rotate,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
    >
      {/* Flat icon state (pre-transformation) */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        style={{ opacity: isIconOpacity }}
      >
        <div
          className="glass-card rounded-xl w-12 h-12 flex items-center justify-center"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        >
          <Figma size={18} className="text-novixa-blue" />
        </div>
      </motion.div>

      {/* Premium card state (post-transformation) */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        style={{ opacity: isCardOpacity }}
      >
        <div
          className="glass-card rounded-2xl px-4 py-3 flex items-center gap-2.5 relative overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 24px rgba(0,153,255,0.2), inset 0 1px 0 rgba(255,255,255,0.06)' }}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(0,153,255,0.15) 0%, transparent 50%)' }} />
          <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'rgba(162,89,255,0.15)', border: '1px solid rgba(162,89,255,0.3)' }}>
            <Figma size={16} className="text-[#A259FF]" />
          </div>
          <span className="text-xs font-medium whitespace-nowrap text-novixa-white">Figma UI Kit</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScanningEffect({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.1, 0.12, 0.18, 0.2], [0, 1, 1, 0]);
  const scanY = useTransform(scrollProgress, [0.1, 0.2], [0, 100]);
  const scanYPercent = useTransform(scanY, (v) => `${v}%`);

  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{
        left: '22%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        width: '80px',
        height: '80px',
        opacity,
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <motion.div
          className="absolute inset-x-0 h-0.5"
          style={{
            top: scanYPercent,
            background: 'linear-gradient(90deg, transparent, #0099FF, transparent)',
            boxShadow: '0 0 12px rgba(0,153,255,0.6)',
          }}
        />
      </div>
      <ScanLine size={14} className="absolute -top-5 left-1/2 -translate-x-1/2 text-novixa-blue" />
    </motion.div>
  );
}

function VerificationBadge({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.2, 0.22, 0.26, 0.28], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.2, 0.22, 0.26, 0.28], [0, 1.2, 1, 0.8]);

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{
        left: '22%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        opacity,
        scale,
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Holographic ring */}
        <motion.div
          className="absolute w-16 h-16 rounded-full"
          style={{ border: '1.5px solid rgba(0,153,255,0.4)', boxShadow: '0 0 30px rgba(0,153,255,0.3)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <div
          className="glass-strong rounded-full w-10 h-10 flex items-center justify-center"
          style={{ boxShadow: '0 0 20px rgba(0,153,255,0.3)', border: '1px solid rgba(0,153,255,0.4)' }}
        >
          <CheckCircle2 size={18} className="text-novixa-blue" />
        </div>
      </div>
    </motion.div>
  );
}

function PurchaseFlash({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.68, 0.7, 0.74, 0.78], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.68, 0.72, 0.78], [0.5, 1.3, 1.8]);

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        opacity,
        scale,
      }}
    >
      <div
        className="glass-strong rounded-full px-4 py-2 flex items-center gap-2"
        style={{ boxShadow: '0 0 30px rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.4)' }}
      >
        <ShoppingBag size={14} className="text-novixa-purple" />
        <span className="text-xs font-semibold text-novixa-white whitespace-nowrap">Purchased</span>
      </div>
    </motion.div>
  );
}

function DownloadProgress({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.88, 0.92, 0.98, 1], [0, 1, 1, 0]);
  const progress = useTransform(scrollProgress, [0.88, 0.98], [0, 100]);
  const progressText = useTransform(progress, (v) => `${Math.round(v)}%`);
  const strokeDashoffset = useTransform(progress, (v) => 138 - (138 * v) / 100);

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{
        left: '78%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        opacity,
      }}
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" width="80" height="80">
          <circle cx="40" cy="40" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
          <motion.circle
            cx="40" cy="40" r="22" fill="none" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="138"
            style={{ strokeDashoffset, filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.5))' }}
          />
        </svg>
        <motion.span className="text-xs font-semibold text-novixa-white">{progressText}</motion.span>
      </div>
    </motion.div>
  );
}
