import { cva } from 'class-variance-authority';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  label: string;
  icon?: ReactNode;
  isSelect?: boolean;
  textAlign?: 'left' | 'center' | 'right';
};
const styles = cva(``, {
  variants: {
    textAlign: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'text-right',
    },
    isSelect: {
      true: 'bg-primary-100 stroke-primary-500 text-primary-500',
      false: 'hover:bg-neutral-gray-50 active:scale-90 active:bg-neutral-gray-100',
    },
  },
  defaultVariants: {
    textAlign: 'center',
  },
});
export default function ListItem({ label, icon, isSelect, textAlign }: Props) {
  return (
    <li
      className={twMerge(
        'flex flex-1 text-center min-w-fit stroke-neutral-gray-800 cursor-pointer h-9 button2 tablet:h-10 items-center gap-[6px] rounded-lg bg-neutral-gray-0 px-2 text-neutral-gray-800  tablet:px-[14px]',
        styles({ isSelect, textAlign }),
      )}
    >
      {icon && <div>{icon}</div>}
      <p>{label}</p>
    </li>
  );
}
