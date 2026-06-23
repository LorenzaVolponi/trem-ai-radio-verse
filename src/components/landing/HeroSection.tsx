import { ArrowRight, Radio, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <Badge className="mb-5 border-purple-300/40 bg-white/10 text-purple-100 hover:bg-white/10">
          <Sparkles className="mr-2 h-4 w-4" /> Rádio com IA pronta para escalar sua audiência
        </Badge>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
          Sua rádio ao vivo, personalizada e operada por IA 24/7.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
          Transforme conteúdo, música, voz e programação em uma experiência de áudio contínua para marcas,
          criadores e emissoras que querem lançar rápido e monetizar melhor.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 sm:w-auto" asChild>
            <a href="#player"><Radio className="mr-2 h-5 w-5" /> Ouvir agora</a>
          </Button>
          <Button size="lg" variant="outline" className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:w-auto" asChild>
            <a href="#planos">Criar minha rádio IA <ArrowRight className="ml-2 h-5 w-5" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
