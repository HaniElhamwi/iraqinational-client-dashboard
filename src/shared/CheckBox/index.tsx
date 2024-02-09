import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  errorMsg?: string;
  required?: boolean;
}

// eslint-disable-next-line react/display-name
export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({ className, error, errorMsg, required, label, ...args }, ref) => {
  const { t } = useTranslation();

  return (
    <>
      {/* {label && (
        <label htmlFor={args.id}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input type="text" className={`form-input ${error && 'border-red-500'} ${className}`} />
      */}

      <label className="inline-flex">
        <input type="checkbox" className="form-checkbox text-success peer" ref={ref} {...args} />
        <span className="peer-checked:text-success">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      </label>
      {error && <span className="text-red-500">{errorMsg ? t(errorMsg) : t(`${error.message}`)}</span>}
    </>
  );
});
