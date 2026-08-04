/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', 'src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        novixa: {
          // Neutrals
          bg: '#050505',
          surface: '#0A0A0F',
          'surface-2': '#0F0F16',
          'surface-3': '#14141C',
          white: '#E8EAF0',
          muted: '#6B7280',
          'muted-2': '#9CA3AF',
          // Brand
          blue: '#0099FF',
          'blue-soft': '#33A9FF',
          purple: '#7C3AED',
          'purple-soft': '#9F67F2',
          cyan: '#22D3EE',
          'cyan-soft': '#4FE0F4',
          violet: '#A259FF',
          // Semantic
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#0099FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      letterSpacing: {
        ultra: '0.04em',
        tightest: '-0.04em',
        tighter2: '-0.03em',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        38: '9.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(0,153,255,0.25), 0 0 80px rgba(0,153,255,0.1)',
        'glow-purple': '0 0 40px rgba(124,58,237,0.25), 0 0 80px rgba(124,58,237,0.1)',
        'glow-cyan': '0 0 40px rgba(34,211,238,0.25), 0 0 80px rgba(34,211,238,0.1)',
        'card': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'aurora': 'aurora 15s ease-in-out infinite',
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)', opacity: '0.3' },
          '33%': { transform: 'translate(30px,-20px) scale(1.1)', opacity: '0.5' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)', opacity: '0.4' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(100%)', opacity: '1' },
        },
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, transparent, rgba(5,5,5,0.8) 80%)',
      },
    },
  },
  plugins: [],
};
