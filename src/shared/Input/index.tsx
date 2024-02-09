import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  errorMsg?: string;
  required?: boolean;
  label?: string;
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, errorMsg, required, label, ...args }, ref) => {
  const { t } = useTranslation();

  return (
    <>
      {label && (
        <label htmlFor={args.id}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input type="text" className={`form-input ${error && 'border-red-500'} ${className}`} ref={ref} {...args} />
      {error && <span className="text-red-500">{errorMsg ? t(errorMsg) : t(`${error.message}`)}</span>}
    </>
  );
});
