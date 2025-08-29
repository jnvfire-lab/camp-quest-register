import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionCard } from '../QuestionCard';
import { RadioGroupInput } from '../inputs/RadioGroup';
import { SelectInput } from '../inputs/SelectInput';
import { TextInput } from '../inputs/TextInput';
import { FormData } from '@/lib/validation';
import { FORMAS_PAGAMENTO, OPCOES_PARCELAS } from '@/lib/constants';

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
  errors
}: PagamentoStepProps) => {
  const [localData, setLocalData] = useState({
    formaPagamento: data.formaPagamento || '',
    valor: data.valor || 0,
    parcelas: data.parcelas || '1x'
  });

  const handleChange = (field: string, value: any) => {
    const updates = { ...localData, [field]: value };
    setLocalData(updates);
    onChange(updates);
  };

  const handleNext = () => {
    const hasAllRequired = 
      localData.formaPagamento && 
      localData.valor > 0;

    if (hasAllRequired && !Object.keys(errors).length) {
      onNext();
    }
  };

  const canProceed = 
    localData.formaPagamento && 
    localData.valor > 0 &&
    !Object.keys(errors).length;

  const showParcelas = localData.formaPagamento === 'cartao';

  return (
    <QuestionCard
      title="Pagamento"
      description="Informe como prefere realizar o pagamento da inscrição"
      onNext={handleNext}
      onPrevious={onPrevious}
      nextDisabled={!canProceed}
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <RadioGroupInput
            label="Forma de pagamento"
            value={localData.formaPagamento}
            onChange={(value) => handleChange('formaPagamento', value)}
            options={FORMAS_PAGAMENTO}
            error={errors.formaPagamento}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TextInput
            label="Valor (R$)"
            type="number"
            value={localData.valor.toString()}
            onChange={(value) => handleChange('valor', Number(value) || 0)}
            placeholder="150.00"
            error={errors.valor}
            required
          />
        </motion.div>

        {showParcelas && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SelectInput
              label="Número de parcelas"
              value={localData.parcelas}
              onChange={(value) => handleChange('parcelas', value)}
              options={OPCOES_PARCELAS}
              placeholder="Selecione o parcelamento"
            />
          </motion.div>
        )}

        {localData.formaPagamento === 'pix' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-primary/10 border border-primary/20"
          >
            <p className="text-sm text-primary-foreground/80">
              💰 <strong>Pagamento via Pix:</strong> Ao finalizar a inscrição, 
              você receberá os dados para transferência via Pix.
            </p>
          </motion.div>
        )}

        {localData.formaPagamento === 'cartao' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-warning/10 border border-warning/20"
          >
            <p className="text-sm text-warning-foreground">
              💳 <strong>Pagamento no cartão:</strong> Entre em contato com a organização 
              pelos dados fornecidos ao final da inscrição.
              {showParcelas && localData.parcelas && (
                <span className="block mt-1">
                  Parcelamento: <strong>{localData.parcelas}</strong>
                </span>
              )}
            </p>
          </motion.div>
        )}

        {localData.formaPagamento === 'dinheiro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-accent/30 border border-accent"
          >
            <p className="text-sm text-accent-foreground">
              💵 <strong>Pagamento em dinheiro:</strong> Leve o valor exato no dia do evento. 
              Confirme sua presença com antecedência!
            </p>
          </motion.div>
        )}
      </div>
    </QuestionCard>
  );
};