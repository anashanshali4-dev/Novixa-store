import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingBag, Heart, Menu, X, Sparkles, LayoutDashboard, User, Languages,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { useI18n } from '@/i18n/I18nContext';

export function Header() {
  const {
    route, navigate, cartCount, wishlist, isLoggedIn,
    setSearchOpen, setCartOpen, setAiOpen,
  } = useApp();
  const { t, lang, toggleLang, isRTL } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_ITEMS = [
    { label: t.navGallery, path: '/products' },
    { label: t.navWings, path: '/categories' },
    { label: t.navServices, path: '/services' },
    { label: t.navPricing, path: '/pricing' },
    { label: t.navAbout, path: '/about' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => route === path;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 30 }}
        className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div
          className={`flex items-center gap-1 rounded-full transition-all duration-700 ${
            scrolled
              ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-2 py-2'
              : 'bg-transparent px-3 py-2'
          }`}
          style={scrolled ? { border: '1px solid rgba(123,92,255,0.12)' } : {}}
        >
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group shrink-0 pl-2 pr-1"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-atelier-violet via-atelier-cyan to-atelier-gold" style={{ filter: 'blur(1px)' }} />
              <div className="absolute inset-[1.5px] rounded-[7px] bg-atelier-void flex items-center justify-center">
                <Sparkles size={13} className="text-atelier-violet-soft" />
              </div>
            </div>
            <span className="text-sm font-bold tracking-tightest text-atelier-white font-display hidden sm:block pr-1">
              NOVIXA
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative px-3.5 py-2 text-xs font-medium tracking-wide rounded-full transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-atelier-white'
                    : 'text-atelier-muted hover:text-atelier-white'
                }`}
              >
                {isActive(item.path) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(123,92,255,0.1)', border: '1px solid rgba(123,92,255,0.15)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-0.5">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 p-2 text-atelier-muted hover:text-atelier-white transition-colors rounded-full hover:bg-white/5"
              title={lang === 'en' ? 'العربية' : 'English'}
            >
              <Languages size={16} />
              <span className="text-2xs font-mono font-semibold">{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-atelier-muted hover:text-atelier-white transition-colors rounded-full hover:bg-white/5"
            >
              <Search size={16} />
            </button>

            {/* AI */}
            <button
              onClick={() => setAiOpen(true)}
              className="p-2 text-atelier-muted hover:text-atelier-violet-soft transition-colors rounded-full hover:bg-white/5"
              title={t.navAI}
            >
              <Sparkles size={16} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigate('/wishlist')}
              className="relative p-2 text-atelier-muted hover:text-atelier-white transition-colors rounded-full hover:bg-white/5 hidden md:block"
            >
              <Heart size={16} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-atelier-violet text-3xs text-white flex items-center justify-center font-semibold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-atelier-muted hover:text-atelier-white transition-colors rounded-full hover:bg-white/5"
            >
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-atelier-violet text-3xs text-white flex items-center justify-center font-semibold"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-1 ml-1 pl-2 border-l border-white/8">
              {isLoggedIn ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="p-2 text-atelier-muted hover:text-atelier-white transition-colors rounded-full hover:bg-white/5"
                >
                  <User size={16} />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-3 py-1.5 text-xs font-medium text-atelier-white-soft hover:text-atelier-white transition-colors rounded-full"
                  >
                    {t.navLogin}
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-3.5 py-1.5 text-xs font-medium text-white rounded-full transition-all duration-500"
                    style={{ background: 'linear-gradient(135deg, #7B5CFF, #5B3DDB)', boxShadow: '0 0 15px rgba(123,92,255,0.2)' }}
                  >
                    {t.navSignup}
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-atelier-muted hover:text-atelier-white transition-colors rounded-full hover:bg-white/5 lg:hidden ml-1"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { navigate, isLoggedIn, setSearchOpen, setAiOpen } = useApp();
  const { t, lang, toggleLang, isRTL } = useI18n();

  const NAV_ITEMS = [
    { label: t.navGallery, path: '/products' },
    { label: t.navWings, path: '/categories' },
    { label: t.navServices, path: '/services' },
    { label: t.navPricing, path: '/pricing' },
    { label: t.navAbout, path: '/about' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] lg:hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 bg-atelier-void/80 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute top-20 inset-x-4 glass-strong rounded-3xl p-6 overflow-hidden"
        style={{ border: '1px solid rgba(123,92,255,0.12)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-bold text-atelier-white font-display">
            {lang === 'en' ? 'Menu' : 'القائمة'}
          </span>
          <button onClick={onClose} className="text-atelier-muted hover:text-atelier-white">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-1">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => { navigate(item.path); onClose(); }}
              className="w-full flex items-center justify-between px-3 py-3 text-sm text-atelier-muted hover:text-atelier-white hover:bg-white/5 rounded-xl transition-colors"
            >
              {item.label}
            </motion.button>
          ))}
        </div>
        <div className="border-t border-white/5 mt-4 pt-4 space-y-1">
          <button onClick={() => { setSearchOpen(true); onClose(); }} className="w-full flex items-center gap-2 px-3 py-3 text-sm text-atelier-muted hover:text-atelier-white hover:bg-white/5 rounded-xl transition-colors">
            <Search size={15} /> {t.navSearch}
          </button>
          <button onClick={() => { setAiOpen(true); onClose(); }} className="w-full flex items-center gap-2 px-3 py-3 text-sm text-atelier-muted hover:text-atelier-white hover:bg-white/5 rounded-xl transition-colors">
            <Sparkles size={15} /> {t.navAI}
          </button>
          <button onClick={() => { toggleLang(); }} className="w-full flex items-center gap-2 px-3 py-3 text-sm text-atelier-muted hover:text-atelier-white hover:bg-white/5 rounded-xl transition-colors">
            <Languages size={15} /> {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
        <div className="border-t border-white/5 mt-4 pt-4">
          {isLoggedIn ? (
            <button onClick={() => { navigate('/dashboard'); onClose(); }} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-atelier-violet/10 text-atelier-white text-sm font-medium">
              <LayoutDashboard size={15} /> {t.navDashboard}
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => { navigate('/login'); onClose(); }} className="flex-1 py-3 rounded-xl glass text-sm text-atelier-white">{t.navLogin}</button>
              <button onClick={() => { navigate('/signup'); onClose(); }} className="flex-1 py-3 rounded-xl bg-atelier-violet text-white text-sm font-medium">{t.navSignup}</button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
