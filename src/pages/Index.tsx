import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <p className="text-sm text-muted-foreground">
              <span className="hover:text-primary cursor-pointer">Página Inicial</span>
              {' / '}
              <span className="text-foreground">Todos os Produtos</span>
            </p>
          </div>
        </div>

        <ProductsGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
