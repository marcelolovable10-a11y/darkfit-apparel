import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-semibold tracking-widest text-sm">
              NOSSA HISTÓRIA
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 mb-6">
              NASCIDOS PARA
              <br />
              <span className="text-gradient">PERFORMANCE</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                A PULSE FIT nasceu da paixão pelo esporte e da busca incansável pela
                perfeição. Somos uma marca brasileira que entende as necessidades dos
                atletas de verdade.
              </p>
              <p>
                Cada peça é desenvolvida com tecnologia de ponta, testada por atletas
                profissionais e projetada para oferecer o máximo em conforto,
                durabilidade e estilo.
              </p>
              <p>
                Nossa missão é equipar você para superar seus limites, seja na academia,
                na rua ou em qualquer lugar onde sua determinação te levar.
              </p>
            </div>
            <Button variant="heroOutline" size="lg" className="mt-8">
              Conheça Nossa Jornada
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-square relative">
              {/* Decorative circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full max-w-md aspect-square rounded-full border border-border/50 animate-pulse-glow" />
              </div>
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-primary/30" />
              </div>
              <div className="absolute inset-16 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-primary/10" />
              </div>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-7xl md:text-8xl text-gradient">5+</p>
                  <p className="text-muted-foreground mt-2">Anos de Excelência</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
