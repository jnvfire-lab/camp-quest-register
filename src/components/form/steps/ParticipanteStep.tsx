import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionCard } from '../QuestionCard';
import { TextInput } from '../inputs/TextInput';
import { FormData } from '@/lib/validation';
import { PHONE_MASK } from '@/lib/constants';

interface ParticipanteStepProps {
  data: Partial<FormData>;
  onChange: (updates: Partial<FormData>) => void;
  onNext: () => void;
  errors: Record<string, string>;
}

export const ParticipanteStep = ({
  data,
  onChange,
  onNext,
  errors
}: ParticipanteStepProps) => {
  const [localData, setLocalData] = useState({
    nome: data.nome || '',
    email: data.email || '',
    telefone: data.telefone || '',
    nascimento: data.nascimento || '',
    menor: data.menor || false
  });

  const handleChange = (field: string, value: any) => {
    let updates = { ...localData, [field]: value };
    
    // Se mudou a data de nascimento, calcular se é menor
    if (field === 'nascimento' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      updates.menor = calculatedAge < 18;
    }
    
    setLocalData(updates);
    onChange(updates);
  };

  const handleNext = () => {
    const hasAllRequired = 
      localData.nome && 
      localData.email && 
      localData.telefone && 
      localData.nascimento;

    if (hasAllRequired && !Object.keys(errors).length) {
      onNext();
    }
  };

  const canProceed = 
    localData.nome && 
    localData.email && 
    localData.telefone && 
    localData.nascimento &&
    !Object.keys(errors).length;

  // Check if age is less than 11 to block progression
  const isUnderageBlocked = () => {
    if (!localData.nascimento) return false;
    
    const birthDate = new Date(localData.nascimento);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    
    return calculatedAge < 11;
  };

  return (
    <QuestionCard
      title="Dados do Participante"
      description="Vamos começar com suas informações básicas para a inscrição"
      onNext={handleNext}
      nextDisabled={!canProceed || isUnderageBlocked()}
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
            placeholder="Seu nome completo"
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
            placeholder="seu@email.com"
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
            mask={PHONE_MASK}
            error={errors.telefone}
            required
            helpText="Utilizaremos para comunicações importantes"
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
            helpText="Idade mínima: 11 anos"
          />
        </motion.div>

        {isUnderageBlocked() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl bg-destructive/10 border border-destructive/20"
          >
            <p className="text-sm text-destructive font-medium">
              ⚠️ Inscrições apenas a partir de 11 anos.
            </p>
          </motion.div>
        )}

        {localData.menor && !isUnderageBlocked() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl bg-accent/30 border border-accent"
          >
            <p className="text-sm text-accent-foreground">
              📋 Como você é menor de 18 anos, precisaremos dos dados do seu responsável na próxima etapa.
            </p>
          </motion.div>
        )}
      </div>
    </QuestionCard>
  );
};