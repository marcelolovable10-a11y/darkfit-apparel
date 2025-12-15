import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Categoria = Tables<'categorias'>;

const CategoriesTable = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null);
  const [formData, setFormData] = useState({ nome: '', slug: '' });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchCategorias = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('nome');

    if (error) {
      toast({
        title: 'Erro ao carregar categorias',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setCategorias(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;

    const { error } = await supabase
      .from('categorias')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao excluir',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Categoria excluída!' });
      fetchCategorias();
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingCategory(categoria);
    setFormData({ nome: categoria.nome, slug: categoria.slug });
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ nome: '', slug: '' });
    setDialogOpen(true);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (nome: string) => {
    setFormData({
      nome,
      slug: generateSlug(nome),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.slug) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Nome e slug são obrigatórios',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    let error;

    if (editingCategory) {
      const result = await supabase
        .from('categorias')
        .update(formData)
        .eq('id', editingCategory.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('categorias')
        .insert(formData);
      error = result.error;
    }

    if (error) {
      toast({
        title: 'Erro ao salvar',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: editingCategory ? 'Categoria atualizada!' : 'Categoria criada!' });
      setDialogOpen(false);
      fetchCategorias();
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAdd} variant="hero">
          <Plus size={18} className="mr-2" />
          Nova Categoria
        </Button>
      </div>

      {categorias.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Nenhuma categoria cadastrada ainda
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categorias.map((categoria) => (
                <TableRow key={categoria.id}>
                  <TableCell className="font-medium">{categoria.nome}</TableCell>
                  <TableCell className="text-muted-foreground">{categoria.slug}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(categoria)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(categoria.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Nome da categoria"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="slug-da-categoria"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="hero" disabled={saving}>
                {saving ? <Loader2 className="animate-spin" /> : 'Salvar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesTable;
