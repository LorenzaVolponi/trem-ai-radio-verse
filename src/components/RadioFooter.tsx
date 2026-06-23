
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  Settings,
  Brain,
  Wifi,
  ShieldCheck
} from 'lucide-react';

const RadioFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative z-10 mt-12 backdrop-blur-md bg-black/20 border-t border-white/10">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-400">
              © 2024 Rádio Trem AI. Sistema de IA autogerenciável.
            </p>
            <div className="flex space-x-2">
              <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                <Brain className="w-3 h-3 mr-1" />
                IA autogerenciável
              </Badge>
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <Wifi className="w-3 h-3 mr-1" />
                Auto-Start 24/7
              </Badge>
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Sem ranking auditado
              </Badge>
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
              Sistema de rádio IA autogerenciável - Transmissão 24/7
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RadioFooter;
