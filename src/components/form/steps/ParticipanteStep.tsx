import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuestionCard } from '../QuestionCard';
import { TextInput } from '../inputs/TextInput';
import { RadioGroupInput } from '../inputs/RadioGroup';
import { FormData } from '@/lib/validation';

interface ParticipanteStepProps {
  data: Partial<FormData>;
  onChange: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious?: () => void;
  errors: Record<string, string>;
}

export const ParticipanteStep = ({
  data,
  onChange,
  onNext,
  onPrevious,
  errors
}: ParticipanteStepProps) => {
  const [localData, setLocalData] = useState({
    nome: data.nome || '',
    email: data.email || '',
    telefone: data.telefone || '',
    nascimento: data.nascimento || '',
    menor: data.menor ?? false
  });

  // Calculat if under 18 based on birth date
  useEffect(() => {
    if (localData.nascimento) {
      const birthDate = new Date(localData.nascimento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      const isUnder18 = age < 18 || (age === 18 && monthDiff < 0) || 
        (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate());
      
      if (isUnder18 !== localData.menor) {
        const updates = { ...localData, menor: isUnder18 };
        setLocalData(updates);
        onChange(updates);
      }
    }
  }, [localData.nascimento, localData.menor, onChange]);

  const handleChange = (field: string, value: any) => {
    const updates = { ...localData, [field]: value };
    setLocalData(updates);
    onChange(updates);
  };

  const handleNext = () => {
    // Final validation before proceeding
    const hasAllRequired = 
      localData.nome.trim() && 
      localData.email.trim() && 
      localData.telefone.trim() && 
      localData.nascimento;

    if (hasAllRequired && !Object.keys(errors).length) {
      onNext();
    }
  };

  const canProceed = 
    localData.nome.trim() && 
    localData.email.trim() && 
    localData.telefone.trim() && 
    localData.nascimento &&
    !Object.keys(errors).length;

  return (
    <QuestionCard
      title="Dados do Participante"
      description="Informe seus dados básicos para começar a inscrição"
      onNext={handleNext}
      onPrevious={onPrevious}
      nextDisabled={!canProceed}
      isFirst
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TextInput
            label="Nome completo"
            value={localData.nome}
            onChange={(value) => handleChange('nome', value)}
            placeholder="Digite seu nome completo"
            error={errors.nome}
            required
            autoFocus
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TextInput
            label="E-mail"
            type="email"
            value={localData.email}
            onChange={(value) => handleChange('email', value)}
            placeholder="seuemail@exemplo.com"
            error={errors.email}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TextInput
            label="Telefone (WhatsApp)"
            type="tel"
            value={localData.telefone}
            onChange={(value) => handleChange('telefone', value)}
            placeholder="(11) 91234-5678"
            mask="(99) 99999-9999"
            helpText="Formato: (11) 91234-5678"
            error={errors.telefone}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TextInput
            label="Data de nascimento"
            type="date"
            value={localData.nascimento}
            onChange={(value) => handleChange('nascimento', value)}
            error={errors.nascimento}
            required
          />
        </motion.div>

        {localData.nascimento && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl bg-accent/30 border border-accent"
          >
            <p className="text-sm text-accent-foreground">
              {localData.menor 
                ? '⚠️ Como você é menor de 18 anos, precisaremos dos dados do seu responsável na próxima etapa.'
                : '✅ Você é maior de idade, não será necessário informar dados do responsável.'
              }
            </p>
          </motion.div>
        )}
      </div>
    </QuestionCard>
  );
};