
import React from 'react';
import { GradientPanel } from "@/components/brand";

const AutoStartNotification: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-4 relative z-10">
      <GradientPanel variant="subtle" className="border-green-500/20 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-green-400 font-medium">Sistema iniciado automaticamente</p>
              <p className="text-sm text-gray-400">Rádio transmitindo automaticamente com IA de nível mundial</p>
            </div>
          </div>
        </GradientPanel>
    </div>
  );
};

export default AutoStartNotification;
