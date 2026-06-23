
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { 
  Radio, 
  Wifi,
  Brain,
  Server,
  Mic2,
  Activity
} from 'lucide-react';
import { BrandBadge, GradientPanel, MetricCard, SectionHeading } from '@/components/brand';

const StreamingInfoCard: React.FC = () => {
  return (
    <GradientPanel className="p-6">
      <SectionHeading
        eyebrow="Transmissão"
        title={<span className="flex items-center gap-2 text-xl"><Radio className="w-5 h-5 text-purple-300" /> Sistema 24/7 autogerenciável</span>}
        actions={<BrandBadge tone="success" icon={<Wifi className="w-3 h-3" />}>Auto 24/7</BrandBadge>}
      />
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Status" value={<span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2" />Transmitindo</span>} />
          <MetricCard label="Qualidade" value="Ultra HD 320kbps" valueClassName="text-purple-300" />
          <MetricCard label="Latência" value="~67ms" valueClassName="text-green-300" />
          <MetricCard label="Uptime" value="99.98%" valueClassName="text-cyan-200" />
        </div>
        
        <Separator className="bg-white/10" />
        
        <div className="flex flex-wrap gap-2">
          <BrandBadge tone="primary" icon={<Brain className="w-3 h-3" />}>IA Autogerenciável</BrandBadge>
          <BrandBadge tone="neutral" icon={<Wifi className="w-3 h-3" />}>Início Automático</BrandBadge>
          <BrandBadge tone="success" icon={<Server className="w-3 h-3" />}>Zero Intervenção</BrandBadge>
          <BrandBadge tone="neutral" icon={<Mic2 className="w-3 h-3" />}>Voz neural</BrandBadge>
          <BrandBadge tone="primary" icon={<Activity className="w-3 h-3" />}>Performance 99.7%</BrandBadge>
        </div>
      </div>
    </GradientPanel>
  );
};

export default StreamingInfoCard;
