import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CheckboxInputProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  required?: boolean;
}

export const CheckboxInput = ({
  label,
  description,
  checked,
  onChange,
  error,
  required = false
}: CheckboxInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className={`
        flex items-start space-x-3 p-4 rounded-xl border border-border
        transition-smooth cursor-pointer
        ${checked 
          ? 'border-primary bg-accent/50' 
          : 'hover:bg-accent/20 hover:border-primary/50'
        }
        ${error ? 'border-destructive' : ''}
      `}>
        <Checkbox
          id={label}
          checked={checked}
          onCheckedChange={onChange}
          className="mt-0.5 focus-primary"
          aria-invalid={!!error}
        />
        <div className="flex-1">
          <Label
            htmlFor={label}
            className="cursor-pointer font-medium text-foreground"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-xs text-destructive"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};