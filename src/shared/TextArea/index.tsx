import { TextareaHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
  errorMsg?: string;
  required?: boolean;
  label?: string;
}

// eslint-disable-next-line react/display-name
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, error, errorMsg, required, label, ...args }, ref) => {
  const { t } = useTranslation();

  return (
    <>
      {label && (
        <label htmlFor={args.id}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea className={`form-textarea ${error ? 'border-red-500' : ''}`} ref={ref} {...args} />
      {error && <span className="text-red-500">{errorMsg ? t(errorMsg) : t(`${error.message}`)}</span>}
    </>
  );
});
