'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error.message);
    console.log('error발생 global');
  }, []);

  return (
    <div>
      <h1>오류발생</h1>
      <Button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시시도
      </Button>
    </div>
  );
}
