import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BrandBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  tone?: 'live' | 'primary' | 'success' | 'neutral';
  className?: string;
}

const toneClasses = {
  live: 'border-red-400/40 bg-red-500/10 text-red-200 shadow-brand-live',
  primary: 'border-radio-purple/40 bg-radio-purple/10 text-radio-cyan',
  success: 'border-radio-green/40 bg-radio-green/10 text-radio-green',
  neutral: 'border-white/15 bg-white/8 text-slate-200',
};

const BrandBadge: React.FC<BrandBadgeProps> = ({ children, icon, tone = 'neutral', className }) => {
  return (
    <Badge
      variant="outline"
      className={cn('gap-1.5 rounded-brand-full px-3 py-1 font-medium backdrop-blur-brand transition-brand', toneClasses[tone], className)}
    >
      {icon}
      {children}
    </Badge>
  );
};

export default BrandBadge;
