import React from 'react';
import { AlertCircle, RefreshCw, Radio, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type RealtimeState = 'loading' | 'error' | 'empty' | 'offline';

interface RealtimeStatusAlertProps {
  state: RealtimeState;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const stateConfig: Record<RealtimeState, {
  icon: React.ElementType;
  title: string;
  description: string;
  className: string;
  iconClassName: string;
}> = {
  loading: {
    icon: RefreshCw,
    title: 'Carregando dados em tempo real',
    description: 'Estamos sincronizando as informações mais recentes.',
    className: 'border-blue-500/40 bg-blue-500/10',
    iconClassName: 'text-blue-300 animate-spin',
  },
  error: {
    icon: AlertCircle,
    title: 'Não foi possível atualizar agora',
    description: 'O serviço em tempo real retornou uma falha temporária.',
    className: 'border-red-500/50 bg-red-500/10',
    iconClassName: 'text-red-300',
  },
  empty: {
    icon: Radio,
    title: 'Nenhum dado disponível',
    description: 'Ainda não há eventos suficientes para exibir este painel.',
    className: 'border-yellow-500/40 bg-yellow-500/10',
    iconClassName: 'text-yellow-300',
  },
  offline: {
    icon: WifiOff,
    title: 'Conexão offline',
    description: 'Verifique sua internet para retomar as atualizações ao vivo.',
    className: 'border-gray-500/50 bg-gray-500/10',
    iconClassName: 'text-gray-300',
  },
};

const RealtimeStatusAlert: React.FC<RealtimeStatusAlertProps> = ({
  state,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <Alert className={cn(config.className, 'text-white', className)}>
      <Icon className={cn('h-4 w-4', config.iconClassName)} />
      <AlertTitle>{title ?? config.title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-3 text-gray-200 sm:flex-row sm:items-center sm:justify-between">
        <span>{description ?? config.description}</span>
        {onAction && actionLabel && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onAction}
            className="w-fit border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <RefreshCw className="w-3 h-3 mr-2" />
            {actionLabel}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default RealtimeStatusAlert;
