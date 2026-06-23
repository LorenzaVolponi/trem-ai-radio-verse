import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { question: 'Preciso ter uma rádio pronta?', answer: 'Não. Você pode começar com uma proposta editorial, identidade de marca e objetivos de audiência. A plataforma ajuda a montar programação, locução e experiência ao vivo.' },
  { question: 'O player continua sendo o foco da página?', answer: 'Sim. A experiência foi organizada para apresentar a promessa comercial primeiro e conduzir o visitante rapidamente para ouvir a transmissão ao vivo.' },
  { question: 'Posso vender anúncios e chamadas?', answer: 'Sim. Os planos para negócios contemplam blocos comerciais, chamadas de patrocinadores e relatórios para acompanhar performance.' },
  { question: 'Funciona em dispositivos móveis?', answer: 'Sim. As seções usam uma estrutura mobile-first, com CTAs empilhados, cards responsivos e hierarquia visual clara em telas pequenas.' },
];

const FAQSection = () => {
  return (
    <section className="py-12 sm:py-16" id="faq">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">FAQ</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Perguntas frequentes</h2>
        </div>
        <Accordion type="single" collapsible className="rounded-2xl border border-white/10 bg-white/10 px-5 text-white backdrop-blur-md">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`} className="border-white/10">
              <AccordionTrigger className="text-left text-base hover:text-cyan-200 hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="leading-6 text-slate-300">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
