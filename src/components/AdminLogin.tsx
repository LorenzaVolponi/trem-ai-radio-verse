
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Radio, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const authenticated = await login(email, password);

    if (!authenticated) {
      setError('Não foi possível acessar o painel administrativo. Verifique seus dados e permissões.');
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
              <Label htmlFor="email" className="text-gray-300">E-mail</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@radio.com"
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
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar no Sistema'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Sistema Autogerenciável de Rádio IA</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
