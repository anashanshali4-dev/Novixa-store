import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={onClick}
      className={`glass-card rounded-2xl ${hover ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-white/5 text-novixa-muted border-white/10',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-novixa-blue/10 text-novixa-blue border-novixa-blue/20',
    purple: 'bg-novixa-purple/10 text-novixa-purple border-novixa-purple/20',
  };
  const sizes = { sm: 'px-2 py-0.5 text-2xs', md: 'px-2.5 py-1 text-xs' };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium tracking-wide ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  autoFocus?: boolean;
}

export function Input({ leftIcon, rightIcon, className = '', ...props }: InputProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      {leftIcon && <span className="absolute left-3 text-novixa-muted pointer-events-none">{leftIcon}</span>}
      <input
        {...props}
        className={`w-full glass rounded-xl px-4 py-2.5 text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none focus:border-novixa-blue/40 transition-colors ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
      />
      {rightIcon && <span className="absolute right-3 text-novixa-muted">{rightIcon}</span>}
    </div>
  );
}

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  src?: string;
}

export function Avatar({ name, size = 'md', src }: AvatarProps) {
  const sizes = { sm: 'w-7 h-7 text-2xs', md: 'w-9 h-9 text-xs', lg: 'w-12 h-12 text-sm' };
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  if (src) {
    return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} />;
  }
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold bg-gradient-to-br from-novixa-blue/20 to-novixa-purple/20 border border-white/10 text-novixa-white`}>
      {initials}
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`shimmer-bg rounded-lg ${className}`} />;
}
