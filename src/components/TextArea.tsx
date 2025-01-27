import { ChangeEvent } from 'react';

type Props = {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  value: string;
  maxLength: number;
};

function TextArea({ onChange, placeholder, value, maxLength }: Props) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      onChange={onChange}
      className="body1 min-h-[420px] w-full resize-none rounded-lg bg-neutral-gray-100 px-3 py-2 pr-9 text-neutral-gray-700 outline-none outline-offset-0 placeholder:text-neutral-gray-700	hover:outline-primary-300 focus:text-neutral-gray-900 focus:caret-primary-600 focus:outline-primary-500 disabled:text-neutral-gray-300"
    />
  );
}

export default TextArea;
