'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth';

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get('redirect_uri') || '/';
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(login());
      // 로그인 성공 후 callbackUrl로 이동합니다.
      router.push(redirectUri);
    } catch (e) {
      console.error('자동 로그인 에러:', e);
    }
  }, []);

  return <div>로그인 중입니다.</div>;
}
