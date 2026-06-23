import React from 'react';
import { cn } from '@/lib/utils';

interface GradientPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'subtle';
}

const variants = {
  default: 'border-white/10 bg-brand-glass shadow-brand-panel',
  hero: 'border-white/15 bg-brand-hero shadow-brand-glow',
  subtle: 'border-white/10 bg-white/5 shadow-brand-soft',
};

const GradientPanel: React.FC<GradientPanelProps> = ({ children, className, variant = 'default' }) => {
  return (
    <div className={cn('rounded-brand-xl border backdrop-blur-brand transition-brand', variants[variant], className)}>
      {children}
    </div>
  );
};

export default GradientPanel;
