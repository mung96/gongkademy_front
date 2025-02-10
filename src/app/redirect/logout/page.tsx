'use client';

import { logout } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    //TODO: 세선테스트
    dispatch(logout());

    router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>로그아웃 중입니다.</div>;
}
