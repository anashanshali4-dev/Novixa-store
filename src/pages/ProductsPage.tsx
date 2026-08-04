import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Star, Download } from 'lucide-react';
import { products, categories } from '@/data/store';
import { ProductCard } from '@/components/shared/ProductCard';
import { PageHeader } from '@/components/shared/SectionHeading';
import { Tabs } from '@/components/ui/Modal';
import { useApp } from '@/store/AppContext';

type SortKey = 'trending' | 'newest' | 'price-low' | 'price-high' | 'rating';

export function ProductsPage() {
  const { navigate } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState<SortKey>('trending');

  const filtered = useMemo(() => {
    let result = activeCategory === 'all' ? [...products] : products.filter((p) => p.category === activeCategory);
    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); break;
      default: result.sort((a, b) => b.downloads - a.downloads);
    }
    return result;
  }, [activeCategory, sort]);

  const categoryTabs = [
    { id: 'all', label: 'All Products' },
    ...categories.map((c) => ({ id: c.id, label: c.name })),
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Marketplace"
        subtitle="Discover premium digital products from creators worldwide"
        breadcrumb={['Home', 'Products']}
      />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pb-20">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <Tabs tabs={categoryTabs} active={activeCategory} onChange={setActiveCategory} className="overflow-x-auto" />
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-novixa-muted" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="glass rounded-xl px-3 py-2 text-xs text-novixa-white focus:outline-none cursor-pointer"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <p className="text-xs text-novixa-muted mb-6">{filtered.length} products found</p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
