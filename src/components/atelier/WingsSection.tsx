import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from 'framer-motion';
import {
  PenTool, Palette, Layers, BookOpen, Type, Presentation,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Wing {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  count: number;
  description: string;
  tags: string[];
}

const WINGS: Wing[] = [
  { id: 'ui-ux', name: 'UI/UX & Figma', icon: PenTool, color: '#7B5CFF', count: 124, description: 'Component libraries, design systems, and Figma files crafted for production-grade interfaces.', tags: ['Figma', 'Design Systems', 'Kits'] },
  { id: 'canva', name: 'Canva & Social', icon: Palette, color: '#3FE0D0', count: 218, description: 'Social media templates, presentation decks, and brand-ready Canva assets for every platform.', tags: ['Canva', 'Social', 'Templates'] },
  { id: 'branding', name: 'Branding & Mockups', icon: Layers, color: '#FFC15E', count: 96, description: 'Brand identity kits, logo systems, and photorealistic mockups for every surface and screen.', tags: ['Branding', 'Mockups', 'Logos'] },
  { id: 'courses', name: 'Courses & Ebooks', icon: BookOpen, color: '#7B5CFF', count: 84, description: 'Expert-led courses and in-depth ebooks on design, development, and creative business.', tags: ['Courses', 'Ebooks', 'Learning'] },
  { id: 'icons', name: 'Icons, Fonts & Graphics', icon: Type, color: '#3FE0D0', count: 312, description: 'Pixel-perfect icon sets, typefaces, and graphic packs for every creative discipline.', tags: ['Icons', 'Fonts', 'Graphics'] },
  { id: 'presentations', name: 'Presentations', icon: Presentation, color: '#FFC15E', count: 145, description: 'Cinematic presentation templates for pitches, decks, and keynote-level storytelling.', tags: ['Keynote', 'PowerPoint', 'Decks'] },
];

export function WingsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // 6 wings across the pinned scroll
  const wingCount = WINGS.length;
  const segmentSize = 1 / wingCount;

  const [activeWing, setActiveWing] = useState(0);

  // Track active wing
  useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  }).scrollYProgress.on('change', (v) => {
    const idx = Math.min(Math.floor(v * wingCount), wingCount - 1);
    setActiveWing(idx);
  });

  return (
    <section ref={ref} className="relative" style={{ height: `${wingCount * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Ambient background shift per wing */}
        <AnimatePresence mode="sync">
          <motion.div
            key={activeWing}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: EASE }}
            style={{
              background: `radial-gradient(ellipse 60% 80% at 50% 50%, ${WINGS[activeWing].color}08 0%, transparent 70%)`,
            }}
          />
        </AnimatePresence>

        {/* Wing content — crossfade between wings */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {WINGS.map((wing, i) => {
            const isActive = i === activeWing;
            const Icon = wing.icon;

            // Calculate this wing's scroll segment
            const start = i * segmentSize;
            const end = start + segmentSize;

            // Within the segment: entrance, hold, exit
            const enterProgress = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);
            const exitProgress = useTransform(scrollYProgress, [end - 0.08, end - 0.02], [0, 1]);

            const opacity = useTransform(
              scrollYProgress,
              [start - 0.01, start + 0.03, end - 0.08, end - 0.02],
              [0, 1, 1, 0]
            );
            const x = useTransform(scrollYProgress, [start, start + 0.05, end - 0.08, end], [60, 0, 0, -60]);
            const blur = useTransform(exitProgress, [0, 1], [0, 8]);
            const scale = useTransform(scrollYProgress, [start, start + 0.05, end - 0.08, end], [0.95, 1, 1, 1.05]);

            return (
              <motion.div
                key={wing.id}
                className="absolute inset-0 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-6"
                style={{ opacity, x, scale, filter: useBlurFilter(blur), pointerEvents: isActive ? 'auto' : 'none' }}
              >
                {/* Left: info */}
                <div className="flex flex-col items-start">
                  <motion.div
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isActive ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${wing.color}12`, border: `1px solid ${wing.color}25` }}
                    >
                      <Icon size={26} style={{ color: wing.color }} strokeWidth={1.4} />
                    </div>
                    <span className="text-3xs font-mono tracking-[0.25em] uppercase" style={{ color: wing.color }}>
                      Wing {String(i + 1).padStart(2, '0')} / {String(wingCount).padStart(2, '0')}
                    </span>
                  </motion.div>

                  <motion.h2
                    className="font-display font-bold tracking-display text-atelier-white mb-4"
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                  >
                    {wing.name}
                  </motion.h2>

                  <motion.p
                    className="text-base text-atelier-white-soft/50 font-light leading-relaxed max-w-md mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                  >
                    {wing.description}
                  </motion.p>

                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                  >
                    <div className="flex gap-2">
                      {wing.tags.map((tag) => (
                        <span key={tag} className="text-3xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/8 text-atelier-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-mono" style={{ color: wing.color }}>
                      {wing.count} assets
                    </span>
                  </motion.div>
                </div>

                {/* Right: floating preview thumbnails with parallax depth */}
                <div className="relative h-[300px] md:h-[400px]">
                  {[0, 1, 2].map((j) => (
                    <motion.div
                      key={j}
                      className="absolute rounded-2xl glass-card overflow-hidden"
                      style={{
                        width: 140 - j * 15,
                        height: 180 - j * 20,
                        left: `${20 + j * 25}%`,
                        top: `${10 + j * 20}%`,
                        zIndex: 3 - j,
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      animate={isActive ? { opacity: 1 - j * 0.2, scale: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.3 + j * 0.15, ease: EASE }}
                    >
                      <div className="w-full h-full flex flex-col p-3 gap-2">
                        <div className="w-full h-2/5 rounded-lg" style={{ background: `linear-gradient(135deg, ${wing.color}15 0%, ${wing.color}03 100%)` }} />
                        <div className="flex-1 flex flex-col gap-1.5">
                          <div className="h-2 w-2/3 rounded-full" style={{ background: `${wing.color}30` }} />
                          <div className="h-1.5 w-1/2 rounded-full bg-white/8" />
                          <div className="h-1.5 w-3/5 rounded-full bg-white/6" />
                          <div className="mt-auto h-6 rounded-lg" style={{ background: `${wing.color}10`, border: `1px solid ${wing.color}15` }} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress indicator — vertical light line on right */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
          {WINGS.map((_, i) => (
            <div
              key={i}
              className="w-px transition-all duration-500"
              style={{
                height: i === activeWing ? 32 : 16,
                background: i === activeWing ? WINGS[activeWing].color : 'rgba(255,255,255,0.1)',
                boxShadow: i === activeWing ? `0 0 8px ${WINGS[activeWing].color}` : 'none',
              }}
            />
          ))}
        </div>

        {/* Section label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <span className="text-3xs font-mono tracking-[0.3em] uppercase text-atelier-muted">
            The Wings
          </span>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Helper: blur filter
// ──────────────────────────────────────────────
function useBlurFilter(blurValue: MotionValue<number>) {
  const [filter, setFilter] = useState('blur(0px)');
  useEffect(() => {
    const unsub = blurValue.on('change', (v: number) => setFilter(`blur(${v}px)`));
    return () => unsub();
  }, [blurValue]);
  return filter;
}
