import { useState } from "react";
import { motion } from "framer-motion";
import { QuestionCard } from "../QuestionCard";
import { TextInput } from "../inputs/TextInput";
import { CheckboxInput } from "../inputs/CheckboxInput";
import { FormData } from "@/lib/validation";

interface ResponsavelStepProps {
  data: Partial<FormData>;
  onChange: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  errors: Record<string, string>;
  isRequired: boolean;
}

export const ResponsavelStep = ({
  data,
  onChange,
  onNext,
  onPrevious,
  errors,
  isRequired,
}: ResponsavelStepProps) => {
  const [localData, setLocalData] = useState({
    responsavelNome: data.responsavelNome || "",
    responsavelTelefone: data.responsavelTelefone || "",
    autorizacao: data.autorizacao || false,
  });

  const handleChange = (field: string, value: any) => {
    const updates = { ...localData, [field]: value };
    setLocalData(updates);
    onChange(updates);
  };

  const handleNext = () => {
    if (!isRequired) {
      onNext();
      return;
    }

    const hasAllRequired =
      localData.responsavelNome.trim() &&
      localData.responsavelTelefone.trim() &&
      localData.autorizacao;

    if (hasAllRequired && !Object.keys(errors).length) {
      onNext();
    }
  };

  // Skip this step if participant is not a minor
  if (!isRequired) {
    return (
      <QuestionCard
        title="Dados do Responsável"
        description="Como você é maior de idade, vamos pular esta etapa"
        onNext={onNext}
        onPrevious={onPrevious}
        nextLabel="Continuar"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="text-6xl mb-4">✅</div>
          <p className="text-muted-foreground">
            Etapa não necessária para maiores de idade
          </p>
        </motion.div>
      </QuestionCard>
    );
  }

  const canProceed =
    localData.responsavelNome.trim() &&
    localData.responsavelTelefone.trim() &&
    localData.autorizacao &&
    !Object.keys(errors).length;

  return (
    <QuestionCard
      title="Dados do Responsável"
      description="Como você é menor de 18 anos, precisamos dos dados do seu responsável"
      onNext={handleNext}
      onPrevious={onPrevious}
      nextDisabled={!canProceed}
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-warning/10 border border-warning/20"
        >
          <p className="text-sm text-dark">
            ⚠️ <strong>Atenção:</strong> Para participar do acampamento sendo
            menor de idade, é obrigatório o preenchimento dos dados do
            responsável e sua autorização.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TextInput
            label="Nome do responsável"
            value={localData.responsavelNome}
            onChange={(value) => handleChange("responsavelNome", value)}
            placeholder="Nome completo do responsável legal"
            error={errors.responsavelNome}
            required
            autoFocus
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TextInput
            label="Telefone do responsável"
            type="tel"
            value={localData.responsavelTelefone}
            onChange={(value) => handleChange("responsavelTelefone", value)}
            placeholder="(11) 91234-5678"
            mask="(99) 99999-9999"
            helpText="Telefone para contato em caso de emergência"
            error={errors.responsavelTelefone}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CheckboxInput
            label="Autorizo a participação no acampamento"
            description="Declaro estar ciente das atividades e autorizo a participação do menor no evento"
            checked={localData.autorizacao}
            onChange={(checked) => handleChange("autorizacao", checked)}
            error={errors.autorizacao}
            required
          />
        </motion.div>
      </div>
    </QuestionCard>
  );
};
