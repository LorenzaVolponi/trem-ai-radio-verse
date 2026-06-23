
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  Settings,
  Brain,
  Wifi
} from 'lucide-react';
import { BrandBadge } from '@/components/brand';

const RadioFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative z-10 mt-12 backdrop-blur-md bg-black/20 border-t border-white/10">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-400">
              © 2024 Rádio Trem AI. Experiência premium autogerenciável.
            </p>
            <div className="flex space-x-2">
              <BrandBadge tone="primary" icon={<Brain className="w-3 h-3" />}>IA</BrandBadge>
              <BrandBadge tone="success" icon={<Wifi className="w-3 h-3" />}>Auto 24/7</BrandBadge>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/auth')}
                className="text-gray-400 hover:text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.location.href = '/?admin'}
                className="text-red-400 hover:text-red-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Rádio IA autogerenciável - transmissão premium 24/7
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RadioFooter;
