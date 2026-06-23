
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminAccessCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <GradientPanel className="border-red-500/20 bg-red-500/10 p-4 text-center">
        <Settings className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <h3 className="font-medium mb-2">Acesso administrativo</h3>
        <p className="text-xs text-gray-400 mb-3">
          Sistema de controle da rádio IA
        </p>
        <Button 
          onClick={() => navigate('/admin/login')}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin Dashboard
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          Login: admin007 / Senha: admin007
        </p>
    </GradientPanel>
  );
};

export default AdminAccessCard;
