import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Search, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Pedido = Tables<'pedidos'>;

const statusColors: Record<string, string> = {
  aguardando: 'bg-yellow-500/20 text-yellow-500',
  confirmado: 'bg-blue-500/20 text-blue-500',
  enviado: 'bg-purple-500/20 text-purple-500',
  entregue: 'bg-green-500/20 text-green-500',
  cancelado: 'bg-red-500/20 text-red-500',
};

const statusLabels: Record<string, string> = {
  aguardando: 'Aguardando',
  confirmado: 'Confirmado',
  enviado: 'Enviado',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
};

const OrdersTable = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const fetchPedidos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('criado_em', { ascending: false });

    if (error) {
      toast({
        title: 'Erro ao carregar pedidos',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setPedidos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleStatusChange = async (pedidoId: string, newStatus: string) => {
    const { error } = await supabase
      .from('pedidos')
      .update({ status: newStatus })
      .eq('id', pedidoId);

    if (error) {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Status atualizado!' });
      fetchPedidos();
    }
  };

  const filteredPedidos = pedidos.filter(p =>
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Buscar por ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredPedidos.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {search ? 'Nenhum pedido encontrado' : 'Nenhum pedido realizado ainda'}
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Frete</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell className="font-mono text-xs">
                    {pedido.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(pedido.criado_em)}
                  </TableCell>
                  <TableCell>{formatPrice(Number(pedido.valor_subtotal))}</TableCell>
                  <TableCell>{formatPrice(Number(pedido.valor_frete || 0))}</TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(Number(pedido.valor_total))}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {pedido.metodo_pagamento || '-'}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={pedido.status || 'aguardando'}
                      onValueChange={(value) => handleStatusChange(pedido.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <Badge className={statusColors[pedido.status || 'aguardando']}>
                          {statusLabels[pedido.status || 'aguardando']}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost">
                      <Eye size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
