/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', 'src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        atelier: {
          // Void / space
          void: '#05050A',
          deep: '#08060F',
          dark: '#0C0A16',
          surface: '#100E1C',
          'surface-2': '#16142A',
          'surface-3': '#1E1B36',
          // Text
          white: '#F0EEFF',
          'white-soft': '#C8C5E8',
          muted: '#7C7A9E',
          'muted-soft': '#5A5878',
          // Accent gradient trio
          violet: '#7B5CFF',
          'violet-soft': '#9D86FF',
          'violet-deep': '#5B3DDB',
          cyan: '#3FE0D0',
          'cyan-soft': '#6BEDDE',
          'cyan-deep': '#2BB8A8',
          gold: '#FFC15E',
          'gold-soft': '#FFD488',
          'gold-deep': '#E0A03E',
          // Semantic
          success: '#3FE0D0',
          warning: '#FFC15E',
          error: '#FF5E7E',
          info: '#7B5CFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '3xs': ['0.5rem', { lineHeight: '0.75rem' }],
      },
      letterSpacing: {
        ultra: '0.04em',
        tightest: '-0.04em',
        tighter2: '-0.03em',
        display: '-0.02em',
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
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-violet': '0 0 40px rgba(123,92,255,0.25), 0 0 80px rgba(123,92,255,0.1)',
        'glow-cyan': '0 0 40px rgba(63,224,208,0.25), 0 0 80px rgba(63,224,208,0.1)',
        'glow-gold': '0 0 40px rgba(255,193,94,0.25), 0 0 80px rgba(255,193,94,0.1)',
        'glow-soft': '0 0 60px rgba(123,92,255,0.08)',
        'card': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'spotlight': '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(123,92,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'aurora': 'aurora 15s ease-in-out infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'drift': 'drift 20s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
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
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(15px, -10px)' },
          '50%': { transform: 'translate(-10px, 15px)' },
          '75%': { transform: 'translate(-15px, -5px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(123,92,255,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(123,92,255,0.3)' },
        },
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, transparent, rgba(5,5,10,0.8) 80%)',
        'radial-violet': 'radial-gradient(circle, rgba(123,92,255,0.08) 0%, transparent 70%)',
        'radial-cyan': 'radial-gradient(circle, rgba(63,224,208,0.08) 0%, transparent 70%)',
        'radial-gold': 'radial-gradient(circle, rgba(255,193,94,0.08) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
