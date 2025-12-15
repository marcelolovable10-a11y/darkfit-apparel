import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DollarSign, ShoppingBag, Package, Users } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface Stats {
  totalVendas: number;
  totalPedidos: number;
  totalProdutos: number;
  totalClientes: number;
}

const DashboardStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);

    // Fetch all stats in parallel
    const [pedidosResult, produtosResult, clientesResult] = await Promise.all([
      supabase
        .from('pedidos')
        .select('valor_total, status'),
      supabase
        .from('produtos')
        .select('id', { count: 'exact' }),
      supabase
        .from('profiles')
        .select('id', { count: 'exact' }),
    ]);

    const pedidos = pedidosResult.data || [];
    const totalVendas = pedidos
      .filter(p => p.status !== 'cancelado')
      .reduce((acc, p) => acc + Number(p.valor_total), 0);

    setStats({
      totalVendas,
      totalPedidos: pedidos.length,
      totalProdutos: produtosResult.count || 0,
      totalClientes: clientesResult.count || 0,
    });

    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={24} />
          </div>
        ))}
      </div>
    );
  }

  const statsData = [
    { 
      label: 'Total em Vendas', 
      value: formatPrice(stats?.totalVendas || 0), 
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    { 
      label: 'Pedidos', 
      value: String(stats?.totalPedidos || 0), 
      icon: ShoppingBag,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    { 
      label: 'Produtos', 
      value: String(stats?.totalProdutos || 0), 
      icon: Package,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    { 
      label: 'Clientes', 
      value: String(stats?.totalClientes || 0), 
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={stat.color} size={24} />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
