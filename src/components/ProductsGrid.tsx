import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import ShopProductCard from './ShopProductCard';
import ProductFilters from './ProductFilters';
import type { Tables } from '@/integrations/supabase/types';

type Produto = Tables<'produtos'>;
type Categoria = Tables<'categorias'>;

interface ProductWithImages extends Produto {
  imagens_produto: { url: string; ordem: number }[];
  categorias: Categoria | null;
}

const ProductsGrid = () => {
  const [produtos, setProdutos] = useState<ProductWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    fetchProdutos();
  }, [selectedCategory, sortBy]);

  const fetchProdutos = async () => {
    setLoading(true);
    
    let query = supabase
      .from('produtos')
      .select(`
        *,
        imagens_produto(url, ordem),
        categorias(*)
      `)
      .eq('ativo', true);

    if (selectedCategory) {
      query = query.eq('categoria_id', selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        query = query.order('criado_em', { ascending: false });
        break;
      case 'price-asc':
        query = query.order('preco', { ascending: true });
        break;
      case 'price-desc':
        query = query.order('preco', { ascending: false });
        break;
      default:
        query = query.order('criado_em', { ascending: false });
    }

    const { data, error } = await query;

    if (!error && data) {
      setProdutos(data as ProductWithImages[]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <ProductFilters
        totalProducts={produtos.length}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortBy}
      />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : produtos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {produtos.map((produto) => (
              <ShopProductCard
                key={produto.id}
                id={produto.id}
                nome={produto.nome}
                preco={Number(produto.preco)}
                preco_promocional={produto.preco_promocional ? Number(produto.preco_promocional) : null}
                imagens={produto.imagens_produto
                  ?.sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
                  .map((img) => img.url) || []}
                categoria={produto.categorias?.nome}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;
