import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormData, validateStep } from '@/lib/validation';
import { saveFormData, loadFormData, saveCurrentStep, loadCurrentStep, clearFormData } from '@/lib/storage';
import { getDataAdapter } from '@/lib/data/adapter';
import { useToast } from '@/hooks/use-toast';

import { ProgressBar } from './ProgressBar';
import { ParticipanteStep } from './steps/ParticipanteStep';
import { ResponsavelStep } from './steps/ResponsavelStep';
import { TamanhoStep } from './steps/TamanhoStep';
import { PagamentoStep } from './steps/PagamentoStep';
import { ObservacoesStep } from './steps/ObservacoesStep';
import { SucessoStep } from './steps/SucessoStep';

const STEPS = [
  'participante',
  'responsavel', 
  'tamanho',
  'pagamento',
  'observacoes'
];

export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const {
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      nascimento: '',
      menor: false,
      responsavelNome: '',
      responsavelTelefone: '',
      autorizacao: false,
      tamanho: '',
      formaPagamento: '',
      valor: 0,
      parcelas: '1x',
      observacoes: ''
    }
  });

  const data = watch();

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadFormData();
    const savedStep = loadCurrentStep();
    
    if (Object.keys(savedData).length > 0) {
      Object.entries(savedData).forEach(([key, value]) => {
        setValue(key as keyof FormData, value);
      });
      
      if (savedStep && STEPS.includes(savedStep)) {
        setCurrentStep(STEPS.indexOf(savedStep));
        toast({
          title: "Dados restaurados",
          description: "Continuando de onde você parou!",
          duration: 3000,
        });
      }
    }
  }, [setValue, toast]);

  // Auto-save data
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveFormData(data);
      saveCurrentStep(STEPS[currentStep]);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [data, currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSuccess) return;
      
      // Prevent default behavior for form navigation keys
      if (e.key === 'Enter' && !e.shiftKey && !isTextarea(e.target)) {
        e.preventDefault();
        handleNext();
      }
      
      if (e.key === 'ArrowRight' && e.ctrlKey) {
        e.preventDefault();
        handleNext();
      }
      
      if (e.key === 'ArrowLeft' && e.ctrlKey) {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, data, isSuccess]);

  const isTextarea = (target: EventTarget | null): boolean => {
    return target instanceof HTMLTextAreaElement;
  };

  const validateCurrentStep = async () => {
    const stepKey = STEPS[currentStep];
    const result = validateStep(stepKey, data);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      if ('error' in result && result.error?.issues) {
        result.error.issues.forEach((issue) => {
          newErrors[issue.path[0]] = issue.message;
        });
      }
      setStepErrors(newErrors);
      return false;
    }
    
    setStepErrors({});
    return true;
  };

  const handleNext = async () => {
    if (isSubmitting) return;
    
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleDataChange = (updates: Partial<FormData>) => {
    Object.entries(updates).forEach(([key, value]) => {
      setValue(key as keyof FormData, value);
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Final validation
      const isValid = await trigger();
      if (!isValid) {
        throw new Error('Dados inválidos');
      }

      // Submit to adapter
      const adapter = getDataAdapter();
      const submission = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        nascimento: data.nascimento,
        menor: data.menor,
        responsavelNome: data.responsavelNome,
        responsavelTelefone: data.responsavelTelefone,
        autorizacao: data.autorizacao,
        tamanho: data.tamanho,
        formaPagamento: data.formaPagamento,
        valor: data.valor,
        parcelas: data.parcelas,
        observacoes: data.observacoes
      };

      const result = await adapter.save(submission);
      
      if (result.ok) {
        setIsSuccess(true);
        clearFormData();
        toast({
          title: "Sucesso!",
          description: "Inscrição enviada com sucesso!",
          duration: 5000,
        });
      } else {
        throw new Error('Falha ao enviar inscrição');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a inscrição. Tente novamente.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setIsSuccess(false);
    setCurrentStep(0);
    setStepErrors({});
    clearFormData();
    
    // Reset form
    Object.keys(data).forEach(key => {
      setValue(key as keyof FormData, '');
    });
    setValue('menor', false);
    setValue('autorizacao', false);
    setValue('valor', 0);
    setValue('parcelas', '1x');
  };

  if (isSuccess) {
    return <SucessoStep onRestart={handleRestart} />;
  }

  const currentStepKey = STEPS[currentStep];
  const isResponsavelRequired = data.menor === true;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <ProgressBar 
        currentStep={currentStep + 1} 
        totalSteps={STEPS.length} 
      />

      <AnimatePresence mode="wait">
        {currentStepKey === 'participante' && (
          <ParticipanteStep
            key="participante"
            data={data}
            onChange={handleDataChange}
            onNext={handleNext}
            errors={stepErrors}
          />
        )}

        {currentStepKey === 'responsavel' && (
          <ResponsavelStep
            key="responsavel"
            data={data}
            onChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            errors={stepErrors}
            isRequired={isResponsavelRequired}
          />
        )}

        {currentStepKey === 'tamanho' && (
          <TamanhoStep
            key="tamanho"
            data={data}
            onChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            errors={stepErrors}
          />
        )}

        {currentStepKey === 'pagamento' && (
          <PagamentoStep
            key="pagamento"
            data={data}
            onChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            errors={stepErrors}
          />
        )}

        {currentStepKey === 'observacoes' && (
          <ObservacoesStep
            key="observacoes"
            data={data}
            onChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            errors={stepErrors}
          />
        )}
      </AnimatePresence>

      {/* Loading overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 text-center shadow-card">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-foreground">Enviando inscrição...</p>
          </div>
        </div>
      )}
    </div>
  );
};