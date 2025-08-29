import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionCard } from '../QuestionCard';
import { RadioGroupInput } from '../inputs/RadioGroup';
import { FormData } from '@/lib/validation';
import { TAMANHOS_CAMISETA } from '@/lib/constants';

interface TamanhoStepProps {
  data: Partial<FormData>;
  onChange: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  errors: Record<string, string>;
}

export const TamanhoStep = ({
  data,
  onChange,
  onNext,
  onPrevious,
  errors
}: TamanhoStepProps) => {
  const [localData, setLocalData] = useState({
    tamanho: data.tamanho || ''
  });

  const handleChange = (value: string) => {
    const updates = { tamanho: value };
    setLocalData(updates);
    onChange(updates);
  };

  const handleNext = () => {
    if (localData.tamanho && !Object.keys(errors).length) {
      onNext();
    }
  };

  const canProceed = localData.tamanho && !Object.keys(errors).length;

  return (
    <QuestionCard
      title="Tamanho da Camiseta"
      description="Escolha o tamanho ideal para receber sua camiseta do acampamento"
      onNext={handleNext}
      onPrevious={onPrevious}
      nextDisabled={!canProceed}
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 rounded-xl bg-accent/20"
        >
          <div className="text-4xl mb-2">👕</div>
          <p className="text-sm text-muted-foreground">
            Selecione o tamanho que melhor se adapta a você
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RadioGroupInput
            label="Tamanho"
            value={localData.tamanho}
            onChange={handleChange}
            options={TAMANHOS_CAMISETA}
            error={errors.tamanho}
            required
          />
        </motion.div>

        {localData.tamanho && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl bg-success/10 border border-success/20"
          >
            <p className="text-sm text-success-foreground">
              ✅ Tamanho <strong>{localData.tamanho}</strong> selecionado! 
              Sua camiseta estará esperando por você no acampamento.
            </p>
          </motion.div>
        )}
      </div>
    </QuestionCard>
  );
};