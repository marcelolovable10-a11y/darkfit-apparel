-- TABELA DE CARRINHO
CREATE TABLE public.carrinho (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  criado_em timestamp with time zone DEFAULT now(),
  atualizado_em timestamp with time zone DEFAULT now()
);

-- TABELA DE ITENS DO CARRINHO
CREATE TABLE public.carrinho_itens (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  carrinho_id uuid REFERENCES public.carrinho(id) ON DELETE CASCADE NOT NULL,
  produto_id uuid REFERENCES public.produtos(id) ON DELETE CASCADE NOT NULL,
  variacao_id uuid REFERENCES public.variacoes(id) ON DELETE SET NULL,
  quantidade integer DEFAULT 1 CHECK (quantidade > 0),
  criado_em timestamp with time zone DEFAULT now()
);

-- ÍNDICE ÚNICO PARA UM CARRINHO POR USUÁRIO
CREATE UNIQUE INDEX idx_carrinho_user ON public.carrinho(user_id);

-- HABILITAR RLS
ALTER TABLE public.carrinho ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carrinho_itens ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PARA CARRINHO (usuário só vê/edita próprio carrinho)
CREATE POLICY "Usuários podem ver próprio carrinho" ON public.carrinho
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar próprio carrinho" ON public.carrinho
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar próprio carrinho" ON public.carrinho
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar próprio carrinho" ON public.carrinho
  FOR DELETE USING (auth.uid() = user_id);

-- POLÍTICAS PARA ITENS DO CARRINHO
CREATE POLICY "Usuários podem ver itens do próprio carrinho" ON public.carrinho_itens
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.carrinho WHERE id = carrinho_id AND user_id = auth.uid())
  );

CREATE POLICY "Usuários podem adicionar itens ao próprio carrinho" ON public.carrinho_itens
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.carrinho WHERE id = carrinho_id AND user_id = auth.uid())
  );

CREATE POLICY "Usuários podem atualizar itens do próprio carrinho" ON public.carrinho_itens
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.carrinho WHERE id = carrinho_id AND user_id = auth.uid())
  );

CREATE POLICY "Usuários podem remover itens do próprio carrinho" ON public.carrinho_itens
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.carrinho WHERE id = carrinho_id AND user_id = auth.uid())
  );

-- TRIGGER PARA ATUALIZAR TIMESTAMP DO CARRINHO
CREATE TRIGGER update_carrinho_updated_at
  BEFORE UPDATE ON public.carrinho
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();