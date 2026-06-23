import { Bot, Gauge, Mic2, Music, ShieldCheck, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  { icon: Users, title: 'Audiência sempre engajada', text: 'Programação dinâmica, locução contextual e chamadas comerciais sem interromper a experiência.' },
  { icon: Mic2, title: 'Voz de marca consistente', text: 'Locutores IA com tom, idioma e estilo ajustados ao posicionamento da sua rádio.' },
  { icon: Gauge, title: 'Lançamento acelerado', text: 'Da curadoria à transmissão, reduza semanas de operação manual para poucos cliques.' },
];

const technology = [
  { icon: Bot, title: 'Motor editorial IA', text: 'Gera vinhetas, notícias, chamadas e blocos temáticos com regras de marca.' },
  { icon: Music, title: 'Mixagem inteligente', text: 'Organiza filas, transições e energia musical para manter ritmo profissional.' },
  { icon: ShieldCheck, title: 'Monitoramento contínuo', text: 'Indicadores de stream, latência e saúde do sistema em tempo real.' },
];

const FeatureGrid = () => {
  return (
    <section className="py-12 sm:py-16" id="beneficios">
      <div className="mb-8 max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Benefícios</span>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Tudo para colocar uma rádio IA no ar com qualidade comercial.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="border-white/10 bg-white/10 text-white backdrop-blur-md">
            <CardContent className="p-6">
              <Icon className="mb-4 h-9 w-9 text-cyan-300" />
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-14 mb-8 max-w-3xl" id="tecnologia">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">Tecnologia</span>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Automação de áudio, conteúdo e operação em um só fluxo.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {technology.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="border-purple-300/20 bg-slate-950/50 text-white backdrop-blur-md">
            <CardContent className="p-6">
              <Icon className="mb-4 h-9 w-9 text-purple-300" />
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
