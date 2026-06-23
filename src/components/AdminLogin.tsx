
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Radio, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Credenciais inválidas. Use: admin007 / admin007');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-radio-darker via-gray-900 to-radio-dark flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-radio-purple/20 via-transparent to-transparent"></div>
      
      <Card className="w-full max-w-md glass-effect border-white/10 relative z-10">
        <CardHeader className="text-center">
          <div className="w-16 h-16 radio-gradient rounded-full flex items-center justify-center animate-pulse-glow mx-auto mb-4">
            <Radio className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl gradient-text">Rádio Trem AI</CardTitle>
          <p className="text-gray-400">Acesso Administrativo</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">Usuário</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin007"
                  className="pl-10 glass-effect border-white/20 bg-white/5 text-white"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 glass-effect border-white/20 bg-white/5 text-white"
                  required
                />
              </div>
            </div>
            
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-radio-purple hover:bg-radio-purple/80 text-white"
            >
              Entrar no Sistema
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Sistema Autogerenciável de Rádio IA</p>
            <p className="text-xs mt-1">Credenciais padrão: admin007 / admin007</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
