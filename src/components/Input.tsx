import { ChangeEvent, ReactNode } from 'react';
import { FieldValues, Path, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type FormInputProps<T extends FieldValues> = {
  label: Path<T>;
  register?: UseFormRegisterReturn;
  required?: boolean;
};

export default function Input<T extends FieldValues>({
  value,
  placeholder,
  onChange,
  icon,
  register,
  onKeyDown,
}: Props & FormInputProps<T>) {
  return (
    <div className="relative w-full min-w-[220px] flex-1">
      <input
        value={value}
        placeholder={placeholder}
        {...(register ? register : { onChange })}
        onKeyDown={onKeyDown}
        className="body1 h-[42px] w-full rounded-lg bg-neutral-gray-100 px-3 py-2 pr-9 text-neutral-gray-700 outline-none outline-offset-0 placeholder:text-neutral-gray-700	hover:outline-primary-300 focus:text-neutral-gray-900 focus:caret-primary-600 focus:outline-primary-500 disabled:text-neutral-gray-300  "
      />
      {icon && <div className="absolute right-3 top-[9px] stroke-neutral-gray-400 ">{icon}</div>}
    </div>
  );
}
