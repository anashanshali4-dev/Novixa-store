import { useRef, type ReactNode } from 'react';
import { motion, useScroll, type MotionValue } from 'framer-motion';

interface ScrollSectionProps {
  children: (scrollProgress: MotionValue<number>) => ReactNode;
  height?: string;
  className?: string;
  glowColor?: string;
}

export function ScrollSection({
  children,
  height = '250vh',
  className = '',
  glowColor = 'rgba(0,153,255,0.08)',
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={ref} className="relative" style={{ height }}>
      <div className={`sticky top-0 h-screen w-full overflow-hidden ${className}`}>
        {/* Ambient section glow that shifts with scroll */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${glowColor} 0%, transparent 70%)`,
          }}
        />
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
