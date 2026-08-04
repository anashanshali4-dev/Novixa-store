import {
  Figma, Palette, Code2, Brain, Globe, Smartphone, PenTool, Layers,
  Zap, Shield, Sparkles, BarChart3, type LucideIcon,
} from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  creator: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  downloads: number;
  icon: LucideIcon;
  color: string;
  tags: string[];
  description: string;
  featured?: boolean;
  bestseller?: boolean;
  new?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  count: number;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  price: string;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  color: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export const categories: Category[] = [
  { id: 'design', name: 'Design', icon: PenTool, color: '#A259FF', count: 1240, description: 'UI Kits, templates, icons, and design systems' },
  { id: 'development', name: 'Development', icon: Code2, color: '#22D3EE', count: 980, description: 'React components, full-stack templates, APIs' },
  { id: 'ai', name: 'AI Tools', icon: Brain, color: '#7C3AED', count: 540, description: 'AI prompts, workflows, and automation tools' },
  { id: 'templates', name: 'Templates', icon: Palette, color: '#00C7CC', count: 1820, description: 'Canva, Notion, Figma, and web templates' },
  { id: 'mobile', name: 'Mobile', icon: Smartphone, color: '#0099FF', count: 620, description: 'Mobile app UI kits and components' },
  { id: 'web', name: 'Web', icon: Globe, color: '#10B981', count: 890, description: 'Website templates, landing pages, dashboards' },
];

export const products: Product[] = [
  { id: 'p1', name: 'Nebula UI Kit', creator: 'Studio Forma', category: 'design', price: 49, originalPrice: 79, rating: 4.9, reviews: 328, downloads: 12400, icon: Figma, color: '#A259FF', tags: ['Figma', 'UI Kit', 'Dark Mode'], description: 'A premium Figma UI kit with 200+ components, dark mode support, and auto-layout.', featured: true, bestseller: true },
  { id: 'p2', name: 'Quantum React Kit', creator: 'DevSphere', category: 'development', price: 79, originalPrice: 129, rating: 4.8, reviews: 214, downloads: 8900, icon: Code2, color: '#22D3EE', tags: ['React', 'TypeScript', 'Tailwind'], description: 'Production-ready React component library with 80+ components and full TypeScript support.', featured: true, bestseller: true },
  { id: 'p3', name: 'Prompt Engineering Pack', creator: 'AI Labs', category: 'ai', price: 29, rating: 4.7, reviews: 156, downloads: 6700, icon: Brain, color: '#7C3AED', tags: ['AI', 'Prompts', 'ChatGPT'], description: '500+ curated AI prompts for content, code, marketing, and productivity workflows.', featured: true, new: true },
  { id: 'p4', name: 'Aurora Canva Pack', creator: 'Design Hub', category: 'templates', price: 39, originalPrice: 59, rating: 4.9, reviews: 412, downloads: 18900, icon: Palette, color: '#00C7CC', tags: ['Canva', 'Social Media', 'Branding'], description: '300+ Canva templates for social media, presentations, and brand kits.', bestseller: true },
  { id: 'p5', name: 'Pulse Mobile Kit', creator: 'Mobile Co', category: 'mobile', price: 59, originalPrice: 89, rating: 4.6, reviews: 98, downloads: 4200, icon: Smartphone, color: '#0099FF', tags: ['Mobile', 'iOS', 'Android'], description: 'Complete mobile UI kit for iOS and Android with 150+ screens.', new: true },
  { id: 'p6', name: 'Vertex Dashboard', creator: 'DataFlow', category: 'web', price: 69, originalPrice: 99, rating: 4.8, reviews: 187, downloads: 7300, icon: BarChart3, color: '#10B981', tags: ['Dashboard', 'Analytics', 'Next.js'], description: 'Full analytics dashboard template with charts, tables, and dark mode.', featured: true },
  { id: 'p7', name: 'Flux Icon System', creator: 'Icon Lab', category: 'design', price: 19, rating: 4.9, reviews: 521, downloads: 22100, icon: Layers, color: '#A259FF', tags: ['Icons', 'SVG', 'System'], description: '1000+ pixel-perfect icons in SVG, Figma, and icon font formats.', bestseller: true },
  { id: 'p8', name: 'Nova Landing Kit', creator: 'WebCraft', category: 'web', price: 45, originalPrice: 65, rating: 4.7, reviews: 143, downloads: 5600, icon: Globe, color: '#10B981', tags: ['Landing', 'Next.js', 'Tailwind'], description: '12 conversion-optimized landing page templates built with Next.js and Tailwind.', new: true },
  { id: 'p9', name: 'Cipher Auth System', creator: 'SecureDev', category: 'development', price: 89, rating: 4.8, reviews: 76, downloads: 3100, icon: Shield, color: '#22D3EE', tags: ['Auth', 'Security', 'React'], description: 'Complete authentication system with OAuth, 2FA, and role management.', featured: true },
  { id: 'p10', name: 'Spark AI Workflow', creator: 'AI Labs', category: 'ai', price: 55, originalPrice: 75, rating: 4.6, reviews: 92, downloads: 4800, icon: Zap, color: '#7C3AED', tags: ['AI', 'Automation', 'Workflow'], description: 'Visual AI workflow builder with 30+ pre-built automation templates.' },
  { id: 'p11', name: 'Prism Brand Kit', creator: 'Studio Forma', category: 'design', price: 35, rating: 4.9, reviews: 267, downloads: 9800, icon: Sparkles, color: '#A259FF', tags: ['Branding', 'Logo', 'Guidelines'], description: 'Complete brand identity kit with logos, color systems, and guidelines.' },
  { id: 'p12', name: 'Momentum Notion Pack', creator: 'Productivity', category: 'templates', price: 25, originalPrice: 39, rating: 4.7, reviews: 189, downloads: 13400, icon: Palette, color: '#00C7CC', tags: ['Notion', 'Templates', 'Productivity'], description: '50+ Notion templates for project management, CRM, and personal productivity.' },
];

export const services: Service[] = [
  { id: 's1', name: 'Custom UI Design', description: 'Bespoke UI design crafted by award-winning designers for your product.', icon: PenTool, color: '#A259FF', price: 'From $2,500', features: ['Custom design system', 'Unlimited revisions', 'Figma source files', 'Design handoff'] },
  { id: 's2', name: 'Full-Stack Development', description: 'End-to-end development with React, Next.js, and modern infrastructure.', icon: Code2, color: '#22D3EE', price: 'From $5,000', features: ['React / Next.js', 'API development', 'Database design', 'Deployment setup'] },
  { id: 's3', name: 'AI Integration', description: 'Integrate AI capabilities into your product with multi-model support.', icon: Brain, color: '#7C3AED', price: 'From $3,000', features: ['Multi-model routing', 'Prompt engineering', 'Custom workflows', 'Performance tuning'] },
  { id: 's4', name: 'Brand Strategy', description: 'Complete brand identity and strategy for digital-first companies.', icon: Sparkles, color: '#00C7CC', price: 'From $4,000', features: ['Brand strategy', 'Visual identity', 'Brand guidelines', 'Asset library'] },
];

export const blogPosts: BlogPost[] = [
  { id: 'b1', title: 'The Future of Digital Product Marketplaces', excerpt: 'How AI is transforming the way digital products are discovered, verified, and delivered.', author: 'Sarah Chen', date: 'Aug 1, 2026', readTime: '8 min', category: 'Industry', color: '#0099FF' },
  { id: 'b2', title: 'Building a Multi-Model AI Architecture', excerpt: 'A deep dive into designing AI systems that can switch between GPT, Claude, and Gemini seamlessly.', author: 'Marcus Reid', date: 'Jul 28, 2026', readTime: '12 min', category: 'Engineering', color: '#7C3AED' },
  { id: 'b3', title: 'Design Systems That Scale', excerpt: 'How to create a design system that grows with your product without becoming a maintenance burden.', author: 'Lena Park', date: 'Jul 24, 2026', readTime: '10 min', category: 'Design', color: '#A259FF' },
  { id: 'b4', title: 'Why Performance Is a Feature', excerpt: 'The business case for investing in performance and how it impacts conversion rates.', author: 'David Kim', date: 'Jul 20, 2026', readTime: '6 min', category: 'Engineering', color: '#22D3EE' },
  { id: 'b5', title: 'The Anatomy of a Premium Product Card', excerpt: 'Breaking down the design patterns behind product cards that convert browsers into buyers.', author: 'Sarah Chen', date: 'Jul 16, 2026', readTime: '7 min', category: 'Design', color: '#00C7CC' },
  { id: 'b6', title: 'AI-Powered Search: Beyond Keywords', excerpt: 'How semantic search and AI are replacing traditional keyword-based product discovery.', author: 'Marcus Reid', date: 'Jul 12, 2026', readTime: '9 min', category: 'AI', color: '#7C3AED' },
];

export const reviews: Review[] = [
  { id: 'r1', author: 'Alex Morgan', role: 'Product Designer @ Linear', content: 'Novixa completely changed how our team sources design assets. The AI organization saves us hours every week.', rating: 5, avatar: 'AM' },
  { id: 'r2', author: 'Jin Park', role: 'Founder @ Stackwise', content: 'The quality of products on Novixa is unmatched. Every purchase feels premium and the checkout is buttery smooth.', rating: 5, avatar: 'JP' },
  { id: 'r3', author: 'Maya Patel', role: 'Lead Developer @ Flowbase', content: 'We bought 12 React component kits from Novixa. The code quality is exceptional and saved us months of development.', rating: 5, avatar: 'MP' },
  { id: 'r4', author: 'Tom Wright', role: 'Creative Director @ Form', content: 'The AI assistant helped me find exactly what I needed in seconds. This is the future of digital marketplaces.', rating: 5, avatar: 'TW' },
  { id: 'r5', author: 'Sara Lee', role: 'Marketing Lead @ Notion', content: 'From Canva templates to AI prompts, Novixa has become our go-to resource. The download experience is delightful.', rating: 5, avatar: 'SL' },
  { id: 'r6', author: 'Chris Vega', role: 'Indie Developer', content: 'I sold my first UI kit on Novixa and made $4,000 in the first month. The creator experience is incredible.', rating: 5, avatar: 'CV' },
];

export const stats = [
  { label: 'Active Products', value: '12,400+', color: '#0099FF' },
  { label: 'Happy Customers', value: '89,000+', color: '#7C3AED' },
  { label: 'Total Downloads', value: '2.4M+', color: '#22D3EE' },
  { label: 'Creator Earnings', value: '$4.2M+', color: '#A259FF' },
];

export const clientLogos = ['Linear', 'Notion', 'Vercel', 'Stripe', 'Framer', 'Supabase', 'Raycast', 'Arc'];

export const faqs = [
  { q: 'What is Novixa?', a: 'Novixa is a living digital ecosystem where creators sell and customers discover premium digital products — from UI kits and React components to AI prompts and templates.' },
  { q: 'How do I purchase a product?', a: 'Simply add products to your cart, proceed to checkout, and complete your purchase. You\'ll get instant access to your downloads in your dashboard.' },
  { q: 'Can I sell my own products?', a: 'Yes! Become a creator, upload your products, and start earning. We handle payments, delivery, and AI-powered organization automatically.' },
  { q: 'What payment methods do you support?', a: 'We support all major credit cards, Apple Pay, and Google Pay. Additional payment methods are being added continuously.' },
  { q: 'Is there a money-back guarantee?', a: 'Yes. Every purchase is backed by our 14-day money-back guarantee. If you\'re not satisfied, contact support for a full refund.' },
  { q: 'How does the AI assistant work?', a: 'Our AI assistant can search products, explain features, compare options, and guide you to the perfect product. It supports multiple AI models for the best results.' },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return products.slice(0, limit);
  return products.filter((p) => p.category === product.category && p.id !== productId).slice(0, limit);
}
