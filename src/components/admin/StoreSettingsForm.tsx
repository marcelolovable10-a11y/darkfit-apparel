import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type ConfiguracoesLoja = Tables<'configuracoes_loja'>;

const StoreSettingsForm = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [configId, setConfigId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome_loja: '',
    logo_url: '',
    banner_home_url: '',
    whatsapp: '',
    texto_whatsapp: '',
    email_contato: '',
    endereco_loja: '',
    horario_atendimento: '',
    instagram: '',
    facebook: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('configuracoes_loja')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      toast({
        title: 'Erro ao carregar configurações',
        description: error.message,
        variant: 'destructive',
      });
    } else if (data) {
      setConfigId(data.id);
      setFormData({
        nome_loja: data.nome_loja || '',
        logo_url: data.logo_url || '',
        banner_home_url: data.banner_home_url || '',
        whatsapp: data.whatsapp || '',
        texto_whatsapp: data.texto_whatsapp || '',
        email_contato: data.email_contato || '',
        endereco_loja: data.endereco_loja || '',
        horario_atendimento: data.horario_atendimento || '',
        instagram: data.instagram || '',
        facebook: data.facebook || '',
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      nome_loja: formData.nome_loja || null,
      logo_url: formData.logo_url || null,
      banner_home_url: formData.banner_home_url || null,
      whatsapp: formData.whatsapp || null,
      texto_whatsapp: formData.texto_whatsapp || null,
      email_contato: formData.email_contato || null,
      endereco_loja: formData.endereco_loja || null,
      horario_atendimento: formData.horario_atendimento || null,
      instagram: formData.instagram || null,
      facebook: formData.facebook || null,
    };

    let error;

    if (configId) {
      const result = await supabase
        .from('configuracoes_loja')
        .update(payload)
        .eq('id', configId);
      error = result.error;
    } else {
      const result = await supabase
        .from('configuracoes_loja')
        .insert(payload)
        .select()
        .single();
      if (result.data) {
        setConfigId(result.data.id);
      }
      error = result.error;
    }

    if (error) {
      toast({
        title: 'Erro ao salvar',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Configurações salvas!' });
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {/* Informações Gerais */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Informações Gerais
        </h3>
        
        <div className="space-y-2">
          <Label htmlFor="nome_loja">Nome da Loja</Label>
          <Input
            id="nome_loja"
            value={formData.nome_loja}
            onChange={(e) => setFormData({ ...formData, nome_loja: e.target.value })}
            placeholder="ImpérioFit"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo_url">URL do Logo</Label>
          <Input
            id="logo_url"
            value={formData.logo_url}
            onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="banner_home_url">URL do Banner Home</Label>
          <Input
            id="banner_home_url"
            value={formData.banner_home_url}
            onChange={(e) => setFormData({ ...formData, banner_home_url: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Contato */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Contato
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="5511999999999"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email_contato">E-mail</Label>
            <Input
              id="email_contato"
              type="email"
              value={formData.email_contato}
              onChange={(e) => setFormData({ ...formData, email_contato: e.target.value })}
              placeholder="contato@loja.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="texto_whatsapp">Mensagem Padrão WhatsApp</Label>
          <Textarea
            id="texto_whatsapp"
            value={formData.texto_whatsapp}
            onChange={(e) => setFormData({ ...formData, texto_whatsapp: e.target.value })}
            placeholder="Olá! Gostaria de mais informações."
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endereco_loja">Endereço</Label>
          <Input
            id="endereco_loja"
            value={formData.endereco_loja}
            onChange={(e) => setFormData({ ...formData, endereco_loja: e.target.value })}
            placeholder="Rua, número - Cidade/Estado"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="horario_atendimento">Horário de Atendimento</Label>
          <Input
            id="horario_atendimento"
            value={formData.horario_atendimento}
            onChange={(e) => setFormData({ ...formData, horario_atendimento: e.target.value })}
            placeholder="Seg-Sex: 9h às 18h"
          />
        </div>
      </div>

      {/* Redes Sociais */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Redes Sociais
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              placeholder="https://instagram.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={formData.facebook}
              onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              placeholder="https://facebook.com/..."
            />
          </div>
        </div>
      </div>

      <Button type="submit" variant="hero" disabled={saving} className="w-full">
        {saving ? (
          <Loader2 className="animate-spin mr-2" size={18} />
        ) : (
          <Save className="mr-2" size={18} />
        )}
        Salvar Configurações
      </Button>
    </form>
  );
};

export default StoreSettingsForm;
