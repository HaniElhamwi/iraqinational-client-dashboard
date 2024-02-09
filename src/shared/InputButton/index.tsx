import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface InputButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  errorMsg?: string;
  required?: boolean;
  label?: string;
  onClick?: () => void;
  buttonLabel?: string;
}

// eslint-disable-next-line react/display-name
export const InputButton = forwardRef<HTMLInputElement, InputButtonProps>((props, ref) => {
  const { className, error, errorMsg, required, label, onClick, buttonLabel, ...args } = props;
  const { t } = useTranslation();

  return (
    <>
      {label && (
        <label htmlFor={args.id}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex w-full">
        <input
          type="text"
          className={`form-input ltr:rounded-r-none rtl:rounded-l-none ${error && 'border-red-500'} ${className || ''}`}
          ref={ref} // Forward the ref here
          {...args}
        />

        <button
          type="button"
          className={`btn btn-outline-info ltr:rounded-l-none rtl:rounded-r-none text-xs ${error && 'border-red-500'}`}
          onClick={onClick}
        >
          {buttonLabel ? buttonLabel : t('generate')}
        </button>
      </div>

      {error && <span className="text-red-500">{errorMsg ? t(errorMsg) : t(`${error.message}`)}</span>}
    </>
  );
});
