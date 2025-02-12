'use client';

import { PATH } from '@/constants/path';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    console.log('로그아웃 세션: ', session);
  }, [session]);

  useEffect(() => {
    async function logout() {
      try {
        // NextAuth의 signOut()을 호출하여 세션 쿠키/토큰을 삭제합니다.
        // redirect: false 옵션을 사용하여 결과를 기다린 후, 수동으로 리다이렉트합니다.
        await signOut({ redirect: true, callbackUrl: PATH.HOME });

        // signOut 호출 후 쿠키 제거에 약간의 딜레이가 있을 수 있으므로,
      } catch (error) {
        console.error('NextAuth 세션 삭제 에러:', error);
      }
    }
    logout();
  }, [router]);

  return <div>로그아웃 중입니다.</div>;
}
