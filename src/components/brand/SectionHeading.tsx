import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, description, actions, className }) => {
  return (
    <div className={cn('flex flex-col gap-4 md:flex-row md:items-end md:justify-between', className)}>
      <div>
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-radio-cyan">{eyebrow}</p>}
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
        {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
};

export default SectionHeading;
