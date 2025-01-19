'use client';

import { ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva('flex justify-content items-center gap-2 rounded-lg button1 px-3  min-w-[70px] h-11', {
  variants: {
    variant: {
      filled: 'bg-primary-500 text-neutral-gray-0  hover:bg-primary-400 active:bg-primary-600 disabled:bg-neutral-gray-300 stroke-neutral-gray-0',
      outlined: 'border-[1px] bg-neutral-gray-0 text-neutral-gray-950 border-primary-500 stroke-neutral-gray-950 ' +
        'hover:text-primary-400 hover:border-primary-400 hover:stroke-primary-400 ' +
        'active:text-primary-500 active:border-primary-500 active:bg-neutral-gray-50 active:stroke-primary-500 ' +
        'disabled:text-neutral-gray-300 disabled:border-neutral-gray-300 disabled:stroke-neutral-gray-300'
    }
  },
  defaultVariants: {
    variant: 'filled'
  }
});

type Props = VariantProps<typeof buttonStyles> & {
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
  onClick: () => void;
  icon?: ReactNode,
  children: ReactNode,
}

export default function Button({ children, onClick, variant, disabled, icon }: Props) {
  return (
    <button onClick={onClick} className={twMerge(buttonStyles({ variant }))} disabled={disabled}>
      {icon && <div className='flex items-center justify-center w-6 h-6'>{icon}</div>}
      <p>{children}</p>
    </button>
  );
}
