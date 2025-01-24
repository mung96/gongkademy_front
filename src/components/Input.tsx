import { ChangeEvent, ReactNode } from 'react';

type Props = {
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  value: string;
};

export default function Input({ value, placeholder, onChange, icon }: Props) {
  return (
    <div className="relative w-full min-w-[220px] tablet:w-[132px]">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="body1 h-[42px] w-full rounded-lg bg-neutral-gray-100 px-3 py-2 pr-9 text-neutral-gray-700 outline-none outline-offset-0	hover:outline-primary-300 focus:text-neutral-gray-900 focus:caret-primary-600 focus:outline-primary-500 disabled:text-neutral-gray-300  "
      />
      {icon && <div className="absolute right-3 top-[9px] stroke-neutral-gray-400 ">{icon}</div>}
    </div>
  );
}
