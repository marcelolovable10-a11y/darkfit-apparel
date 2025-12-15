import ProductCard from "./ProductCard";
import productLeggings from "@/assets/product-leggings.jpg";
import productTop from "@/assets/product-top.jpg";
import productShorts from "@/assets/product-shorts.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";

const products = [
  {
    id: 1,
    image: productLeggings,
    name: "Legging High Performance",
    category: "FEMININO",
    price: 189.90,
    originalPrice: 249.90,
  },
  {
    id: 2,
    image: productTop,
    name: "Top Training Pro",
    category: "FEMININO",
    price: 129.90,
  },
  {
    id: 3,
    image: productShorts,
    name: "Shorts Elite Fit",
    category: "MASCULINO",
    price: 149.90,
  },
  {
    id: 4,
    image: productHoodie,
    name: "Hoodie Tech Dry",
    category: "UNISSEX",
    price: 299.90,
    originalPrice: 399.90,
  },
];

const ProductsSection = () => {
  return (
    <section id="produtos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest text-sm">
            PRODUTOS EM DESTAQUE
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 mb-4">
            ESCOLHA SEU <span className="text-gradient">EQUIPAMENTO</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção de roupas fitness desenvolvidas com tecnologia de ponta
            para maximizar sua performance em cada treino.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center text-primary font-semibold hover:underline underline-offset-4 transition-all"
          >
            Ver todos os produtos →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
