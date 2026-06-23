
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AutoStartNotification: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-4 relative z-10">
      <Card className="backdrop-blur-md bg-green-500/10 border-green-500/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-green-400 font-medium">🎵 Sistema Iniciado Automaticamente - Oscar de Melhor IA 🏆</p>
              <p className="text-sm text-gray-400">Rádio transmitindo automaticamente com IA de nível mundial</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoStartNotification;
