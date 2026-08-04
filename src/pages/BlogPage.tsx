import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/data/store';
import { PageHeader } from '@/components/shared/SectionHeading';
import { useApp } from '@/store/AppContext';
import { Badge } from '@/components/ui';

export function BlogPage() {
  const { navigate } = useApp();
  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Blog"
        subtitle="Insights on design, development, AI, and the future of digital products"
        breadcrumb={['Home', 'Blog']}
      />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 pb-20">
        {/* Featured post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => navigate(`/blog/${featured.id}`)}
          className="glass-card rounded-3xl p-8 mb-8 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 30% 50%, ${featured.color}30 0%, transparent 50%)` }} />
          <div className="relative flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <Badge variant="info" className="mb-3">Featured</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-novixa-white mb-3 group-hover:text-gradient-accent transition-all">{featured.title}</h2>
              <p className="text-sm text-novixa-muted font-light mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-2xs text-novixa-muted">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {featured.readTime}</span>
              </div>
            </div>
            <div className="md:w-1/2 h-40 rounded-2xl" style={{ background: `linear-gradient(135deg, ${featured.color}20 0%, transparent 70%)` }} />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="glass-card rounded-2xl p-5 cursor-pointer group"
            >
              <div className="h-32 rounded-xl mb-4" style={{ background: `linear-gradient(135deg, ${post.color}20 0%, transparent 70%)` }} />
              <Badge variant="purple" size="sm" className="mb-2">{post.category}</Badge>
              <h3 className="text-base font-semibold text-novixa-white mb-2 group-hover:text-novixa-blue transition-colors">{post.title}</h3>
              <p className="text-xs text-novixa-muted font-light mb-3 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between text-2xs text-novixa-muted">
                <span>{post.author}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogArticlePage({ postId }: { postId: string }) {
  const { navigate } = useApp();
  const post = blogPosts.find((p) => p.id === postId);
  if (!post) return null;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[800px] mx-auto px-4 lg:px-6 py-12">
        <button onClick={() => navigate('/blog')} className="text-xs text-novixa-muted hover:text-novixa-white mb-6 flex items-center gap-1">
          ← Back to Blog
        </button>
        <Badge variant="purple" className="mb-4">{post.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tightest text-novixa-white mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 text-xs text-novixa-muted mb-8">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} read</span>
        </div>
        <div className="h-60 rounded-3xl mb-8" style={{ background: `linear-gradient(135deg, ${post.color}20 0%, transparent 70%)` }} />
        <div className="prose prose-invert max-w-none">
          <p className="text-sm text-novixa-muted font-light leading-relaxed mb-4">{post.excerpt}</p>
          <p className="text-sm text-novixa-muted font-light leading-relaxed mb-4">
            The digital product landscape is undergoing a fundamental shift. Traditional marketplaces — static grids of products waiting to be discovered — are being replaced by intelligent, living ecosystems that actively organize, verify, and deliver products to the right customers at the right time.
          </p>
          <p className="text-sm text-novixa-muted font-light leading-relaxed mb-4">
            At the heart of this transformation is artificial intelligence. Not as a feature, but as the core infrastructure that powers every interaction — from product discovery to organization to delivery. AI scans and verifies every product, organizes them into categories, and helps customers find exactly what they need through natural language search.
          </p>
          <p className="text-sm text-novixa-muted font-light leading-relaxed mb-4">
            The future belongs to platforms that understand this shift. Platforms that don't just display products, but actively participate in the flow of digital commerce. Platforms where every animation, every interaction, every movement teaches the visitor something new.
          </p>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5">
          <h3 className="text-base font-semibold text-novixa-white mb-4">More Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogPosts.filter((p) => p.id !== postId).slice(0, 2).map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/blog/${p.id}`)}
                className="glass-card rounded-2xl p-4 text-left group"
              >
                <p className="text-sm font-semibold text-novixa-white group-hover:text-novixa-blue transition-colors mb-1">{p.title}</p>
                <p className="text-2xs text-novixa-muted">{p.author} · {p.readTime}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
