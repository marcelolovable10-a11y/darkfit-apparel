import { Zap, Shield, Droplets, Recycle } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Alta Performance",
    description: "Tecidos tecnológicos que acompanham cada movimento do seu treino mais intenso.",
  },
  {
    icon: Shield,
    title: "Durabilidade Premium",
    description: "Materiais resistentes que mantêm a qualidade mesmo após centenas de lavagens.",
  },
  {
    icon: Droplets,
    title: "Dry-Fit Technology",
    description: "Sistema de absorção de suor que mantém você seco e confortável durante o treino.",
  },
  {
    icon: Recycle,
    title: "Sustentável",
    description: "Comprometidos com o meio ambiente usando materiais reciclados e processos eco-friendly.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] group-hover:scale-110">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
