-- Extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABELA DE CATEGORIAS
CREATE TABLE public.categorias (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome text NOT NULL,
  slug text NOT NULL UNIQUE,
  criado_em timestamp with time zone DEFAULT now(),
  atualizado_em timestamp with time zone DEFAULT now()
);

-- TABELA DE PRODUTOS
CREATE TABLE public.produtos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome text NOT NULL,
  descricao text,
  preco decimal NOT NULL,
  preco_promocional decimal,
  categoria_id uuid REFERENCES public.categorias(id) ON DELETE SET NULL,
  sku text UNIQUE,
  ativo boolean DEFAULT true,
  criado_em timestamp with time zone DEFAULT now(),
  atualizado_em timestamp with time zone DEFAULT now()
);

-- TABELA DE VARIAÇÕES
CREATE TABLE public.variacoes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  produto_id uuid REFERENCES public.produtos(id) ON DELETE CASCADE NOT NULL,
  cor text,
  tamanho text,
  estoque integer DEFAULT 0,
  criado_em timestamp with time zone DEFAULT now()
);

-- TABELA DE IMAGENS
CREATE TABLE public.imagens_produto (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  produto_id uuid REFERENCES public.produtos(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  ordem integer DEFAULT 1,
  criado_em timestamp with time zone DEFAULT now()
);

-- HABILITAR RLS
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.variacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.imagens_produto ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PARA CATEGORIAS (leitura pública, escrita apenas admin)
CREATE POLICY "Categorias são visíveis para todos" ON public.categorias
  FOR SELECT USING (true);

CREATE POLICY "Admins podem gerenciar categorias" ON public.categorias
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- POLÍTICAS PARA PRODUTOS (leitura pública de ativos, escrita apenas admin)
CREATE POLICY "Produtos ativos são visíveis para todos" ON public.produtos
  FOR SELECT USING (ativo = true);

CREATE POLICY "Admins podem ver todos os produtos" ON public.produtos
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem gerenciar produtos" ON public.produtos
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- POLÍTICAS PARA VARIAÇÕES (leitura pública, escrita apenas admin)
CREATE POLICY "Variações são visíveis para todos" ON public.variacoes
  FOR SELECT USING (true);

CREATE POLICY "Admins podem gerenciar variações" ON public.variacoes
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- POLÍTICAS PARA IMAGENS (leitura pública, escrita apenas admin)
CREATE POLICY "Imagens são visíveis para todos" ON public.imagens_produto
  FOR SELECT USING (true);

CREATE POLICY "Admins podem gerenciar imagens" ON public.imagens_produto
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- FUNÇÃO PARA ATUALIZAR TIMESTAMP
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- TRIGGERS PARA ATUALIZAR TIMESTAMPS
CREATE TRIGGER update_categorias_updated_at
  BEFORE UPDATE ON public.categorias
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_produtos_updated_at
  BEFORE UPDATE ON public.produtos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();