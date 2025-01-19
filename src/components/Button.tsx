'use client';

import { ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva('flex justify-content align-center gap-2 rounded-lg button1 px-3 py-[11px] tablet:py-2.5 min-w-[70px] h-11', {
  variants: {
    variant: {
      filled: 'bg-primary-500 text-neutral-gray-0  hover:bg-primary-400 active:bg-primary-600 disabled:bg-neutral-gray-300 ',
      outlined: 'border-[1px] bg-neutral-gray-0 text-neutral-gray-950 border-primary-500 ' +
        'hover:text-primary-400 hover:border-primary-400 ' +
        'active:text-primary-500 active:border-primary-500 active:bg-neutral-gray-50 ' +
        'disabled:text-neutral-gray-300 disabled:border-neutral-gray-300'
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
  children: ReactNode,
}

export default function Button({
                                 children, onClick, variant, disabled
                               }: Props) {
  return (
    <button onClick={onClick} className={twMerge(buttonStyles({ variant }))} disabled={disabled}>
      <div>아이콘</div>
      <p>{children}</p>
    </button>
  );
}
