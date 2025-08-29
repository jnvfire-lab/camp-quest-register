import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
  required?: boolean;
}

export const RadioGroupInput = ({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
}: RadioGroupInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Label className="text-foreground font-medium text-base">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid gap-3"
        aria-invalid={!!error}
      >
        {options.map((option, index) => (
          <motion.div
            onClick={() => onChange(option.value)}
            key={option.value}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              flex items-start space-x-3 p-4 rounded-xl border border-border
              hover:border-primary/50 transition-smooth cursor-pointer
              ${
                value === option.value
                  ? "border-primary bg-accent/50"
                  : "hover:bg-accent/20"
              }
            `}
          >
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="mt-0.5 focus-primary"
            />
            <div className="flex-1">
              <Label
                htmlFor={option.value}
                className="cursor-pointer font-medium text-foreground"
              >
                {option.label}
              </Label>
              {option.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </RadioGroup>

      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-xs text-destructive"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
