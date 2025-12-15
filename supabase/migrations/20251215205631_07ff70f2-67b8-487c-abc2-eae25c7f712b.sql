-- TABELA DE PERFIS (vinculada ao auth.users)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome text,
  telefone text,
  criado_em timestamp with time zone DEFAULT now(),
  atualizado_em timestamp with time zone DEFAULT now()
);

-- TABELA DE ENDEREÇOS
CREATE TABLE public.enderecos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  nome_completo text NOT NULL,
  telefone text,
  cep text NOT NULL,
  rua text NOT NULL,
  numero text NOT NULL,
  complemento text,
  bairro text NOT NULL,
  cidade text NOT NULL,
  estado text NOT NULL,
  padrao boolean DEFAULT false,
  criado_em timestamp with time zone DEFAULT now()
);

-- HABILITAR RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enderecos ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PARA PROFILES
CREATE POLICY "Usuários podem ver próprio perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir próprio perfil" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- POLÍTICAS PARA ENDEREÇOS
CREATE POLICY "Usuários podem ver próprios endereços" ON public.enderecos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar endereços" ON public.enderecos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar próprios endereços" ON public.enderecos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar próprios endereços" ON public.enderecos
  FOR DELETE USING (auth.uid() = user_id);

-- FUNÇÃO PARA CRIAR PERFIL AUTOMÁTICO NO SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome)
  VALUES (new.id, new.raw_user_meta_data ->> 'nome');
  RETURN new;
END;
$$;

-- TRIGGER PARA CRIAR PERFIL NO SIGNUP
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- TRIGGER PARA ATUALIZAR TIMESTAMP
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();