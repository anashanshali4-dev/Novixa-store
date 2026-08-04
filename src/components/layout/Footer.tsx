import { motion } from 'framer-motion';
import { Sparkles, Twitter, Github, Linkedin, Youtube } from 'lucide-react';
import { useApp } from '@/store/AppContext';

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { label: 'Marketplace', path: '/products' },
      { label: 'Categories', path: '/categories' },
      { label: 'Services', path: '/services' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'AI Assistant', path: '/assistant' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/about' },
      { label: 'Blog', path: '/blog' },
      { label: 'Contact', path: '/contact' },
      { label: 'Support', path: '/support' },
      { label: 'FAQ', path: '/faq' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Wishlist', path: '/wishlist' },
      { label: 'Orders', path: '/orders' },
      { label: 'Downloads', path: '/downloads' },
      { label: 'Settings', path: '/settings' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Security', path: '/privacy' },
      { label: 'Admin', path: '/admin' },
    ],
  },
];

const SOCIAL = [Twitter, Github, Linkedin, Youtube];

export function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="relative mt-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-12">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2">
            <button onClick={() => navigate('/')} className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-novixa-blue to-novixa-purple" />
                <div className="absolute inset-[2px] rounded-[10px] bg-novixa-bg flex items-center justify-center">
                  <Sparkles size={16} className="text-novixa-blue" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tightest text-novixa-white">NOVIXA</span>
            </button>
            <p className="text-sm text-novixa-muted font-light max-w-xs mb-4">
              The living digital ecosystem where creators and customers connect through premium products.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL.map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-novixa-muted hover:text-novixa-white hover:border-white/20 transition-colors"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-novixa-white mb-3 tracking-wide">{col.title}</h4>
              <div className="space-y-2">
                {col.links.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.path)}
                    className="block text-xs text-novixa-muted hover:text-novixa-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-2xs text-novixa-muted">© 2026 Novixa. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-2xs text-novixa-muted">Powered by multi-model AI</span>
            <div className="flex items-center gap-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-2xs text-novixa-muted">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
