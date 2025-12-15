-- TABELA DE PEDIDOS
CREATE TABLE public.pedidos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  endereco_id uuid REFERENCES public.enderecos(id) ON DELETE SET NULL,
  status text DEFAULT 'aguardando' CHECK (status IN ('aguardando', 'confirmado', 'preparando', 'enviado', 'entregue', 'cancelado')),
  valor_subtotal decimal NOT NULL,
  valor_frete decimal DEFAULT 0,
  valor_total decimal NOT NULL,
  metodo_pagamento text,
  observacoes text,
  criado_em timestamp with time zone DEFAULT now(),
  atualizado_em timestamp with time zone DEFAULT now()
);

-- TABELA DE ITENS DO PEDIDO
CREATE TABLE public.itens_pedido (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pedido_id uuid REFERENCES public.pedidos(id) ON DELETE CASCADE NOT NULL,
  produto_id uuid REFERENCES public.produtos(id) ON DELETE SET NULL,
  variacao_id uuid REFERENCES public.variacoes(id) ON DELETE SET NULL,
  nome_produto text NOT NULL,
  quantidade integer NOT NULL CHECK (quantidade > 0),
  preco_unitario decimal NOT NULL,
  criado_em timestamp with time zone DEFAULT now()
);

-- TABELA DE CONFIGURAÇÕES DA LOJA (singleton)
CREATE TABLE public.configuracoes_loja (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome_loja text DEFAULT 'ImpérioFit',
  logo_url text,
  banner_home_url text,
  whatsapp text,
  texto_whatsapp text DEFAULT 'Olá! Gostaria de mais informações.',
  horario_atendimento text,
  instagram text,
  facebook text,
  email_contato text,
  endereco_loja text,
  criado_em timestamp with time zone DEFAULT now(),
  atualizado_em timestamp with time zone DEFAULT now()
);

-- HABILITAR RLS
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itens_pedido ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracoes_loja ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PARA PEDIDOS
CREATE POLICY "Usuários podem ver próprios pedidos" ON public.pedidos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar pedidos" ON public.pedidos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins podem ver todos os pedidos" ON public.pedidos
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem gerenciar pedidos" ON public.pedidos
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- POLÍTICAS PARA ITENS DO PEDIDO
CREATE POLICY "Usuários podem ver itens dos próprios pedidos" ON public.itens_pedido
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.pedidos WHERE id = pedido_id AND user_id = auth.uid())
  );

CREATE POLICY "Usuários podem criar itens em próprios pedidos" ON public.itens_pedido
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.pedidos WHERE id = pedido_id AND user_id = auth.uid())
  );

CREATE POLICY "Admins podem ver todos os itens" ON public.itens_pedido
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem gerenciar itens" ON public.itens_pedido
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- POLÍTICAS PARA CONFIGURAÇÕES (leitura pública, escrita admin)
CREATE POLICY "Configurações são públicas" ON public.configuracoes_loja
  FOR SELECT USING (true);

CREATE POLICY "Admins podem gerenciar configurações" ON public.configuracoes_loja
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- TRIGGERS PARA TIMESTAMPS
CREATE TRIGGER update_pedidos_updated_at
  BEFORE UPDATE ON public.pedidos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_configuracoes_updated_at
  BEFORE UPDATE ON public.configuracoes_loja
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- INSERIR CONFIGURAÇÃO INICIAL
INSERT INTO public.configuracoes_loja (nome_loja) VALUES ('ImpérioFit');