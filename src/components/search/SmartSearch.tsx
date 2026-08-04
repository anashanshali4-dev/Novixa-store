import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { products, categories } from '@/data/store';

const TRENDING_SEARCHES = ['React components', 'Figma UI Kit', 'AI prompts', 'Canva templates', 'Dashboard'];
const RECENT_SEARCHES = ['Nebula UI Kit', 'Auth system', 'Mobile kit'];

export function SmartSearch() {
  const { searchOpen, setSearchOpen, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setActiveIndex(0);
    }
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const matchedCategories = useMemo(() => {
    if (!query.trim()) return [];
    return categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!searchOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length + matchedCategories.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[activeIndex]) {
          navigate(`/product/${results[activeIndex].id}`);
          setSearchOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchOpen, results, matchedCategories, activeIndex, navigate, setSearchOpen]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[10vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setSearchOpen(false)} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl glass-strong rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <Search size={20} className="text-novixa-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, or ask AI..."
                className="flex-1 bg-transparent text-base text-novixa-white placeholder:text-novixa-muted focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-lg text-novixa-muted hover:text-novixa-white hover:bg-white/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
              {query.trim() === '' ? (
                <div className="p-5 space-y-5">
                  {/* AI search prompt */}
                  <div className="glass rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-novixa-blue/30 transition-colors border border-transparent">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-novixa-blue/20 to-novixa-purple/20 flex items-center justify-center">
                      <Sparkles size={18} className="text-novixa-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-novixa-white">Ask AI Assistant</p>
                      <p className="text-xs text-novixa-muted">Search with natural language powered by AI</p>
                    </div>
                    <ArrowRight size={16} className="text-novixa-muted" />
                  </div>

                  {/* Trending */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <TrendingUp size={12} className="text-novixa-muted" />
                      <span className="text-2xs font-semibold uppercase tracking-ultra text-novixa-muted">Trending</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_SEARCHES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="glass rounded-full px-3 py-1.5 text-xs text-novixa-muted hover:text-novixa-white hover:border-white/20 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <Clock size={12} className="text-novixa-muted" />
                      <span className="text-2xs font-semibold uppercase tracking-ultra text-novixa-muted">Recent</span>
                    </div>
                    <div className="space-y-1">
                      {RECENT_SEARCHES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-novixa-muted hover:text-novixa-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Clock size={12} />
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length === 0 && matchedCategories.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-sm text-novixa-muted">No results for "{query}"</p>
                  <button className="mt-3 text-xs text-novixa-blue hover:text-novixa-blue-soft">
                    Ask AI about "{query}"
                  </button>
                </div>
              ) : (
                <div className="p-3">
                  {/* Categories */}
                  {matchedCategories.length > 0 && (
                    <div className="mb-2">
                      <span className="text-2xs font-semibold uppercase tracking-ultra text-novixa-muted px-2">Categories</span>
                      {matchedCategories.map((cat, i) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => { navigate(`/category/${cat.id}`); setSearchOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${activeIndex === i ? 'bg-white/5' : 'hover:bg-white/5'}`}
                          >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}15` }}>
                              <Icon size={14} style={{ color: cat.color }} />
                            </div>
                            <span className="text-sm text-novixa-white">{cat.name}</span>
                            <span className="text-2xs text-novixa-muted ml-auto">{cat.count} items</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Products */}
                  {results.length > 0 && (
                    <div>
                      <span className="text-2xs font-semibold uppercase tracking-ultra text-novixa-muted px-2">Products</span>
                      {results.map((product, i) => {
                        const Icon = product.icon;
                        const idx = matchedCategories.length + i;
                        return (
                          <button
                            key={product.id}
                            onClick={() => { navigate(`/product/${product.id}`); setSearchOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${activeIndex === idx ? 'bg-white/5' : 'hover:bg-white/5'}`}
                          >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${product.color}15`, border: `1px solid ${product.color}20` }}>
                              <Icon size={16} style={{ color: product.color }} />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <p className="text-sm font-medium text-novixa-white truncate">{product.name}</p>
                              <p className="text-2xs text-novixa-muted truncate">{product.creator} · {product.tags.join(', ')}</p>
                            </div>
                            <span className="text-sm font-semibold text-novixa-cyan shrink-0">${product.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 text-2xs text-novixa-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">↵</kbd> Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">Esc</kbd> Close
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Sparkles size={10} className="text-novixa-blue" />
                AI-powered search
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
