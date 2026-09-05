import { useEffect, useState, useRef, type ReactNode } from 'react';
import { useI18n } from '@/i18n/I18nContext';

// ──────────────────────────────────────────────
// Custom Cursor — glowing dot + trailing ring
// ──────────────────────────────────────────────
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;
    setEnabled(true);
    document.body.classList.add('cursor-none-desktop');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"], input, [data-cursor="hover"]')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove('cursor-none-desktop');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ marginLeft: -4, marginTop: -4 }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: 8, height: 8,
            background: '#7B5CFF',
            boxShadow: '0 0 10px rgba(123,92,255,0.6)',
          }}
        />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ marginLeft: -16, marginTop: -16 }}
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            marginLeft: hovering ? -12 : 0,
            marginTop: hovering ? -12 : 0,
            borderColor: hovering ? 'rgba(63,224,208,0.4)' : 'rgba(123,92,255,0.25)',
            borderWidth: 1,
          }}
        />
      </div>
    </>
  );
}

// ──────────────────────────────────────────────
// Magnetic Button — pulls toward cursor
// ──────────────────────────────────────────────
export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  strength = 0.3,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'outline';
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  const styles = {
    primary: 'bg-atelier-violet text-white shadow-glow-violet hover:shadow-[0_0_50px_rgba(123,92,255,0.35)]',
    ghost: 'text-atelier-white-soft hover:text-atelier-white',
    outline: 'border border-atelier-violet/30 text-atelier-white hover:border-atelier-violet/60 hover:bg-atelier-violet/5',
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ease-out ${styles[variant]} ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </button>
  );
}

// ──────────────────────────────────────────────
// Portal Loader — thin glowing line draws a circle
// ──────────────────────────────────────────────
export function PortalLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const { t, isRTL } = useI18n();

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);
      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 200);
        setTimeout(onComplete, 800);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-atelier-void flex items-center justify-center transition-all duration-700"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.1)' : 'scale(1)',
        clipPath: exiting ? 'circle(150% at 50% 50%)' : 'circle(150% at 50% 50%)',
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative flex flex-col items-center">
        <svg width="120" height="120" viewBox="0 0 120 120" className="overflow-visible">
          <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <circle
            cx="60" cy="60" r="56" fill="none"
            stroke="url(#portal-grad)" strokeWidth="2" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 56}
            strokeDashoffset={2 * Math.PI * 56 * (1 - progress)}
            transform="rotate(-90 60 60)"
            style={{ filter: 'drop-shadow(0 0 8px rgba(123,92,255,0.5))' }}
          />
          <defs>
            <linearGradient id="portal-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7B5CFF" />
              <stop offset="50%" stopColor="#3FE0D0" />
              <stop offset="100%" stopColor="#FFC15E" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-6 flex items-center gap-2">
          <span className="text-3xs font-mono text-atelier-muted tracking-[0.3em] uppercase">
            {t.loaderText}
          </span>
          <span className="text-3xs font-mono text-atelier-violet-soft">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
