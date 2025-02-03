'use client';

import { login } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    //TODO: 세선테스트
    dispatch(login());

    router.push('/');
  }, []);
  return <div>로그인 중입니다.</div>;
}
