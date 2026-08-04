import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingBag, Heart, Bell, User, Menu, X, Sun, Moon,
  Globe, Sparkles, ChevronDown, LogIn, UserPlus, LayoutDashboard,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';

const NAV_ITEMS = [
  { label: 'Products', path: '/products' },
  { label: 'Services', path: '/services' },
  { label: 'Categories', path: '/categories' },
  { label: 'AI Assistant', path: '/assistant', highlight: true },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Support', path: '/support' },
];

export function Header() {
  const {
    route, navigate, cartCount, wishlist, unreadCount, isLoggedIn,
    setSearchOpen, setCartOpen, setAiOpen, theme, toggleTheme, language,
  } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => route === path;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className="relative w-9 h-9 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-novixa-blue to-novixa-purple"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ opacity: 0.9 }}
                />
                <div className="absolute inset-[2px] rounded-[10px] bg-novixa-bg flex items-center justify-center">
                  <Sparkles size={16} className="text-novixa-blue" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tightest text-novixa-white hidden sm:block">
                NOVIXA
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative px-3 py-2 text-sm font-medium tracking-tight transition-colors rounded-lg ${
                    isActive(item.path)
                      ? 'text-novixa-white'
                      : 'text-novixa-muted hover:text-novixa-white'
                  }`}
                >
                  {item.highlight && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-novixa-blue animate-pulse" />
                  )}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 glass rounded-lg"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Search trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 glass rounded-xl px-3 py-2 text-xs text-novixa-muted hover:text-novixa-white transition-colors hidden md:flex"
              >
                <Search size={14} />
                <span className="hidden xl:inline">Search...</span>
                <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/5 text-2xs text-novixa-muted border border-white/5">
                  ⌘K
                </kbd>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-novixa-muted hover:text-novixa-white transition-colors md:hidden"
              >
                <Search size={18} />
              </button>

              {/* Language */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setLangOpen((o) => !o)}
                  className="flex items-center gap-1 p-2 text-novixa-muted hover:text-novixa-white transition-colors rounded-lg"
                >
                  <Globe size={18} />
                  <span className="text-2xs font-medium">{language}</span>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-2 glass-strong rounded-xl py-1 min-w-[120px] z-20"
                      >
                        {['EN', 'ES', 'FR', 'DE', 'JP'].map((lang) => (
                          <button
                            key={lang}
                            onClick={() => { setLangOpen(false); }}
                            className={`w-full px-3 py-1.5 text-xs text-left hover:bg-white/5 transition-colors ${language === lang ? 'text-novixa-blue' : 'text-novixa-muted'}`}
                          >
                            {lang}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-novixa-muted hover:text-novixa-white transition-colors rounded-lg hidden md:block"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* AI Assistant */}
              <button
                onClick={() => setAiOpen(true)}
                className="p-2 text-novixa-muted hover:text-novixa-blue transition-colors rounded-lg hidden md:block"
                title="AI Assistant"
              >
                <Sparkles size={18} />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => navigate('/wishlist')}
                className="relative p-2 text-novixa-muted hover:text-novixa-white transition-colors rounded-lg hidden md:block"
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-novixa-purple text-2xs text-white flex items-center justify-center font-semibold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setNotifOpen((o) => !o)}
                  className="relative p-2 text-novixa-muted hover:text-novixa-white transition-colors rounded-lg"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-novixa-blue text-2xs text-white flex items-center justify-center font-semibold">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                      <NotifDropdown onClose={() => setNotifOpen(false)} />
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-novixa-muted hover:text-novixa-white transition-colors rounded-lg"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-novixa-blue text-2xs text-white flex items-center justify-center font-semibold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Profile / Auth */}
              <div className="relative hidden md:block">
                {isLoggedIn ? (
                  <button
                    onClick={() => setProfileOpen((o) => !o)}
                    className="p-2 text-novixa-muted hover:text-novixa-white transition-colors rounded-lg"
                  >
                    <User size={18} />
                  </button>
                ) : (
                  <div className="flex items-center gap-2 ml-1">
                    <Button size="sm" variant="ghost" onClick={() => navigate('/login')} leftIcon={<LogIn size={14} />}>
                      Login
                    </Button>
                    <Button size="sm" onClick={() => navigate('/signup')} rightIcon={<UserPlus size={14} />}>
                      Sign Up
                    </Button>
                  </div>
                )}
                <AnimatePresence>
                  {profileOpen && isLoggedIn && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-2 glass-strong rounded-xl py-1 min-w-[180px] z-20"
                      >
                        {[
                          { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                          { label: 'Profile', path: '/profile', icon: User },
                          { label: 'Orders', path: '/orders', icon: ShoppingBag },
                          { label: 'Downloads', path: '/downloads', icon: Bell },
                          { label: 'Settings', path: '/settings', icon: Sun },
                        ].map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.path}
                              onClick={() => { navigate(item.path); setProfileOpen(false); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-novixa-muted hover:text-novixa-white hover:bg-white/5 transition-colors"
                            >
                              <Icon size={14} />
                              {item.label}
                            </button>
                          );
                        })}
                        <div className="border-t border-white/5 mt-1 pt-1">
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors">
                            <LogIn size={14} className="rotate-180" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 text-novixa-muted hover:text-novixa-white transition-colors lg:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function NotifDropdown({ onClose }: { onClose: () => void }) {
  const { notifications, markAllRead } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 top-full mt-2 glass-strong rounded-2xl w-80 z-20 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="text-sm font-semibold text-novixa-white">Notifications</span>
        <button onClick={markAllRead} className="text-2xs text-novixa-blue hover:text-novixa-blue-soft">
          Mark all read
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto scrollbar-hide">
        {notifications.map((n) => (
          <div key={n.id} className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${!n.read ? 'bg-novixa-blue/5' : ''}`}>
            <div className="flex items-start gap-2">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === 'success' ? 'bg-emerald-400' : n.type === 'warning' ? 'bg-amber-400' : 'bg-novixa-blue'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-novixa-white">{n.title}</p>
                <p className="text-2xs text-novixa-muted mt-0.5">{n.message}</p>
                <p className="text-2xs text-novixa-muted/60 mt-1">{n.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { navigate, isLoggedIn, setSearchOpen, setAiOpen } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] lg:hidden"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] glass-strong p-6 overflow-y-auto scrollbar-hide"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold text-novixa-white">Menu</span>
          <button onClick={onClose} className="text-novixa-muted hover:text-novixa-white">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); onClose(); }}
              className="w-full flex items-center justify-between px-3 py-3 text-sm text-novixa-muted hover:text-novixa-white hover:bg-white/5 rounded-xl transition-colors"
            >
              {item.label}
              {item.highlight && <Sparkles size={14} className="text-novixa-blue" />}
            </button>
          ))}
        </div>
        <div className="border-t border-white/5 mt-4 pt-4 space-y-1">
          <button onClick={() => { setSearchOpen(true); onClose(); }} className="w-full flex items-center gap-2 px-3 py-3 text-sm text-novixa-muted hover:text-novixa-white hover:bg-white/5 rounded-xl transition-colors">
            <Search size={16} /> Search
          </button>
          <button onClick={() => { setAiOpen(true); onClose(); }} className="w-full flex items-center gap-2 px-3 py-3 text-sm text-novixa-muted hover:text-novixa-white hover:bg-white/5 rounded-xl transition-colors">
            <Sparkles size={16} /> AI Assistant
          </button>
          <button onClick={() => { navigate('/wishlist'); onClose(); }} className="w-full flex items-center gap-2 px-3 py-3 text-sm text-novixa-muted hover:text-novixa-white hover:bg-white/5 rounded-xl transition-colors">
            <Heart size={16} /> Wishlist
          </button>
        </div>
        <div className="border-t border-white/5 mt-4 pt-4">
          {isLoggedIn ? (
            <Button fullWidth variant="secondary" onClick={() => { navigate('/dashboard'); onClose(); }} leftIcon={<LayoutDashboard size={16} />}>
              Dashboard
            </Button>
          ) : (
            <div className="space-y-2">
              <Button fullWidth onClick={() => { navigate('/signup'); onClose(); }}>Sign Up</Button>
              <Button fullWidth variant="ghost" onClick={() => { navigate('/login'); onClose(); }}>Login</Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
