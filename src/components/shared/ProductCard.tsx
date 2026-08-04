import { motion } from 'framer-motion';
import { Heart, Star, Download, ShoppingBag } from 'lucide-react';
import type { Product } from '@/data/store';
import { useApp } from '@/store/AppContext';
import { Badge } from '@/components/ui';
import { getCategoryById } from '@/data/store';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, navigate } = useApp();
  const Icon = product.icon;
  const category = getCategoryById(product.category);
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group relative"
    >
      {/* Image area */}
      <div
        className="h-36 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${product.color}15 0%, transparent 70%)` }}
      >
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 50%, ${product.color}20 0%, transparent 60%)` }} />
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative z-10"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: `${product.color}15`, border: `1px solid ${product.color}30` }}
          >
            <Icon size={28} style={{ color: product.color }} />
          </div>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {product.bestseller && <Badge variant="warning" size="sm">Bestseller</Badge>}
          {product.new && <Badge variant="success" size="sm">New</Badge>}
          {product.originalPrice && (
            <Badge variant="error" size="sm">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
            inWishlist ? 'bg-novixa-purple/20 text-novixa-purple' : 'glass text-novixa-muted hover:text-novixa-white'
          }`}
        >
          <Heart size={14} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <div className="flex items-center gap-1.5 mb-1">
          {category && (
            <span className="text-2xs font-medium" style={{ color: category.color }}>
              {category.name}
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-novixa-white mb-0.5 truncate">{product.name}</h3>
        <p className="text-2xs text-novixa-muted mb-2">{product.creator}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <span className="text-2xs font-medium text-novixa-white">{product.rating}</span>
          </div>
          <span className="text-2xs text-novixa-muted">({product.reviews})</span>
          <div className="flex items-center gap-0.5 ml-auto">
            <Download size={10} className="text-novixa-muted" />
            <span className="text-2xs text-novixa-muted">{(product.downloads / 1000).toFixed(1)}k</span>
          </div>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-novixa-cyan">${product.price}</span>
            {product.originalPrice && (
              <span className="text-2xs text-novixa-muted line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="w-8 h-8 rounded-lg bg-gradient-to-r from-novixa-blue to-novixa-purple flex items-center justify-center text-white hover:scale-105 transition-transform"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
