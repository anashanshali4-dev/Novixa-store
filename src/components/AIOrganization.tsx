import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import {
  Figma, Palette, Code2, Brain, Grid3x3, Shapes, Smartphone, Globe, PenTool, Cpu, Sparkles, ArrowRight,
} from 'lucide-react';

interface AIOrganizationProps {
  scrollProgress: MotionValue<number>;
}

// Phases:
// 0.00-0.10: Title + AI core activates
// 0.10-0.20: Unsorted products float around center
// 0.20-0.55: AI sorts — products fly to their matching categories one by one
// 0.55-0.75: Categories rearrange into organized grid
// 0.75-1.00: AI suggestions appear, everything glows

export function AIOrganization({ scrollProgress }: AIOrganizationProps) {
  const titleOpacity = useTransform(scrollProgress, [0, 0.06, 0.12, 0.2], [0, 1, 1, 0]);
  const titleY = useTransform(scrollProgress, [0, 0.06, 0.12, 0.2], [40, 0, 0, -30]);

  const subtitleOpacity = useTransform(scrollProgress, [0.78, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const subtitleY = useTransform(scrollProgress, [0.78, 0.85], [30, 0]);

  return (
    <div className="absolute inset-0" style={{ perspective: '1200px' }}>
      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center z-30"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tightest text-gradient">
          AI-Powered Organization
        </h2>
        <p className="mt-3 text-sm text-novixa-muted font-light tracking-wide">
          Intelligence sorts every product into its perfect place
        </p>
      </motion.div>

      {/* AI Core */}
      <AICore scrollProgress={scrollProgress} />

      {/* Category targets */}
      <CategoryTargets scrollProgress={scrollProgress} />

      {/* Products flying to categories */}
      <SortingProducts scrollProgress={scrollProgress} />

      {/* Connection lines from AI to categories */}
      <AIConnections scrollProgress={scrollProgress} />

      {/* AI suggestions */}
      <AISuggestions scrollProgress={scrollProgress} />

      {/* Closing subtitle */}
      <motion.div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center z-30"
        style={{ opacity: subtitleOpacity, y: subtitleY }}
      >
        <p className="text-lg md:text-xl font-light text-novixa-white tracking-wide max-w-lg">
          Every product finds its home — automatically
        </p>
      </motion.div>
    </div>
  );
}

function AICore({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.05, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.05, 0.12], [0.3, 1]);

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
        className="relative flex items-center justify-center w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border border-dashed" style={{ borderColor: 'rgba(124,58,237,0.3)' }} />
        <div className="absolute inset-2 rounded-full border border-dashed" style={{ borderColor: 'rgba(0,153,255,0.3)' }} />
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,153,255,0.15), rgba(124,58,237,0.15))',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 40px rgba(124,58,237,0.2)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Cpu size={18} className="text-novixa-blue" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

interface CategoryTarget {
  id: string;
  label: string;
  icon: typeof Figma;
  color: string;
  glow: string;
  position: { x: number; y: number };
}

const CATEGORIES: CategoryTarget[] = [
  { id: 'cat-design', label: 'Design', icon: PenTool, color: '#A259FF', glow: 'rgba(162,89,255,0.3)', position: { x: -280, y: -100 } },
  { id: 'cat-dev', label: 'Development', icon: Code2, color: '#22D3EE', glow: 'rgba(34,211,238,0.3)', position: { x: 280, y: -100 } },
  { id: 'cat-ai', label: 'AI Tools', icon: Brain, color: '#7C3AED', glow: 'rgba(124,58,237,0.3)', position: { x: -280, y: 100 } },
  { id: 'cat-systems', label: 'Systems', icon: Grid3x3, color: '#0099FF', glow: 'rgba(0,153,255,0.3)', position: { x: 280, y: 100 } },
];

function CategoryTargets({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <>
      {CATEGORIES.map((cat, i) => {
        const Icon = cat.icon;
        const appearStart = 0.15 + i * 0.02;
        const appearEnd = appearStart + 0.06;

        const x = useTransform(scrollProgress, [appearStart, appearEnd], [0, cat.position.x]);
        const y = useTransform(scrollProgress, [appearStart, appearEnd], [0, cat.position.y]);
        const opacity = useTransform(scrollProgress, [appearStart, appearStart + 0.04, 0.9, 1], [0, 1, 1, 0]);
        const scale = useTransform(scrollProgress, [appearStart, appearEnd], [0.3, 1]);
        const glow = useTransform(scrollProgress, [0.2, 0.5 + i * 0.03, 0.5 + i * 0.03 + 0.05], [0.3, 1, 0.6]);

        return (
          <motion.div
            key={cat.id}
            className="absolute z-10"
            style={{
              left: '50%', top: '50%',
              translateX: '-50%', translateY: '-50%',
              x, y, opacity, scale,
              transformStyle: 'preserve-3d', transformPerspective: 800,
            }}
          >
            <motion.div style={{ filter: useTransform(glow, (v) => `drop-shadow(0 0 ${v * 25}px ${cat.glow})`) }}>
              <div
                className="glass-card rounded-2xl px-5 py-4 flex flex-col items-center gap-2 relative overflow-hidden"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)' }}
              >
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `linear-gradient(135deg, ${cat.color}15 0%, transparent 50%)` }} />
                <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
                  <Icon size={18} style={{ color: cat.color }} />
                </div>
                <span className="text-sm font-semibold text-novixa-white whitespace-nowrap">{cat.label}</span>
                <span className="text-[9px] text-novixa-muted font-medium">0 items</span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

interface SortingProduct {
  id: string;
  label: string;
  icon: typeof Figma;
  color: string;
  glow: string;
  targetCategory: number;
  startX: number;
  startY: number;
}

const SORTING_PRODUCTS: SortingProduct[] = [
  { id: 's-figma', label: 'Figma Kit', icon: Figma, color: '#A259FF', glow: 'rgba(162,89,255,0.3)', targetCategory: 0, startX: -60, startY: -30 },
  { id: 's-canva', label: 'Canva', icon: Palette, color: '#00C7CC', glow: 'rgba(0,199,204,0.3)', targetCategory: 0, startX: 60, startY: -50 },
  { id: 's-react', label: 'React', icon: Code2, color: '#22D3EE', glow: 'rgba(34,211,238,0.3)', targetCategory: 1, startX: -50, startY: 40 },
  { id: 's-mobile', label: 'Mobile App', icon: Smartphone, color: '#0099FF', glow: 'rgba(0,153,255,0.3)', targetCategory: 1, startX: 70, startY: 20 },
  { id: 's-ai', label: 'AI Prompt', icon: Brain, color: '#7C3AED', glow: 'rgba(124,58,237,0.3)', targetCategory: 2, startX: -70, startY: 10 },
  { id: 's-icons', label: 'Icons', icon: Shapes, color: '#22D3EE', glow: 'rgba(34,211,238,0.25)', targetCategory: 3, startX: 50, startY: 50 },
  { id: 's-web', label: 'Website', icon: Globe, color: '#E8EAF0', glow: 'rgba(232,234,240,0.15)', targetCategory: 3, startX: -40, startY: -60 },
  { id: 's-brand', label: 'Brand Kit', icon: PenTool, color: '#A259FF', glow: 'rgba(162,89,255,0.25)', targetCategory: 0, startX: 80, startY: 60 },
];

function SortingProducts({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <>
      {SORTING_PRODUCTS.map((product, i) => {
        const Icon = product.icon;
        const targetCat = CATEGORIES[product.targetCategory];

        const sortStart = 0.22 + i * 0.035;
        const sortEnd = sortStart + 0.06;

        const x = useTransform(scrollProgress, [sortStart, sortEnd], [product.startX, targetCat.position.x]);
        const y = useTransform(scrollProgress, [sortStart, sortEnd], [product.startY, targetCat.position.y]);
        const opacity = useTransform(scrollProgress, [0.1, 0.12, sortStart + 0.01, sortEnd, sortEnd + 0.02], [0, 1, 1, 1, 0]);
        const scale = useTransform(scrollProgress, [sortStart, sortEnd], [0.7, 0.4]);

        return (
          <motion.div
            key={product.id}
            className="absolute z-20 pointer-events-none"
            style={{
              left: '50%', top: '50%',
              translateX: '-50%', translateY: '-50%',
              x, y, opacity, scale,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="glass-card rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
              style={{ boxShadow: `0 4px 16px rgba(0,0,0,0.3), 0 0 12px ${product.glow}` }}
            >
              <Icon size={10} style={{ color: product.color }} />
              <span className="text-[9px] font-medium whitespace-nowrap text-novixa-white">{product.label}</span>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

function AIConnections({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.2, 0.3, 0.85, 1], [0, 0.5, 0.5, 0]);

  const lines = [
    { x2: '36%', y2: '38%' },
    { x2: '64%', y2: '38%' },
    { x2: '36%', y2: '62%' },
    { x2: '64%', y2: '62%' },
  ];

  return (
    <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
      <defs>
        <linearGradient id="ai-sort-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0099FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {lines.map((line, i) => (
        <line key={i} x1="50%" y1="50%" x2={line.x2} y2={line.y2} stroke="url(#ai-sort-line)" strokeWidth="1" strokeDasharray="3 5" />
      ))}
    </motion.svg>
  );
}

function AISuggestions({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0.78, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.78, 0.85], [30, 0]);

  const suggestions = [
    { text: 'Suggested for Design', icon: PenTool, color: '#A259FF' },
    { text: 'Suggested for AI Tools', icon: Brain, color: '#7C3AED' },
    { text: 'Suggested for Development', icon: Code2, color: '#22D3EE' },
  ];

  return (
    <motion.div
      className="absolute z-30"
      style={{
        left: '50%', top: '50%',
        translateX: '-50%', translateY: '-50%',
        marginTop: '120px',
        opacity, y,
      }}
    >
      <div className="flex flex-col gap-2 items-center">
        {suggestions.map((sug, i) => {
          const Icon = sug.icon;
          return (
            <motion.div
              key={i}
              className="glass rounded-full px-4 py-2 flex items-center gap-2"
              style={{ boxShadow: `0 4px 16px rgba(0,0,0,0.3), 0 0 12px ${sug.color}20` }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Sparkles size={12} style={{ color: sug.color }} />
              <span className="text-[10px] font-medium text-novixa-white whitespace-nowrap">{sug.text}</span>
              <ArrowRight size={10} className="text-novixa-muted" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
