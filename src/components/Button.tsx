'use client';

import { ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const styles = cva('button1 flex h-11 w-full min-w-[70px] items-center justify-center gap-2  rounded-lg px-3', {
  variants: {
    variant: {
      filled:
        'bg-primary-500 stroke-neutral-gray-0 text-neutral-gray-0 hover:bg-primary-400 active:bg-primary-600 disabled:bg-neutral-gray-300',
      outlined:
        'border-[1px] bg-neutral-gray-0 text-neutral-gray-950 border-primary-500 stroke-neutral-gray-950 ' +
        'hover:text-primary-400 hover:border-primary-400 hover:stroke-primary-400 ' +
        'active:text-primary-500 active:border-primary-500 active:bg-neutral-gray-50 active:stroke-primary-500 ' +
        'disabled:text-neutral-gray-300 disabled:border-neutral-gray-300 disabled:stroke-neutral-gray-300',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

type Props = VariantProps<typeof styles> & {
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
  onClick: () => void;
  icon?: ReactNode;
  children: ReactNode;
};

export default function Button({ children, onClick, variant, disabled, icon }: Props) {
  return (
    <button onClick={onClick} className={twMerge(styles({ variant }))} disabled={disabled}>
      {icon && <div className="flex size-6 items-center justify-center">{icon}</div>}
      <p>{children}</p>
    </button>
  );
}
