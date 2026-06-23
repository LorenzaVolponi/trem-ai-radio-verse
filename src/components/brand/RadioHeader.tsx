
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Wifi,
  Settings,
  LogIn,
  Headphones,
  Crown,
  Trophy
} from 'lucide-react';

interface RadioHeaderProps {
  currentListeners: number;
}

const RadioHeader: React.FC<RadioHeaderProps> = ({ currentListeners }) => {
  const navigate = useNavigate();

  return (
    <header className="relative z-10 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-purple-500/50">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Rádio Trem AI
              </h1>
              <p className="text-sm text-gray-400">Sistema Autogerenciável Oscar de IA - Transmissão 24/7</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* System Status Indicators */}
            <div className="hidden md:flex items-center space-x-2">
              <Badge variant="outline" className="border-green-500/50 text-green-400 animate-pulse">
                <Crown className="w-3 h-3 mr-1" />
                TOP 1 MUNDIAL
              </Badge>
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                <Trophy className="w-3 h-3 mr-1" />
                OSCAR IA
              </Badge>
              <div className="flex items-center space-x-1 px-2 py-1 backdrop-blur-md bg-white/10 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">AI Engine</span>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 backdrop-blur-md bg-white/10 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">Auto Stream</span>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 backdrop-blur-md bg-white/10 rounded-full">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">Voice AI</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 px-4 py-2 backdrop-blur-md bg-red-500/20 rounded-full border border-red-500/30">
              <Wifi className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-sm font-medium text-red-300">AO VIVO 24/7</span>
            </div>
            
            <div className="flex items-center space-x-2 px-4 py-2 backdrop-blur-md bg-white/10 rounded-full">
              <Headphones className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium">{currentListeners.toLocaleString()}</span>
              <span className="text-xs text-gray-400">ouvintes</span>
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/auth')}
                className="backdrop-blur-md bg-white/10 border-purple-500/50 hover:bg-purple-500/20"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.href = '/?admin'}
                className="backdrop-blur-md bg-red-500/20 border-red-500/50 hover:bg-red-500/30 text-red-400"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RadioHeader;
