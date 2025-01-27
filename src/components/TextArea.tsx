import { FormInputProps } from '@/components/Input';
import { ChangeEvent } from 'react';
import { FieldValues } from 'react-hook-form';

type Props = {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  value?: string;
  maxLength: number;
};

function TextArea<T extends FieldValues>({
  onChange,
  placeholder,
  value,
  maxLength,
  label,
  register,
  required,
}: Props & FormInputProps<T>) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      {...(register ? register(label, { required }) : { onChange })}
      className="body1 h-1.5 min-h-[420px] w-full resize-none rounded-lg bg-neutral-gray-100 px-3 py-2 pr-9 text-neutral-gray-700 outline-none outline-offset-0 placeholder:text-neutral-gray-700	hover:outline-primary-300 focus:text-neutral-gray-900 focus:caret-primary-600 focus:outline-primary-500 disabled:text-neutral-gray-300"
    />
  );
}

export default TextArea;
