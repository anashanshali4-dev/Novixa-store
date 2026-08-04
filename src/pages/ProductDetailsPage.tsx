import { motion } from 'framer-motion';
import {
  Star, Download, Heart, ShoppingBag, Check, ArrowRight, Shield, Zap,
  ChevronRight, Tag,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { getProductById, getCategoryById, getRelatedProducts } from '@/data/store';
import { ProductCard } from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui';
import { reviews } from '@/data/store';

export function ProductDetailsPage({ productId }: { productId: string }) {
  const { addToCart, toggleWishlist, isInWishlist, navigate } = useApp();
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-novixa-white mb-4">Product not found</p>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const Icon = product.icon;
  const category = getCategoryById(product.category);
  const related = getRelatedProducts(productId);
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pt-8">
        <div className="flex items-center gap-1.5 text-2xs text-novixa-muted">
          <button onClick={() => navigate('/')} className="hover:text-novixa-white">Home</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate('/products')} className="hover:text-novixa-white">Products</button>
          <ChevronRight size={10} />
          {category && (
            <button onClick={() => navigate(`/category/${category.id}`)} className="hover:text-novixa-white">{category.name}</button>
          )}
          <ChevronRight size={10} />
          <span className="text-novixa-white">{product.name}</span>
        </div>
      </div>

      {/* Product main */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-3xl p-12 flex items-center justify-center relative overflow-hidden"
            style={{ minHeight: '400px' }}
          >
            <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 50%, ${product.color}30 0%, transparent 60%)` }} />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <div
                className="w-32 h-32 rounded-3xl flex items-center justify-center"
                style={{ background: `${product.color}15`, border: `1px solid ${product.color}30`, boxShadow: `0 0 60px ${product.color}30` }}
              >
                <Icon size={64} style={{ color: product.color }} />
              </div>
            </motion.div>
            <div className="absolute top-4 left-4 flex gap-2">
              {product.bestseller && <Badge variant="warning">Bestseller</Badge>}
              {product.new && <Badge variant="success">New</Badge>}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {category && (
              <button onClick={() => navigate(`/category/${category.id}`)} className="text-xs font-medium mb-2" style={{ color: category.color }}>
                {category.name}
              </button>
            )}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tightest text-novixa-white mb-2">{product.name}</h1>
            <p className="text-sm text-novixa-muted mb-4">by {product.creator}</p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/10'} />
                ))}
                <span className="text-sm font-semibold text-novixa-white ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-novixa-muted">{product.reviews} reviews</span>
              <div className="flex items-center gap-1 text-xs text-novixa-muted">
                <Download size={12} /> {(product.downloads / 1000).toFixed(1)}k downloads
              </div>
            </div>

            <p className="text-sm text-novixa-muted font-light leading-relaxed mb-6">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span key={tag} className="glass rounded-full px-3 py-1 text-2xs text-novixa-muted">{tag}</span>
              ))}
            </div>

            {/* Price */}
            <div className="glass-card rounded-2xl p-5 mb-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-novixa-cyan">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-novixa-muted line-through">${product.originalPrice}</span>
                    <Badge variant="error">Save ${product.originalPrice - product.price}</Badge>
                  </>
                )}
              </div>
              <div className="flex gap-3">
                <Button fullWidth size="lg" onClick={() => addToCart(product)} leftIcon={<ShoppingBag size={18} />}>
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant={inWishlist ? 'secondary' : 'outline'}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} className={inWishlist ? 'text-novixa-purple' : ''} />
                </Button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: '14-Day Guarantee', color: '#10B981' },
                { icon: Zap, label: 'Instant Download', color: '#22D3EE' },
                { icon: Check, label: 'AI Verified', color: '#0099FF' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="glass rounded-xl p-3 text-center">
                    <Icon size={18} style={{ color: item.color }} className="mx-auto mb-1.5" />
                    <p className="text-2xs text-novixa-muted">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tightest text-novixa-white mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.slice(0, 3).map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-novixa-blue/20 to-novixa-purple/20 border border-white/10 flex items-center justify-center text-2xs font-semibold text-novixa-white">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-novixa-white">{review.author}</p>
                    <p className="text-2xs text-novixa-muted">{review.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={10} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-novixa-muted font-light leading-relaxed">"{review.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tightest text-novixa-white">Related Products</h2>
              <Button variant="ghost" onClick={() => navigate('/products')} rightIcon={<ArrowRight size={16} />}>View All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
