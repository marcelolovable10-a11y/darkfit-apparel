import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fitness.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Atleta fitness em pose dinâmica"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-20">
        <div className="max-w-2xl">
          <span className="inline-block text-primary font-semibold tracking-widest text-sm mb-4 animate-fade-in">
            NOVA COLEÇÃO 2024
          </span>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6 animate-slide-up">
            SUPERE
            <br />
            <span className="text-gradient">SEUS LIMITES</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Roupas fitness de alta performance projetadas para atletas que buscam
            o máximo em conforto, estilo e durabilidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl">
              Ver Coleção
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Conhecer a Marca
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div>
              <p className="font-display text-3xl md:text-4xl text-gradient">50K+</p>
              <p className="text-sm text-muted-foreground mt-1">Clientes Satisfeitos</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl text-gradient">200+</p>
              <p className="text-sm text-muted-foreground mt-1">Produtos Premium</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl text-gradient">4.9★</p>
              <p className="text-sm text-muted-foreground mt-1">Avaliação Média</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-xs text-muted-foreground tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
