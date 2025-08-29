import { motion } from 'framer-motion';
import { FORM_STEPS } from '@/lib/constants';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden shadow-sm">
        <motion.div
          className="h-full bg-gradient-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {/* Step info */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-muted-foreground">
          Etapa {currentStep} de {totalSteps}
        </div>
        <div className="text-sm font-medium text-primary">
          {Math.round(progress)}% concluído
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-4">
        {FORM_STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-2
                  ${isCompleted 
                    ? 'bg-primary text-primary-foreground shadow-primary' 
                    : isCurrent 
                    ? 'bg-primary-light text-primary border-2 border-primary' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {isCompleted ? '✓' : index + 1}
              </motion.div>
              <span className={`
                text-xs max-w-[60px] leading-tight
                ${isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'}
              `}>
                {step.title.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};