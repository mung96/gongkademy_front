'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth';
import LoadingComponent from '@/components/LoadingComponent';

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get('redirect_uri') || '/';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login());
    // 로그인 성공 후 callbackUrl로 이동합니다.
    router.replace(redirectUri);
  }, []);

  return <LoadingComponent />;
}
