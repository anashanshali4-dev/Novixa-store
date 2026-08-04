import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package, Users, ShoppingBag, DollarSign, TrendingUp, TrendingDown,
  Plus, Search, MoreHorizontal, LayoutDashboard, Tag, Star, Cpu, Settings,
  BarChart3, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { products, categories } from '@/data/store';
import { Badge } from '@/components/ui';
import { Tabs } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

const ADMIN_STATS = [
  { icon: DollarSign, label: 'Revenue', value: '$42,580', change: '+12.5%', up: true, color: '#10B981' },
  { icon: ShoppingBag, label: 'Orders', value: '1,284', change: '+8.2%', up: true, color: '#0099FF' },
  { icon: Package, label: 'Products', value: '12,400', change: '+3.1%', up: true, color: '#7C3AED' },
  { icon: Users, label: 'Users', value: '89,200', change: '-1.4%', up: false, color: '#22D3EE' },
];

const RECENT_ORDERS = [
  { id: '#ORD-2841', customer: 'Alex Morgan', product: 'Nebula UI Kit', amount: 49, status: 'completed', date: '2h ago' },
  { id: '#ORD-2840', customer: 'Jin Park', product: 'Quantum React Kit', amount: 79, status: 'completed', date: '4h ago' },
  { id: '#ORD-2839', customer: 'Maya Patel', product: 'Prompt Engineering Pack', amount: 29, status: 'processing', date: '6h ago' },
  { id: '#ORD-2838', customer: 'Tom Wright', product: 'Vertex Dashboard', amount: 69, status: 'completed', date: '8h ago' },
  { id: '#ORD-2837', customer: 'Sara Lee', product: 'Aurora Canva Pack', amount: 39, status: 'refunded', date: '12h ago' },
];

const TOP_PRODUCTS = [...products].sort((a, b) => b.downloads - a.downloads).slice(0, 5);

const ADMIN_TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'ai', label: 'AI Config', icon: Cpu },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tightest text-gradient">Admin Dashboard</h1>
            <p className="text-sm text-novixa-muted mt-1">Manage your Novixa ecosystem</p>
          </div>
          <Button leftIcon={<Plus size={16} />}>Add Product</Button>
        </div>

        {/* Tabs */}
        <Tabs tabs={ADMIN_TABS} active={activeTab} onChange={setActiveTab} className="mb-8 overflow-x-auto" />

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ADMIN_STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                        <Icon size={16} style={{ color: stat.color }} />
                      </div>
                      <span className={`text-2xs font-medium flex items-center gap-0.5 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stat.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-novixa-white">{stat.value}</p>
                    <p className="text-2xs text-novixa-muted mt-0.5">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Revenue chart placeholder */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-novixa-white">Revenue Overview</h3>
                <Badge variant="success" size="sm">+12.5% vs last month</Badge>
              </div>
              <div className="flex items-end gap-2 h-40">
                {[40, 55, 45, 60, 50, 70, 65, 80, 75, 90, 85, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-novixa-blue/30 to-novixa-purple/30 border border-white/5"
                    style={{ minHeight: '4px' }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-2xs text-novixa-muted">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Recent orders + Top products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-novixa-white mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {RECENT_ORDERS.map((order) => (
                    <div key={order.id} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-novixa-white truncate">{order.customer}</p>
                        <p className="text-2xs text-novixa-muted">{order.product} · {order.date}</p>
                      </div>
                      <Badge variant={order.status === 'completed' ? 'success' : order.status === 'processing' ? 'warning' : 'error'} size="sm">
                        {order.status}
                      </Badge>
                      <span className="text-xs font-semibold text-novixa-cyan">${order.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-novixa-white mb-4">Top Products</h3>
                <div className="space-y-3">
                  {TOP_PRODUCTS.map((product, i) => {
                    const Icon = product.icon;
                    return (
                      <div key={product.id} className="flex items-center gap-3">
                        <span className="text-2xs text-novixa-muted w-4">{i + 1}</span>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${product.color}15` }}>
                          <Icon size={14} style={{ color: product.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-novixa-white truncate">{product.name}</p>
                          <p className="text-2xs text-novixa-muted">{(product.downloads / 1000).toFixed(1)}k downloads</p>
                        </div>
                        <span className="text-xs font-semibold text-novixa-cyan">${product.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products management */}
        {activeTab === 'products' && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h3 className="text-sm font-semibold text-novixa-white">All Products ({products.length})</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-novixa-muted" />
                  <input placeholder="Search..." className="glass rounded-lg pl-9 pr-3 py-1.5 text-xs text-novixa-white placeholder:text-novixa-muted focus:outline-none w-48" />
                </div>
                <Button size="sm" leftIcon={<Plus size={14} />}>Add</Button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Product', 'Category', 'Price', 'Downloads', 'Rating', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-2xs font-semibold uppercase tracking-ultra text-novixa-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const Icon = product.icon;
                  const cat = categories.find((c) => c.id === product.category);
                  return (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${product.color}15` }}>
                            <Icon size={14} style={{ color: product.color }} />
                          </div>
                          <span className="text-xs font-medium text-novixa-white">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3"><span className="text-xs" style={{ color: cat?.color }}>{cat?.name}</span></td>
                      <td className="px-5 py-3"><span className="text-xs font-semibold text-novixa-cyan">${product.price}</span></td>
                      <td className="px-5 py-3"><span className="text-xs text-novixa-muted">{(product.downloads / 1000).toFixed(1)}k</span></td>
                      <td className="px-5 py-3"><span className="text-xs text-novixa-white flex items-center gap-0.5"><Star size={10} className="text-amber-400 fill-amber-400" /> {product.rating}</span></td>
                      <td className="px-5 py-3"><Badge variant="success" size="sm">Active</Badge></td>
                      <td className="px-5 py-3"><button className="text-novixa-muted hover:text-novixa-white"><MoreHorizontal size={16} /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5">
              <h3 className="text-sm font-semibold text-novixa-white">All Orders ({RECENT_ORDERS.length})</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-2xs font-semibold uppercase tracking-ultra text-novixa-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3"><span className="text-xs font-medium text-novixa-white">{order.id}</span></td>
                    <td className="px-5 py-3"><span className="text-xs text-novixa-muted">{order.customer}</span></td>
                    <td className="px-5 py-3"><span className="text-xs text-novixa-muted">{order.product}</span></td>
                    <td className="px-5 py-3"><span className="text-xs font-semibold text-novixa-cyan">${order.amount}</span></td>
                    <td className="px-5 py-3"><Badge variant={order.status === 'completed' ? 'success' : order.status === 'processing' ? 'warning' : 'error'} size="sm">{order.status}</Badge></td>
                    <td className="px-5 py-3"><span className="text-xs text-novixa-muted">{order.date}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-novixa-white mb-4">Users</h3>
            <div className="space-y-3">
              {['Alex Morgan', 'Jin Park', 'Maya Patel', 'Tom Wright', 'Sara Lee'].map((name, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-novixa-blue/20 to-novixa-purple/20 border border-white/10 flex items-center justify-center text-2xs font-semibold text-novixa-white">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-novixa-white">{name}</p>
                    <p className="text-2xs text-novixa-muted">{name.toLowerCase().replace(' ', '.')}@example.com</p>
                  </div>
                  <Badge variant={i % 3 === 0 ? 'purple' : 'default'} size="sm">{i % 3 === 0 ? 'Pro' : 'Free'}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-novixa-white mb-4">Sales by Category</h3>
              <div className="space-y-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div key={cat.id} className="flex items-center gap-3">
                      <Icon size={14} style={{ color: cat.color }} />
                      <span className="text-xs text-novixa-white flex-1">{cat.name}</span>
                      <div className="w-32 h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.random() * 80 + 20}%`, background: cat.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-novixa-white mb-4">Monthly Growth</h3>
              <div className="flex items-end gap-2 h-32">
                {[60, 70, 65, 80, 75, 90, 85, 100].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-novixa-blue/20 to-novixa-cyan/20" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Config */}
        {activeTab === 'ai' && (
          <div className="glass-card rounded-2xl p-6 max-w-2xl">
            <h3 className="text-sm font-semibold text-novixa-white mb-4">AI Configuration</h3>
            <div className="space-y-4">
              {[
                { name: 'GPT-4o', provider: 'OpenAI', status: 'active', color: '#10A37F' },
                { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', status: 'active', color: '#D97757' },
                { name: 'Gemini 1.5 Pro', provider: 'Google', status: 'active', color: '#4285F4' },
              ].map((model) => (
                <div key={model.name} className="flex items-center gap-3 py-3 border-b border-white/5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${model.color}15` }}>
                    <Cpu size={18} style={{ color: model.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-novixa-white">{model.name}</p>
                    <p className="text-2xs text-novixa-muted">{model.provider}</p>
                  </div>
                  <Badge variant="success" size="sm"><CheckCircle2 size={10} /> Active</Badge>
                  <Button size="sm" variant="ghost">Configure</Button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
              <h4 className="text-xs font-semibold text-novixa-white mb-3">Routing Strategy</h4>
              <select className="w-full glass rounded-xl px-3 py-2.5 text-sm text-novixa-white focus:outline-none">
                <option>Auto (recommended)</option>
                <option>Cost-optimized</option>
                <option>Quality-optimized</option>
                <option>Manual</option>
              </select>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="glass-card rounded-2xl p-6 max-w-2xl space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-novixa-white mb-4">General Settings</h3>
              <div className="space-y-3">
                {[
                  { label: 'Site Name', value: 'Novixa' },
                  { label: 'Support Email', value: 'support@novixa.com' },
                  { label: 'Commission Rate', value: '20%' },
                ].map((s) => (
                  <div key={s.label}>
                    <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">{s.label}</label>
                    <input defaultValue={s.value} className="w-full glass rounded-xl px-4 py-2.5 text-sm text-novixa-white focus:outline-none focus:border-novixa-blue/40" />
                  </div>
                ))}
              </div>
            </div>
            <Button>Save Settings</Button>
          </div>
        )}
      </div>
    </div>
  );
}
