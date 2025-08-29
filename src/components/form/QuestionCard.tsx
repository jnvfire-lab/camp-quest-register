import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

export const QuestionCard = ({
  title,
  description,
  children,
  onNext,
  onPrevious,
  nextDisabled = false,
  nextLabel = "Próximo",
  previousLabel = "Anterior",
  isFirst = false,
  isLast = false,
  className = ""
}: QuestionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-card border border-border rounded-2xl p-6 md:p-8 
        shadow-card max-w-2xl mx-auto w-full min-h-[400px]
        flex flex-col ${className}
      `}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 mb-6"
      >
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center gap-4"
      >
        {!isFirst ? (
          <Button
            variant="outline"
            onClick={onPrevious}
            className="flex items-center gap-2 focus-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            {previousLabel}
          </Button>
        ) : (
          <div />
        )}

        <Button
          onClick={onNext}
          disabled={nextDisabled}
          className={`
            flex items-center gap-2 focus-primary transition-smooth
            ${isLast 
              ? 'bg-success hover:bg-success/90 text-success-foreground' 
              : 'bg-gradient-primary hover:shadow-glow'
            }
          `}
        >
          {isLast ? 'Finalizar Inscrição' : nextLabel}
          {!isLast && <ArrowRight className="w-4 h-4" />}
        </Button>
      </motion.div>
    </motion.div>
  );
};