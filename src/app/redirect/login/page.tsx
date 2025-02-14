'use client';

import LoginContent from '@/auth/LoginContent';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <LoginContent />
    </Suspense>
  );
}
