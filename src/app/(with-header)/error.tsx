'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error.message);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="title1 text-neutral-gray-950">잠시 문제가 있는 것 같아요</p>
      <Button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도 하기
      </Button>
    </div>
  );
}
