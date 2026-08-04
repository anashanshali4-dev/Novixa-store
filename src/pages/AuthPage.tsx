import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';

export function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const { navigate, login } = useApp();
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login();
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-12 h-12 mx-auto mb-3">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-novixa-blue to-novixa-purple" />
            <div className="absolute inset-[2px] rounded-[10px] bg-novixa-bg flex items-center justify-center">
              <Sparkles size={20} className="text-novixa-blue" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tightest text-novixa-white">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm text-novixa-muted mt-1">
            {mode === 'login' ? 'Sign in to your Novixa account' : 'Join the living digital ecosystem'}
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <form onSubmit={handleAuth} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-novixa-muted" />
                  <input required placeholder="Your name" className="w-full glass rounded-xl pl-10 pr-4 py-2.5 text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none focus:border-novixa-blue/40" />
                </div>
              </div>
            )}
            <div>
              <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-novixa-muted" />
                <input required type="email" placeholder="you@example.com" className="w-full glass rounded-xl pl-10 pr-4 py-2.5 text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none focus:border-novixa-blue/40" />
              </div>
            </div>
            <div>
              <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-novixa-muted" />
                <input required type="password" placeholder="••••••••" className="w-full glass rounded-xl pl-10 pr-4 py-2.5 text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none focus:border-novixa-blue/40" />
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-2xs text-novixa-muted cursor-pointer">
                  <input type="checkbox" className="accent-novixa-blue" /> Remember me
                </label>
                <button type="button" className="text-2xs text-novixa-blue hover:text-novixa-blue-soft">Forgot password?</button>
              </div>
            )}

            <Button type="submit" fullWidth size="lg" loading={loading} rightIcon={!loading ? <ArrowRight size={16} /> : undefined}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Benefits */}
          {mode === 'signup' && (
            <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
              {['Access to 12,400+ premium products', 'AI-powered product search', '14-day money-back guarantee'].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-2xs text-novixa-muted">{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-novixa-muted mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => navigate(mode === 'login' ? '/signup' : '/login')} className="text-novixa-blue hover:text-novixa-blue-soft font-medium">
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
