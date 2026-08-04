import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, ShoppingBag, Download, Heart, Settings,
  Package, TrendingUp, DollarSign, Star, Clock, CheckCircle2, Bell,
} from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { products } from '@/data/store';
import { ProductCard } from '@/components/shared/ProductCard';
import { PageHeader } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui';
import type { ReactNode } from 'react';

const ORDERS = [
  { id: 'ord-001', product: 'Nebula UI Kit', date: 'Aug 1, 2026', price: 49, status: 'completed' },
  { id: 'ord-002', product: 'Quantum React Kit', date: 'Jul 28, 2026', price: 79, status: 'completed' },
  { id: 'ord-003', product: 'Prompt Engineering Pack', date: 'Jul 24, 2026', price: 29, status: 'completed' },
  { id: 'ord-004', product: 'Vertex Dashboard', date: 'Jul 20, 2026', price: 69, status: 'processing' },
];

const DOWNLOADS = [
  { id: 'd1', name: 'Nebula UI Kit', size: '124 MB', date: 'Aug 1, 2026', icon: products[0].icon, color: products[0].color },
  { id: 'd2', name: 'Quantum React Kit', size: '89 MB', date: 'Jul 28, 2026', icon: products[1].icon, color: products[1].color },
  { id: 'd3', name: 'Prompt Engineering Pack', size: '12 MB', date: 'Jul 24, 2026', icon: products[2].icon, color: products[2].color },
];

function DashboardLayout({ active, children }: { active: string; children: ReactNode }) {
  const { navigate } = useApp();
  const nav = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', path: '/profile', icon: User },
    { id: 'orders', label: 'Orders', path: '/orders', icon: ShoppingBag },
    { id: 'downloads', label: 'Downloads', path: '/downloads', icon: Download },
    { id: 'wishlist', label: 'Wishlist', path: '/wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-novixa-blue/20 to-novixa-purple/20 border border-white/10 flex items-center justify-center text-sm font-semibold text-novixa-white">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold text-novixa-white">John Doe</p>
                  <p className="text-2xs text-novixa-muted">Pro Member</p>
                </div>
              </div>
              <nav className="space-y-1">
                {nav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                        active === item.id
                          ? 'glass text-novixa-white'
                          : 'text-novixa-muted hover:text-novixa-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { navigate, wishlist } = useApp();

  return (
    <DashboardLayout active="dashboard">
      <PageHeader title="Dashboard" subtitle="Welcome back, John" breadcrumb={['Home', 'Dashboard']} />
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Package, label: 'Total Orders', value: '12', color: '#0099FF' },
            { icon: Download, label: 'Downloads', value: '8', color: '#22D3EE' },
            { icon: DollarSign, label: 'Total Spent', value: '$486', color: '#10B981' },
            { icon: Heart, label: 'Wishlist', value: String(wishlist.length), color: '#7C3AED' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                    <Icon size={16} style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-novixa-white">{stat.value}</p>
                <p className="text-2xs text-novixa-muted mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Recent orders */}
        <div>
          <h2 className="text-lg font-semibold text-novixa-white mb-4">Recent Orders</h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            {ORDERS.map((order, i) => (
              <div key={order.id} className={`flex items-center gap-4 px-5 py-4 ${i < ORDERS.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                  <Package size={16} className="text-novixa-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-novixa-white truncate">{order.product}</p>
                  <p className="text-2xs text-novixa-muted">{order.date} · {order.id}</p>
                </div>
                <Badge variant={order.status === 'completed' ? 'success' : 'warning'} size="sm">
                  {order.status}
                </Badge>
                <span className="text-sm font-semibold text-novixa-cyan">${order.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-novixa-white">Recommended for You</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/products')}>View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 3).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function ProfilePage() {
  return (
    <DashboardLayout active="profile">
      <PageHeader title="Profile" subtitle="Manage your account information" breadcrumb={['Home', 'Profile']} />
      <div className="glass-card rounded-3xl p-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-novixa-blue/20 to-novixa-purple/20 border border-white/10 flex items-center justify-center text-2xl font-bold text-novixa-white">
            JD
          </div>
          <div>
            <h2 className="text-xl font-bold text-novixa-white">John Doe</h2>
            <p className="text-sm text-novixa-muted">john@example.com</p>
            <Badge variant="purple" size="sm" className="mt-1">Pro Member</Badge>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Full Name', value: 'John Doe' },
            { label: 'Email', value: 'john@example.com' },
            { label: 'Bio', value: 'Product designer and React developer' },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">{field.label}</label>
              <input defaultValue={field.value} className="w-full glass rounded-xl px-4 py-2.5 text-sm text-novixa-white focus:outline-none focus:border-novixa-blue/40" />
            </div>
          ))}
          <Button>Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function OrdersPage() {
  return (
    <DashboardLayout active="orders">
      <PageHeader title="Orders" subtitle="Your purchase history" breadcrumb={['Home', 'Orders']} />
      <div className="glass-card rounded-2xl overflow-hidden">
        {ORDERS.map((order, i) => (
          <div key={order.id} className={`flex items-center gap-4 px-5 py-4 ${i < ORDERS.length - 1 ? 'border-b border-white/5' : ''}`}>
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
              <Package size={16} className="text-novixa-blue" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-novixa-white truncate">{order.product}</p>
              <p className="text-2xs text-novixa-muted">{order.date} · {order.id}</p>
            </div>
            <Badge variant={order.status === 'completed' ? 'success' : 'warning'} size="sm">{order.status}</Badge>
            <span className="text-sm font-semibold text-novixa-cyan">${order.price}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export function DownloadsPage() {
  return (
    <DashboardLayout active="downloads">
      <PageHeader title="Downloads" subtitle="Access your purchased products" breadcrumb={['Home', 'Downloads']} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOWNLOADS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="glass-card rounded-2xl p-5">
              <div className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center" style={{ background: `${item.color}15`, border: `1px solid ${item.color}20` }}>
                <Icon size={22} style={{ color: item.color }} />
              </div>
              <p className="text-sm font-semibold text-novixa-white mb-1">{item.name}</p>
              <p className="text-2xs text-novixa-muted mb-3">{item.size} · {item.date}</p>
              <Button fullWidth size="sm" leftIcon={<Download size={14} />}>Download</Button>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

export function SettingsPage() {
  const { theme, toggleTheme, notifications, markAllRead } = useApp();
  return (
    <DashboardLayout active="settings">
      <PageHeader title="Settings" subtitle="Manage your preferences" breadcrumb={['Home', 'Settings']} />
      <div className="space-y-6 max-w-2xl">
        {/* Appearance */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-novixa-white mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-novixa-white">Theme</p>
              <p className="text-2xs text-novixa-muted">Currently using {theme} mode</p>
            </div>
            <Button variant="secondary" size="sm" onClick={toggleTheme}>Toggle Theme</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-novixa-white">Notifications</h3>
            <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all read</Button>
          </div>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3 py-2">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-white/10' : n.type === 'success' ? 'bg-emerald-400' : n.type === 'warning' ? 'bg-amber-400' : 'bg-novixa-blue'}`} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-novixa-white">{n.title}</p>
                  <p className="text-2xs text-novixa-muted">{n.message}</p>
                </div>
                <span className="text-2xs text-novixa-muted/60 shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-novixa-white mb-4">Account</h3>
          <div className="space-y-3">
            <Button variant="ghost" size="sm">Change Password</Button>
            <Button variant="danger" size="sm">Delete Account</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function WishlistPage() {
  const { wishlist, navigate } = useApp();
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <DashboardLayout active="wishlist">
      <PageHeader title="Wishlist" subtitle="Products you've saved for later" breadcrumb={['Home', 'Wishlist']} />
      {wishlistedProducts.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center">
          <Heart size={32} className="text-novixa-muted mx-auto mb-4" />
          <p className="text-sm text-novixa-muted mb-4">Your wishlist is empty</p>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistedProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
