import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'number';
  required?: boolean;
  autoFocus?: boolean;
  mask?: string;
  helpText?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = 'text',
  required = false,
  autoFocus = false,
  mask,
  helpText
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Apply mask if provided
    if (mask && type === 'tel') {
      // Simple phone mask: (11) 91234-5678
      newValue = newValue.replace(/\D/g, '');
      if (newValue.length >= 11) {
        newValue = newValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (newValue.length >= 7) {
        newValue = newValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (newValue.length >= 3) {
        newValue = newValue.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      }
    }
    
    onChange(newValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <Label htmlFor={label} className="text-foreground font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <Input
        id={label}
        ref={ref}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`
          focus-primary transition-smooth text-base
          ${error ? 'border-destructive focus:ring-destructive' : ''}
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${label}-error` : helpText ? `${label}-help` : undefined}
      />
      
      {helpText && !error && (
        <p id={`${label}-help`} className="text-xs text-muted-foreground">
          {helpText}
        </p>
      )}
      
      {error && (
        <motion.p
          id={`${label}-error`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-xs text-destructive"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
});