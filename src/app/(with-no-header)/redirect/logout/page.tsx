'use client';

import { PATH } from '@/constants/path';
import { logout } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout());
    router.replace(PATH.HOME);
  }, []);

  return <div>로그아웃 중입니다.</div>;
}
