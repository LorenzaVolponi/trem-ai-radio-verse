
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Users, 
  Heart, 
  Music, 
  Mic,
  Bot,
  User,
  Settings
} from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      author: 'Sistema',
      message: 'Bem-vindos à Rádio Trem AI! 🎵',
      timestamp: '14:25',
      avatar: '🤖'
    },
    {
      id: 2,
      type: 'user',
      author: 'MusicLover',
      message: 'Essa música nova está incrível! Como vocês geram essas composições?',
      timestamp: '14:26',
      avatar: '🎧'
    },
    {
      id: 3,
      type: 'ai',
      author: 'Voz Creator',
      message: 'Obrigado! Uso algoritmos avançados de IA musical, analisando milhões de padrões sonoros para criar composições únicas. Cada música é gerada em tempo real baseada no clima e preferências dos ouvintes! 🎶',
      timestamp: '14:26',
      avatar: '🎵'
    },
    {
      id: 4,
      type: 'user',
      author: 'TechEnthusiast',
      message: 'Incrível como a voz parece natural! Qual modelo de IA vocês usam?',
      timestamp: '14:27',
      avatar: '💻'
    },
    {
      id: 5,
      type: 'ai',
      author: 'Voz Creator',
      message: 'Utilizamos uma combinação de modelos de clonagem de voz de última geração, incluindo síntese neural e processamento emocional. A naturalidade vem do treinamento contínuo com dados de fala humana! 🧠',
      timestamp: '14:28',
      avatar: '🎵'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(1247);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        type: 'user',
        author: 'Você',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        avatar: '👤'
      };

      setMessages([...messages, message]);
      setNewMessage('');

      // Simular resposta da IA após 2 segundos
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          author: 'Voz Creator',
          message: getAIResponse(newMessage),
          timestamp: new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          avatar: '🎵'
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 2000);
    }
  };

  const getAIResponse = (userMessage: string) => {
    const responses = [
      "Que legal sua sugestão! Vou incluir isso na próxima programação 🎶",
      "Obrigado pelo feedback! A IA está sempre aprendendo com vocês 🤖",
      "Excelente ideia! Vou processar isso e criar algo especial 🎵",
      "Adorei sua participação! Isso ajuda a melhorar nossa programação 🎧",
      "Interessante! Vou analisar essa sugestão com meus algoritmos 🧠"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'system':
        return 'bg-blue-500/20 border-blue-500/30';
      case 'ai':
        return 'bg-radio-purple/20 border-radio-purple/30';
      case 'user':
        return 'bg-gray-500/20 border-gray-500/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  return (
    <Card className="glass-effect border-white/10 h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-radio-cyan" />
            <span>Chat da Rádio</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
              {onlineUsers} online
            </Badge>
            <Button variant="ghost" size="icon" className="w-6 h-6">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4">
        {/* Área de Mensagens */}
        <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`p-3 rounded-lg border ${getMessageStyle(msg.type)}`}
            >
              <div className="flex items-start space-x-2">
                <div className="text-lg">{msg.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-white truncate">
                      {msg.author}
                    </span>
                    <span className="text-xs text-gray-400">
                      {msg.timestamp}
                    </span>
                    {msg.type === 'ai' && (
                      <Badge variant="outline" className="border-radio-purple/50 text-radio-purple text-xs">
                        <Bot className="w-2 h-2 mr-1" />
                        IA
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 break-words">
                    {msg.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Área de Input */}
        <div className="mt-4 flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1 glass-effect border-white/20 bg-white/5 text-white placeholder-gray-400"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-radio-purple hover:bg-radio-purple/80"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-2 flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setNewMessage('🎵 Adorei essa música!')}
            className="text-xs glass-effect"
          >
            <Heart className="w-3 h-3 mr-1" />
            Curtir
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setNewMessage('Podem tocar mais desse estilo?')}
            className="text-xs glass-effect"
          >
            <Music className="w-3 h-3 mr-1" />
            Pedido
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setNewMessage('Como funciona a IA da rádio?')}
            className="text-xs glass-effect"
          >
            <Mic className="w-3 h-3 mr-1" />
            Pergunta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
