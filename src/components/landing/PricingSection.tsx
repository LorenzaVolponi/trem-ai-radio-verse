import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const plans = [
  { name: 'Creator', price: 'R$ 297/mês', description: 'Para criadores que querem lançar uma rádio temática.', features: ['Player ao vivo', 'Locução IA básica', 'Programação semanal'] },
  { name: 'Business', price: 'R$ 897/mês', description: 'Para marcas com campanhas, quadros e múltiplas audiências.', features: ['Voz de marca', 'Blocos comerciais', 'Analytics em tempo real'], featured: true },
  { name: 'Enterprise', price: 'Sob consulta', description: 'Para emissoras e redes com integrações e operação dedicada.', features: ['SLA personalizado', 'Integrações via API', 'Suporte estratégico'] },
];

const PricingSection = () => {
  return (
    <section className="py-12 sm:py-16" id="planos">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Planos</span>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Escolha o nível ideal para sua operação de áudio.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`text-white ${plan.featured ? 'border-cyan-300/70 bg-cyan-400/15 shadow-2xl shadow-cyan-500/20' : 'border-white/10 bg-white/10'} backdrop-blur-md`}>
            <CardContent className="flex h-full flex-col p-6">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-3 text-3xl font-black text-cyan-200">{plan.price}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                {plan.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="h-5 w-5 text-cyan-300" />{feature}</li>)}
              </ul>
              <Button className="mt-8 bg-white text-slate-950 hover:bg-slate-200" asChild>
                <a href="#cta-final">{plan.featured ? 'Criar minha rádio IA' : 'Solicitar demonstração'}</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
