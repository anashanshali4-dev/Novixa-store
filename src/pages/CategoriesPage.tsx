import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories, getProductsByCategory } from '@/data/store';
import { ProductCard } from '@/components/shared/ProductCard';
import { PageHeader } from '@/components/shared/SectionHeading';
import { useApp } from '@/store/AppContext';

export function CategoriesPage() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Categories"
        subtitle="Explore our curated collections across every discipline"
        breadcrumb={['Home', 'Categories']}
      />
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pb-20 space-y-16">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const catProducts = getProductsByCategory(cat.id);
          return (
            <section key={cat.id}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}20` }}
                  >
                    <Icon size={22} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-novixa-white">{cat.name}</h2>
                    <p className="text-xs text-novixa-muted">{cat.count} products · {cat.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/category/${cat.id}`)}
                  className="flex items-center gap-1 text-xs text-novixa-muted hover:text-novixa-white transition-colors"
                >
                  View All <ArrowRight size={12} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {catProducts.slice(0, 4).map((product, j) => (
                  <ProductCard key={product.id} product={product} index={j} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function CategoryPage({ categoryId }: { categoryId: string }) {
  const { navigate } = useApp();
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return null;
  const Icon = category.icon;
  const catProducts = getProductsByCategory(categoryId);

  return (
    <div className="min-h-screen">
      <PageHeader
        title={category.name}
        subtitle={category.description}
        breadcrumb={['Home', 'Categories', category.name]}
      />
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {catProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
