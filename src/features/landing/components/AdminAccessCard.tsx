
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from 'lucide-react';

const AdminAccessCard: React.FC = () => {
  return (
    <Card className="backdrop-blur-md bg-red-500/10 border-red-500/20">
      <CardContent className="p-4 text-center">
        <Settings className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <h3 className="font-medium mb-2">Acesso Oscar Admin Master</h3>
        <p className="text-xs text-gray-400 mb-3">
          Sistema de controle total Oscar de IA
        </p>
        <Button 
          onClick={() => window.location.href = '/?admin'} 
          className="w-full bg-red-500 hover:bg-red-600"
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin Dashboard Oscar
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          Login: admin007 / Senha: admin007
        </p>
      </CardContent>
    </Card>
  );
};

export default AdminAccessCard;
