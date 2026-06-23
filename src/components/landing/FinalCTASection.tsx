import { Calendar, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FinalCTASection = () => {
  return (
    <section className="py-12 sm:py-16" id="cta-final">
      <div className="rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 p-8 text-center shadow-2xl shadow-purple-900/30 sm:p-12">
        <h2 className="text-3xl font-black text-white sm:text-5xl">Pronto para lançar sua rádio IA?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-200">
          Ouça a experiência ao vivo, escolha um plano ou fale com nosso time para desenhar uma operação sob medida.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300" asChild>
            <a href="#player"><Radio className="mr-2 h-5 w-5" /> Ouvir agora</a>
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white" asChild>
            <a href="mailto:demo@trem.ai"><Calendar className="mr-2 h-5 w-5" /> Solicitar demonstração</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
