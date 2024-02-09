import { InputHTMLAttributes, forwardRef } from 'react';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

// eslint-disable-next-line react/display-name
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({ className, label, ...args }, ref) => {
  return (
    <>
      <div className="flex gap-4 items-center mb-2">
        <label className="w-12 h-6 relative">
          <input
            id={args.id}
            type="checkbox"
            checked={args.checked}
            onChange={args.onChange}
            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
            {...args}
            ref={ref}
          />
          <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300" />
        </label>
        <span>{label}</span>
      </div>
    </>
  );
});
