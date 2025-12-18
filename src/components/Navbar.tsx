import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, User, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Categoria = Tables<'categorias'>;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const { data } = await supabase
        .from('categorias')
        .select('*')
        .order('nome')
        .limit(8);
      setCategorias(data || []);
    };
    fetchCategorias();
  }, []);

  return (
    <nav className="sticky top-0 left-0 right-0 z-40 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-xl tracking-wider text-primary">
              IMPÉRIO MUNDO FITNESS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {categorias.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {cat.nome}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                0
              </span>
            </Button>
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                0
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b border-border animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {categorias.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {cat.nome}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <Link to="/auth" className="flex-1">
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </Link>
              <Button variant="hero" className="flex-1">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Carrinho
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
