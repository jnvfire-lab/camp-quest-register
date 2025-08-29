import { useState } from "react";
import { motion } from "framer-motion";
import { QuestionCard } from "../QuestionCard";
import { RadioGroupInput } from "../inputs/RadioGroup";
import { SelectInput } from "../inputs/SelectInput";
import { TextInput } from "../inputs/TextInput";
import { Button } from "@/components/ui/button";
import { Copy, MessageCircle } from "lucide-react";
import { FormData } from "@/lib/validation";
import {
  FORMAS_PAGAMENTO,
  OPCOES_PARCELAS,
  WHATSAPP_CONTACTS,
  PIX_DATA,
  EVENT_VALUE,
  EVENT_CONFIG,
} from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

interface PagamentoStepProps {
  data: Partial<FormData>;
  onChange: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  errors: Record<string, string>;
}

export const PagamentoStep = ({
  data,
  onChange,
  onNext,
  onPrevious,
  errors,
}: PagamentoStepProps) => {
  const { toast } = useToast();
  const [localData, setLocalData] = useState({
    formaPagamento: data.formaPagamento || "",
    valor: EVENT_VALUE,
    parcelas: data.parcelas || "1x",
  });

  const handleChange = (field: string, value: any) => {
    const updates = { ...localData, [field]: value };
    setLocalData(updates);
    onChange(updates);
  };

  const handleNext = () => {
    const hasAllRequired =
      localData.formaPagamento && localData.valor === EVENT_VALUE;

    if (hasAllRequired && !Object.keys(errors).length) {
      onNext();
    }
  };

  const canProceed =
    localData.formaPagamento &&
    localData.valor === EVENT_VALUE &&
    !Object.keys(errors).length;

  const showParcelas = localData.formaPagamento === "cartao";

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_DATA.key);
      toast({
        title: "Chave Pix copiada!",
        description: "A chave foi copiada para sua área de transferência",
        duration: 3000,
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar a chave Pix",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const openWhatsApp = (contact: "maicon" | "gabi") => {
    const number = WHATSAPP_CONTACTS[contact];
    const message = encodeURIComponent(
      "Olá! Gostaria de pagar a inscrição do Fire Camp 2025 no cartão."
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  return (
    <QuestionCard
      title="Pagamento"
      description={`Valor: R$ ${EVENT_VALUE},00 | Prazo: até ${EVENT_CONFIG.paymentDeadline}`}
      onNext={handleNext}
      onPrevious={onPrevious}
      nextDisabled={!canProceed}
    >
      <div className="space-y-6">
        {/* Aviso do prazo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-warning/10 border border-warning/20"
        >
          <p className="text-sm text-warning-foreground font-medium">
            ⏰ <strong>Prazo limite:</strong> Pagamento até{" "}
            {EVENT_CONFIG.paymentDeadline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RadioGroupInput
            label="Forma de pagamento"
            value={localData.formaPagamento}
            onChange={(value) => handleChange("formaPagamento", value)}
            options={FORMAS_PAGAMENTO}
            error={errors.formaPagamento}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TextInput
            label="Valor (R$)"
            type="number"
            value={localData.valor.toString()}
            onChange={() => {}} // Valor fixo, não permite mudança
            placeholder="250.00"
            error={errors.valor}
            required
            helpText="Valor fixo da inscrição"
          />
        </motion.div>

        {showParcelas && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SelectInput
              label="Número de parcelas"
              value={localData.parcelas}
              onChange={(value) => handleChange("parcelas", value)}
              options={OPCOES_PARCELAS}
              placeholder="Selecione o parcelamento"
            />
            <p className="text-xs text-muted-foreground mt-1">
              *Parcelamento no cartão sujeito a juros
            </p>
          </motion.div>
        )}

        {localData.formaPagamento === "pix" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-primary mb-3">
                💰 Dados para Pix
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Chave:</strong> {PIX_DATA.key}
                </p>
                <p>
                  <strong>Nome:</strong> {PIX_DATA.name}
                </p>
                <p>
                  <strong>Banco:</strong> {PIX_DATA.bank}
                </p>
              </div>

              <Button
                onClick={copyPixKey}
                variant="outline"
                size="sm"
                className="w-full mt-3 focus-primary"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar Chave Pix
              </Button>
            </div>

            {/* QR Code real (coloque sua imagem em public/pix-qr.png) */}
            <div className="text-center p-6 rounded-xl bg-muted/50 border border-border">
              <img
                src="/pix-qr.png"
                alt="QR Code Pix"
                className="w-48 h-48 mx-auto rounded-lg border border-border object-contain mb-3"
              />
              <p className="text-sm text-muted-foreground">
                Escaneie o QR Code ou use a chave Pix acima
              </p>
            </div>

            <div className="p-4 rounded-xl bg-accent/30 border border-accent">
              <p className="text-sm text-accent-foreground">
                📲 <strong>Após o pagamento:</strong> Envie o comprovante para
                Maicon ou Gabi no WhatsApp.
              </p>
            </div>
          </motion.div>
        )}

        {localData.formaPagamento === "cartao" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
              <p className="text-sm text-dark mb-4">
                💳 <strong>Pagamento no cartão:</strong> Entre em contato com a
                organização para receber o link de pagamento.
                {showParcelas && localData.parcelas && (
                  <span className="block mt-2">
                    Parcelamento: <strong>{localData.parcelas}</strong> (sujeito
                    a juros)
                  </span>
                )}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => openWhatsApp("maicon")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 focus-primary"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Maicon
                </Button>
                <Button
                  onClick={() => openWhatsApp("gabi")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 focus-primary"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Gabi
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {localData.formaPagamento === "dinheiro" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl bg-accent/30 border border-accent"
          >
            <p className="text-sm text-accent-foreground">
              💵 <strong>Pagamento em dinheiro:</strong> Leve o valor exato (R${" "}
              {EVENT_VALUE},00) no dia do evento. Confirme sua presença com
              antecedência!
            </p>
          </motion.div>
        )}
      </div>
    </QuestionCard>
  );
};
