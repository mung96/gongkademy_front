'use client';

import { PATH } from '@/constants/path';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 쿼리 파라미터로부터 callbackUrl을 읽고, 없으면 기본값으로 PATH.HOME을 사용합니다.
  const callbackUrl = searchParams.get('callbackUrl') || PATH.HOME;
  console.log('로그인 callbackUrl:', callbackUrl);
  useEffect(() => {
    async function login() {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          // signIn에 callbackUrl 옵션을 전달할 수도 있습니다.
          callbackUrl,
        });
        console.log('자동 로그인 결과:', result);
        // 로그인 성공 후 callbackUrl로 이동합니다.
        router.push(callbackUrl);
      } catch (e) {
        console.error('자동 로그인 에러:', e);
      }
    }
    login();
  }, [callbackUrl, router]);

  return <div>로그인 중입니다.</div>;
}
