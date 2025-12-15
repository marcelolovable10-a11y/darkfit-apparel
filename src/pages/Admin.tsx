import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree,
  Settings, 
  LogOut,
  ShoppingCart
} from 'lucide-react';
import ProductsTable from '@/components/admin/ProductsTable';
import CategoriesTable from '@/components/admin/CategoriesTable';
import OrdersTable from '@/components/admin/OrdersTable';
import StoreSettingsForm from '@/components/admin/StoreSettingsForm';
import DashboardStats from '@/components/admin/DashboardStats';

type ActiveTab = 'dashboard' | 'produtos' | 'categorias' | 'pedidos' | 'config';

const Admin = () => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' as ActiveTab },
    { icon: Package, label: 'Produtos', key: 'produtos' as ActiveTab },
    { icon: FolderTree, label: 'Categorias', key: 'categorias' as ActiveTab },
    { icon: ShoppingCart, label: 'Pedidos', key: 'pedidos' as ActiveTab },
    { icon: Settings, label: 'Configurações', key: 'config' as ActiveTab },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            IMPÉRIO<span className="text-primary">FIT</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Painel Admin</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.key
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user.email}
              </p>
              <p className="text-xs text-muted-foreground">
                {isAdmin ? 'Administrador' : 'Usuário'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut size={18} className="mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {!isAdmin && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-500 text-sm">
              ⚠️ Você ainda não tem permissão de administrador. Algumas funções podem estar limitadas.
            </p>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground">Bem-vindo de volta!</p>
            </div>
            <DashboardStats />
          </>
        )}

        {activeTab === 'produtos' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground">Produtos</h2>
              <p className="text-muted-foreground">Gerencie os produtos da loja</p>
            </div>
            <ProductsTable />
          </>
        )}

        {activeTab === 'categorias' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground">Categorias</h2>
              <p className="text-muted-foreground">Organize seus produtos em categorias</p>
            </div>
            <CategoriesTable />
          </>
        )}

        {activeTab === 'pedidos' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground">Pedidos</h2>
              <p className="text-muted-foreground">Gerencie os pedidos da loja</p>
            </div>
            <OrdersTable />
          </>
        )}

        {activeTab === 'config' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground">Configurações</h2>
              <p className="text-muted-foreground">Configure sua loja</p>
            </div>
            <StoreSettingsForm />
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
