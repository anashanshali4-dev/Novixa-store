import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Cloud, CheckCircle2, ArrowUp, Palette, Code2, Brain, PenTool } from 'lucide-react';

interface UploadSystemProps {
  scrollProgress: MotionValue<number>;
}

// Phases:
// 0.00-0.10: Title appears
// 0.10-0.25: Products rise from below toward the cloud
// 0.25-0.45: Cloud uploads — progress fills to 100%
// 0.45-0.55: Success state — premium badge
// 0.55-0.75: Products travel upward to marketplace
// 0.75-1.00: Marketplace grid shows products available

export function UploadSystem({ scrollProgress }: UploadSystemProps) {
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
          Cloud Ingestion
        </h2>
        <p className="mt-3 text-sm text-novixa-muted font-light tracking-wide">
          Products rise, upload, and join the marketplace
        </p>
      </motion.div>

      {/* Upload connection line */}
      <UploadConnection scrollProgress={scrollProgress} />

      {/* The cloud at center */}
      <CloudNode scrollProgress={scrollProgress} />

      {/* Rising products */}
      <RisingProducts scrollProgress={scrollProgress} />

      {/* Upload progress */}
      <UploadProgress scrollProgress={scrollProgress} />

      {/* Success state */}
      <SuccessState scrollProgress={scrollProgress} />

      {/* Marketplace arrival */}
      <MarketplaceArrival scrollProgress={scrollProgress} />
    </div>
  );
}

function UploadConnection({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.1, 0.2, 0.85, 1], [0, 0.5, 0.5, 0]);

  return (
    <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
      <defs>
        <linearGradient id="upload-line" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#A259FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0099FF" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <line x1="50%" y1="85%" x2="50%" y2="50%" stroke="url(#upload-line)" strokeWidth="1.5" strokeDasharray="4 6" />
      <line x1="50%" y1="50%" x2="50%" y2="25%" stroke="url(#upload-line)" strokeWidth="1.5" strokeDasharray="4 6" />
    </motion.svg>
  );
}

function CloudNode({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.08, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.08, 0.15], [0.5, 1]);
  const breathe = useTransform(scrollProgress, [0.2, 0.5], [0, 1]);

  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: '50%', top: '50%',
        translateX: '-50%', translateY: '-50%',
        opacity, scale, transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="glass-strong rounded-3xl w-24 h-24 flex items-center justify-center relative overflow-hidden"
        style={{
          boxShadow: '0 0 60px rgba(0,153,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
          border: '1px solid rgba(0,153,255,0.2)',
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(0,153,255,0.15) 0%, transparent 50%)' }} />
        <Cloud size={32} className="text-novixa-blue" style={{ transform: 'translateZ(20px)' }} />
      </motion.div>
    </motion.div>
  );
}

interface RisingProduct {
  id: string;
  label: string;
  icon: typeof Palette;
  color: string;
  startX: number;
}

const RISING_PRODUCTS: RisingProduct[] = [
  { id: 'r-canva', label: 'Canva Template', icon: Palette, color: '#00C7CC', startX: -80 },
  { id: 'r-react', label: 'React Component', icon: Code2, color: '#22D3EE', startX: 80 },
  { id: 'r-ai', label: 'AI Prompt', icon: Brain, color: '#7C3AED', startX: -40 },
  { id: 'r-brand', label: 'Brand Kit', icon: PenTool, color: '#A259FF', startX: 40 },
];

function RisingProducts({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <>
      {RISING_PRODUCTS.map((product, i) => {
        const Icon = product.icon;
        const riseStart = 0.1 + i * 0.03;
        const riseEnd = riseStart + 0.12;

        const y = useTransform(scrollProgress, [riseStart, riseEnd], [35, 0]);
        const yPercent = useTransform(y, (v) => `${v}%`);
        const x = useTransform(scrollProgress, [riseStart, riseEnd], [product.startX, 0]);
        const xPx = useTransform(x, (v) => `${v}px`);
        const opacity = useTransform(scrollProgress, [riseStart, riseStart + 0.02, riseEnd, riseEnd + 0.02], [0, 1, 1, 0]);
        const scale = useTransform(scrollProgress, [riseStart, riseEnd], [0.5, 0.7]);

        return (
          <motion.div
            key={product.id}
            className="absolute z-20 pointer-events-none"
            style={{
              left: '50%', top: '50%',
              translateX: '-50%', translateY: '-50%',
              x: xPx, y: yPercent,
              opacity, scale,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="glass-card rounded-xl px-3 py-2 flex items-center gap-2"
              style={{ boxShadow: `0 4px 16px rgba(0,0,0,0.3), 0 0 12px ${product.color}25` }}
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

function UploadProgress({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.25, 0.28, 0.42, 0.45], [0, 1, 1, 0]);
  const progress = useTransform(scrollProgress, [0.25, 0.42], [0, 100]);
  const progressText = useTransform(progress, (v) => `${Math.round(v)}%`);
  const barWidth = useTransform(progress, (v) => `${v}%`);

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{
        left: '50%', top: '50%',
        translateX: '-50%', translateY: '-50%',
        marginTop: '70px',
        opacity,
      }}
    >
      <div className="glass rounded-full px-4 py-2 flex items-center gap-3" style={{ width: '160px' }}>
        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: barWidth,
              background: 'linear-gradient(90deg, #0099FF, #7C3AED)',
              boxShadow: '0 0 8px rgba(0,153,255,0.4)',
            }}
          />
        </div>
        <motion.span className="text-[10px] font-semibold text-novixa-white tabular-nums w-8 text-right">{progressText}</motion.span>
      </div>
    </motion.div>
  );
}

function SuccessState({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.45, 0.48, 0.53, 0.55], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.45, 0.48, 0.53], [0.5, 1.2, 1]);

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{
        left: '50%', top: '50%',
        translateX: '-50%', translateY: '-50%',
        opacity, scale,
      }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="absolute w-16 h-16 rounded-full"
          style={{ border: '1.5px solid rgba(34,211,238,0.4)', boxShadow: '0 0 30px rgba(34,211,238,0.3)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <div
          className="glass-strong rounded-full w-10 h-10 flex items-center justify-center"
          style={{ boxShadow: '0 0 20px rgba(34,211,238,0.3)', border: '1px solid rgba(34,211,238,0.4)' }}
        >
          <CheckCircle2 size={18} className="text-novixa-cyan" />
        </div>
      </div>
    </motion.div>
  );
}

function MarketplaceArrival({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.58, 0.68, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.58, 0.68], [40, 0]);

  const products = [
    { icon: Palette, label: 'Canva', color: '#00C7CC' },
    { icon: Code2, label: 'React', color: '#22D3EE' },
    { icon: Brain, label: 'AI Prompt', color: '#7C3AED' },
    { icon: PenTool, label: 'Brand Kit', color: '#A259FF' },
  ];

  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: '50%', top: '25%',
        translateX: '-50%', translateY: '-50%',
        opacity, y,
      }}
    >
      <div className="text-center mb-4">
        <span className="text-[10px] font-semibold tracking-ultra uppercase text-novixa-muted">Now in Marketplace</span>
      </div>
      <div className="flex gap-3">
        {products.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={i}
              className="glass-card rounded-2xl px-3 py-2.5 flex items-center gap-2"
              style={{ boxShadow: `0 4px 16px rgba(0,0,0,0.3), 0 0 12px ${p.color}20` }}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-md" style={{ background: `${p.color}15` }}>
                <Icon size={12} style={{ color: p.color }} />
              </div>
              <span className="text-[10px] font-medium whitespace-nowrap text-novixa-white">{p.label}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
