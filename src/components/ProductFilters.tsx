import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Tables } from '@/integrations/supabase/types';

type Categoria = Tables<'categorias'>;

interface ProductFiltersProps {
  totalProducts: number;
  onCategoryChange: (categoryId: string | null) => void;
  onSortChange: (sort: string) => void;
}

const ProductFilters = ({ totalProducts, onCategoryChange, onSortChange }: ProductFiltersProps) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const { data } = await supabase
        .from('categorias')
        .select('*')
        .order('nome');
      setCategorias(data || []);
    };
    fetchCategorias();
  }, []);

  return (
    <div className="border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">{totalProducts}</span> produtos
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Select onValueChange={(value) => onCategoryChange(value === 'all' ? null : value)}>
              <SelectTrigger className="w-[140px] bg-transparent border-border">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categorias.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={onSortChange} defaultValue="featured">
              <SelectTrigger className="w-[160px] bg-transparent border-border">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Em destaque</SelectItem>
                <SelectItem value="newest">Mais recentes</SelectItem>
                <SelectItem value="price-asc">Menor preço</SelectItem>
                <SelectItem value="price-desc">Maior preço</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
