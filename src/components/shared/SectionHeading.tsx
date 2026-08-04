import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  children?: ReactNode;
}

export function SectionHeading({ eyebrow, title, subtitle, center = true, children }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <span className="inline-block text-2xs font-semibold uppercase tracking-ultra text-novixa-blue mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tightest text-gradient mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm text-novixa-muted font-light tracking-wide ${center ? 'max-w-xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
}

export function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-8 px-4 lg:px-6 max-w-[1400px] mx-auto"
    >
      {breadcrumb && (
        <div className="flex items-center gap-1.5 text-2xs text-novixa-muted mb-3">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-novixa-muted/40">/</span>}
              <span className={i === breadcrumb.length - 1 ? 'text-novixa-white' : ''}>{crumb}</span>
            </span>
          ))}
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tightest text-gradient mb-2">{title}</h1>
      {subtitle && <p className="text-sm text-novixa-muted font-light tracking-wide max-w-2xl">{subtitle}</p>}
    </motion.div>
  );
}
