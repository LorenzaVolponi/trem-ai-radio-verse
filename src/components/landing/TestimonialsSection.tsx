import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  { quote: 'Colocamos uma rádio de campanha no ar em dias, com voz, trilhas e chamadas alinhadas à marca.', author: 'Marina Costa', role: 'Head de Marketing' },
  { quote: 'A programação automática manteve a audiência ativa sem aumentar nossa equipe de produção.', author: 'Rafael Lima', role: 'Diretor de Conteúdo' },
  { quote: 'O player virou o centro da comunidade: ouvintes, anúncios e analytics no mesmo ambiente.', author: 'Bianca Torres', role: 'Fundadora de Creator Media' },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 sm:py-16" id="depoimentos">
      <div className="mb-8 max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">Depoimentos</span>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Projetos que já usam áudio IA para crescer.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={item.author} className="border-white/10 bg-white/10 text-white backdrop-blur-md">
            <CardContent className="p-6">
              <Quote className="mb-4 h-8 w-8 text-cyan-300" />
              <p className="text-sm leading-6 text-slate-200">“{item.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold">{item.author}</p>
                <p className="text-sm text-slate-400">{item.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
