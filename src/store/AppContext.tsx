import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '@/data/store';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  read: boolean;
  time: string;
}

interface AppState {
  // Router
  route: string;
  navigate: (path: string) => void;

  // Cart
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  coupon: string | null;
  applyCoupon: (code: string) => boolean;
  discount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  notify: (n: Omit<Notification, 'id' | 'read' | 'time'>) => void;

  // Search
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // AI Assistant
  aiOpen: boolean;
  setAiOpen: (open: boolean) => void;

  // Auth (simulated)
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Language
  language: string;
  setLanguage: (lang: string) => void;
}

const AppContext = createContext<AppState | null>(null);

const COUPONS: Record<string, number> = {
  NOVIXA10: 0.1,
  WELCOME20: 0.2,
  PREMIUM30: 0.3,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState('/');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(['p2', 'p7']);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'n1', title: 'New AI Features', message: 'Multi-model AI assistant is now live', type: 'info', read: false, time: '2h ago' },
    { id: 'n2', title: 'Flash Sale', message: '30% off all React components this week', type: 'warning', read: false, time: '5h ago' },
    { id: 'n3', title: 'Download Ready', message: 'Your Nebula UI Kit is ready to download', type: 'success', read: true, time: '1d ago' },
  ]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('EN');
  const [coupon, setCoupon] = useState<string | null>(null);

  const navigate = useCallback((path: string) => {
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const discount = coupon ? cartTotal * (COUPONS[coupon] || 0) : 0;

  const applyCoupon = useCallback((code: string) => {
    const upper = code.toUpperCase();
    if (COUPONS[upper]) {
      setCoupon(upper);
      return true;
    }
    return false;
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const notify = useCallback((n: Omit<Notification, 'id' | 'read' | 'time'>) => {
    const id = `n${Date.now()}`;
    setNotifications((prev) => [{ ...n, id, read: false, time: 'Just now' }, ...prev]);
  }, []);

  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const value: AppState = {
    route, navigate,
    cart, cartOpen, setCartOpen, addToCart, removeFromCart, updateQuantity, clearCart,
    cartTotal, cartCount, coupon, applyCoupon, discount,
    wishlist, toggleWishlist, isInWishlist,
    notifications, unreadCount, markAllRead, notify,
    searchOpen, setSearchOpen,
    aiOpen, setAiOpen,
    isLoggedIn, login, logout,
    theme, toggleTheme,
    language, setLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
