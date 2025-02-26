'use client';

import Button from '@/components/Button';
import { PATH } from '@/constants/path';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4">
      <p className="title1 text-primary-500">여긴 아무 것도 없어요</p>
      <div className="flex flex-col items-center justify-center">
        <p className="body1">주소를 잘못 입력했거나 이젠 접속할 수 없는 페이지에요.</p>
        <p className="body1">여기 있지 말고 공부하러 갈까요?</p>
      </div>
      <Button
        onClick={() => {
          startTransition(() => {
            router.push(PATH.COURSES);
          });
        }}
      >
        강좌 이동
      </Button>
    </div>
  );
}
