'use client';

import { PATH } from '@/constants/path';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    async function login() {
      try {
        const result = await signIn('credentials', { redirect: false });
        console.log('자동 로그인 결과:', result);
        router.push(PATH.HOME);
      } catch (e) {
        console.error('자동 로그인 에러:', e);
      }
    }
    login();
  }, []);
  return <div>로그인 중입니다.</div>;
}
