import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionCard } from '../QuestionCard';
import { TextareaInput } from '../inputs/TextareaInput';
import { FormData } from '@/lib/validation';

interface ObservacoesStepProps {
  data: Partial<FormData>;
  onChange: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  errors: Record<string, string>;
}

export const ObservacoesStep = ({
  data,
  onChange,
  onNext,
  onPrevious,
  errors
}: ObservacoesStepProps) => {
  const [localData, setLocalData] = useState({
    observacoes: data.observacoes || ''
  });

  const handleChange = (value: string) => {
    const updates = { observacoes: value };
    setLocalData(updates);
    onChange(updates);
  };

  const handleNext = () => {
    if (!Object.keys(errors).length) {
      onNext();
    }
  };

  const canProceed = !Object.keys(errors).length;

  return (
    <QuestionCard
      title="Observações e Restrições"
      description="Nos conte sobre restrições alimentares ou informações importantes"
      onNext={handleNext}
      onPrevious={onPrevious}
      nextDisabled={!canProceed}
      nextLabel="Finalizar Inscrição"
      isLast
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 rounded-xl bg-accent/20"
        >
          <div className="text-4xl mb-2">📝</div>
          <p className="text-sm text-muted-foreground">
            Última etapa! Compartilhe informações importantes sobre você
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TextareaInput
            label="Observações"
            value={localData.observacoes}
            onChange={handleChange}
            placeholder="Ex: Sou alérgico a amendoim, vegetariano, tenho dificuldade para caminhar, etc."
            rows={6}
            maxLength={500}
            error={errors.observacoes}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <h4 className="font-medium text-success-foreground mb-2">✅ Incluir se tiver:</h4>
            <ul className="text-xs text-success-foreground/80 space-y-1">
              <li>• Alergias alimentares</li>
              <li>• Restrições religiosas</li>
              <li>• Necessidades especiais</li>
              <li>• Medicamentos importantes</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <h4 className="font-medium text-primary-foreground/80 mb-2">💡 Dica:</h4>
            <p className="text-xs text-primary-foreground/70">
              Essas informações nos ajudam a preparar melhor as refeições 
              e atividades para garantir que todos se divirtam com segurança!
            </p>
          </div>
        </motion.div>

        {!localData.observacoes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-muted/50 border border-muted"
          >
            <p className="text-sm text-muted-foreground text-center">
              Este campo é opcional. Se não há nada especial a informar, 
              pode prosseguir para finalizar sua inscrição! 🎉
            </p>
          </motion.div>
        )}
      </div>
    </QuestionCard>
  );
};