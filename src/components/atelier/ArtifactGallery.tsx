import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, ShoppingBag, Eye, Star,
  Figma, Code2, Palette, Smartphone, Globe, BarChart3, Layers, Brain, Zap,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { useI18n } from '@/i18n/I18nContext';
import { products } from '@/data/store';

const EASE = [0.22, 1, 0.36, 1] as const;

// Masonry layout configs — each product gets a different size/position
const LAYOUT = [
  { col: 1, row: 1, span: 2, scale: 1.0, depth: 0 },   // large
  { col: 3, row: 1, span: 1, scale: 0.9, depth: 0.3 },  // small, deeper
  { col: 4, row: 1, span: 1, scale: 0.95, depth: 0.15 },
  { col: 1, row: 3, span: 1, scale: 0.85, depth: 0.4 }, // very deep
  { col: 2, row: 3, span: 2, scale: 1.0, depth: 0.1 },  // large
  { col: 4, row: 3, span: 1, scale: 0.9, depth: 0.25 },
  { col: 1, row: 5, span: 1, scale: 0.95, depth: 0.2 },
  { col: 2, row: 5, span: 1, scale: 0.88, depth: 0.35 },
  { col: 3, row: 5, span: 2, scale: 1.0, depth: 0.05 }, // large
];

export function ArtifactGallery() {
  const { navigate } = useApp();
  const { t, isRTL } = useI18n();
  const galleryProducts = products.slice(0, 9);

  return (
    <section className="relative py-32 px-4 lg:px-6 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <motion.span
          className="inline-block text-3xs font-mono tracking-[0.3em] uppercase text-atelier-violet-soft mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {t.galleryLabel}
        </motion.span>
        <motion.h2
          className="font-display font-bold tracking-display text-atelier-white"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {t.galleryTitle1} <span className="text-gradient-trio">{t.galleryTitle2}</span>
        </motion.h2>
        <motion.p
          className="mt-4 text-base text-atelier-white-soft/50 font-light max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t.gallerySub}
        </motion.p>
      </div>

      {/* Masonry gallery — asymmetric, varying depth */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-4 gap-4" style={{ gridAutoRows: '120px' }}>
          {galleryProducts.map((product, i) => {
            const layout = LAYOUT[i] || LAYOUT[0];
            return (
              <ArtifactCard
                key={product.id}
                product={product}
                layout={layout}
                index={i}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ArtifactCard({
  product,
  layout,
  index,
  onClick,
}: {
  product: typeof products[0];
  layout: typeof LAYOUT[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = product.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      style={{
        gridColumn: `span ${layout.span > 1 ? 2 : 1}`,
        gridRow: `span ${layout.span > 1 ? 2 : 1}`,
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onClick={onClick}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden glass-card"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: layout.scale,
          opacity: 1 - layout.depth * 0.3,
          boxShadow: hovered
            ? `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${product.color}15, inset 0 1px 0 rgba(255,255,255,0.08)`
            : `0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Spotlight beam on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${product.color}20 0%, transparent 70%)`,
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Product visual */}
        <div className="relative h-full flex flex-col p-4">
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${product.color}12`, border: `1px solid ${product.color}20` }}
            >
              <Icon size={18} style={{ color: product.color }} strokeWidth={1.4} />
            </div>
            {product.bestseller && (
              <span className="text-3xs font-mono uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${product.color}15`, color: product.color }}>
                {t.bestseller}
              </span>
            )}
          </div>

          {/* Preview area — varies by span */}
          <div className="flex-1 flex flex-col justify-end">
            <motion.div
              animate={{ y: hovered ? -4 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <h3 className="text-sm font-semibold text-atelier-white mb-1">{product.name}</h3>
              <p className="text-2xs text-atelier-muted mb-2">{product.creator}</p>

              {/* Quick info — fades in on hover */}
              <motion.div
                className="flex items-center gap-3"
                animate={{ opacity: hovered ? 1 : 0.6 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-mono font-bold" style={{ color: product.color }}>
                  ${product.price}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-atelier-gold fill-atelier-gold" />
                  <span className="text-2xs text-atelier-muted">{product.rating}</span>
                </div>
              </motion.div>

              {/* Hover actions */}
              <motion.div
                className="flex items-center gap-2 mt-3"
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: hovered ? 'auto' : 'none' }}
              >
                <button className="flex items-center gap-1 text-2xs font-medium text-atelier-white-soft px-2.5 py-1.5 rounded-full glass hover:bg-white/10 transition-colors">
                  <Eye size={11} /> {t.view}
                </button>
                <button className="flex items-center gap-1 text-2xs font-medium text-white px-2.5 py-1.5 rounded-full" style={{ background: product.color, boxShadow: `0 0 15px ${product.color}40` }}>
                  <ShoppingBag size={11} /> {t.add}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Rim light on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: `1px solid ${product.color}30` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
