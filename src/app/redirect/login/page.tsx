'use client';

import LoginContent from '@/auth/LoginContent';
import LoadingComponent from '@/components/LoadingComponent';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <LoginContent />
    </Suspense>
  );
}
