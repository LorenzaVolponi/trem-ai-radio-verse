import React from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, className, valueClassName }) => {
  return (
    <div className={cn('rounded-brand-lg border border-white/10 bg-white/5 p-4 shadow-brand-soft transition-brand hover:bg-white/8', className)}>
      <div className="flex items-center gap-2 text-sm text-slate-400">
        {icon}
        <span>{label}</span>
      </div>
      <div className={cn('mt-2 text-lg font-semibold text-white', valueClassName)}>{value}</div>
    </div>
  );
};

export default MetricCard;
