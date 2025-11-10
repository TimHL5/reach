import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidation?: (isValid: boolean) => void;
  placeholder?: string;
  className?: string;
}

export const EmailInput = ({
  value,
  onChange,
  onValidation,
  placeholder = 'your@email.com',
  className = ''
}: EmailInputProps) => {
  const [touched, setTouched] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const showValidation = touched && value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        type="email"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onValidation?.(isValid);
        }}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        className={`
          w-full px-6 py-4 text-lg rounded-lg border-2 transition-all
          focus:outline-none focus:border-reach-blue
          ${showValidation && !isValid ? 'border-error' : 'border-gray-300'}
        `}
        aria-label="Email address"
        aria-invalid={showValidation && !isValid}
      />
      {showValidation && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {isValid ? (
            <Check className="text-success" size={24} aria-label="Valid email" />
          ) : (
            <AlertCircle className="text-error" size={24} aria-label="Invalid email" />
          )}
        </div>
      )}
    </div>
  );
};
