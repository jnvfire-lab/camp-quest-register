import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, MessageCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EVENT_CONFIG, WHATSAPP_CONTACTS, PIX_DATA } from "@/lib/constants";

interface SucessoStepProps {
  onRestart: () => void;
}

export const SucessoStep = ({ onRestart }: SucessoStepProps) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiado!",
        description: `${label} copiado para a área de transferência`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar. Tente novamente.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const openWhatsApp = (phone: string, name: string) => {
    const message = `Olá! Acabei de me inscrever no ${EVENT_CONFIG.title}. Gostaria de tirar algumas dúvidas.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-2xl p-8 shadow-card max-w-2xl w-full text-center"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="mb-6"
        >
          <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl text-success-foreground"
            >
              ✓
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Inscrição Recebida! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-8"
        >
          Sua inscrição para o <strong>{EVENT_CONFIG.title}</strong> foi enviada
          com sucesso!
          <br />
          Em breve você receberá mais informações sobre o evento.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid gap-4 mb-8"
        >
          {/* PIX Section */}
          <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
            <h3 className="font-semibold text-primary mb-4">
              💰 Dados para Pagamento via Pix
            </h3>
            <div className="bg-background rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Chave Pix:</p>
              <p className="font-mono text-foreground break-all">
                {PIX_DATA.key}
              </p>
            </div>
            <Button
              onClick={() => copyToClipboard(PIX_DATA.key, "Chave Pix")}
              variant="outline"
              className="w-full"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar Chave Pix
            </Button>
          </div>

          {/* WhatsApp Contacts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-accent/20 border border-accent">
              <h4 className="font-medium text-accent-foreground mb-3">
                📱 Falar com Maicon
              </h4>
              <Button
                onClick={() => openWhatsApp(WHATSAPP_CONTACTS.maicon, "Maicon")}
                variant="outline"
                className="w-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-accent/20 border border-accent">
              <h4 className="font-medium text-accent-foreground mb-3">
                📱 Falar com Gabi
              </h4>
              <Button
                onClick={() => openWhatsApp(WHATSAPP_CONTACTS.gabi, "Gabi")}
                variant="outline"
                className="w-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 rounded-xl bg-muted/30 border border-muted mb-6"
        >
          <h4 className="font-medium text-foreground mb-2">
            📋 Próximos Passos:
          </h4>
          <ul className="text-sm text-muted-foreground text-left space-y-1">
            <li>
              • Realize o pagamento via Pix ou entre em contato para outras
              formas
            </li>
            <li>• Após o pagamento, envie o comprovante via WhatsApp</li>
            <li>• Aguarde a confirmação da organização</li>
            <li>• Prepare-se para um acampamento incrível! 🏕️</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button onClick={onRestart} variant="outline" className="flex-1">
            Nova Inscrição
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            className="flex-1 bg-gradient-primary hover:shadow-glow"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
