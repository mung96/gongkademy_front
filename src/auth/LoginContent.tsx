'use client';

import React, { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get('redirect_uri') || '/';

  useEffect(() => {
    async function login() {
      try {
        const result = await signIn('credentials', {
          redirect: false,
        });
        console.log('자동 로그인 결과:', result);
        // 로그인 성공 후 callbackUrl로 이동합니다.
        router.push(redirectUri);
      } catch (e) {
        console.error('자동 로그인 에러:', e);
      }
    }
    login();
  }, []);

  return <div>로그인 중입니다.</div>;
}
