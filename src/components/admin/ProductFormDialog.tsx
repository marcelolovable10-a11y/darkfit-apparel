import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Produto = Tables<'produtos'>;
type Categoria = Tables<'categorias'>;

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Produto | null;
  onSuccess: () => void;
}

const ProductFormDialog = ({
  open,
  onOpenChange,
  product,
  onSuccess,
}: ProductFormDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    preco_promocional: '',
    sku: '',
    ativo: true,
    categoria_id: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        nome: product.nome,
        descricao: product.descricao || '',
        preco: String(product.preco),
        preco_promocional: product.preco_promocional ? String(product.preco_promocional) : '',
        sku: product.sku || '',
        ativo: product.ativo ?? true,
        categoria_id: product.categoria_id || '',
      });
    } else {
      setFormData({
        nome: '',
        descricao: '',
        preco: '',
        preco_promocional: '',
        sku: '',
        ativo: true,
        categoria_id: '',
      });
    }
  }, [product, open]);

  const fetchCategorias = async () => {
    const { data } = await supabase
      .from('categorias')
      .select('*')
      .order('nome');
    setCategorias(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.preco) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Nome e preço são obrigatórios',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const payload = {
      nome: formData.nome,
      descricao: formData.descricao || null,
      preco: parseFloat(formData.preco),
      preco_promocional: formData.preco_promocional ? parseFloat(formData.preco_promocional) : null,
      sku: formData.sku || null,
      ativo: formData.ativo,
      categoria_id: formData.categoria_id || null,
    };

    let error;

    if (product) {
      const result = await supabase
        .from('produtos')
        .update(payload)
        .eq('id', product.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('produtos')
        .insert(payload);
      error = result.error;
    }

    if (error) {
      toast({
        title: 'Erro ao salvar',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: product ? 'Produto atualizado!' : 'Produto criado!' });
      onOpenChange(false);
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Nome do produto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descrição do produto"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preco">Preço *</Label>
              <Input
                id="preco"
                type="number"
                step="0.01"
                min="0"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                placeholder="0,00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco_promocional">Preço Promocional</Label>
              <Input
                id="preco_promocional"
                type="number"
                step="0.01"
                min="0"
                value={formData.preco_promocional}
                onChange={(e) => setFormData({ ...formData, preco_promocional: e.target.value })}
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="SKU-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={formData.categoria_id}
                onValueChange={(value) => setFormData({ ...formData, categoria_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="ativo"
              checked={formData.ativo}
              onCheckedChange={(checked) => setFormData({ ...formData, ativo: checked })}
            />
            <Label htmlFor="ativo">Produto ativo</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="hero" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
