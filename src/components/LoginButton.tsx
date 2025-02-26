'use client';

import { validateSession } from '@/auth/api';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import { login, logout } from '@/store/auth';
import { RootState } from '@/store/rootReducer';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

const textStyle = 'body2 flex items-center justify-center px-3 text-neutral-gray-950';

export default function LoginButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const redirectUrl = `${pathname}${queryString ? `?${queryString}` : ''}`;
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      validateSession(
        () => dispatch(login()),
        () => dispatch(logout()),
      );
    }
  }, []);

  return (
    <>
      {isLogin ? (
        <Link
          href={SERVER_BASE_URL + END_POINT.LOGOUT}
          className={twMerge(textStyle, 'hidden tablet:block text-neutral-gray-500 ')}
        >
          로그아웃
        </Link>
      ) : (
        <Link
          href={SERVER_BASE_URL + END_POINT.KAKAO_LOGIN(redirectUrl)}
          className={twMerge(textStyle, 'hidden tablet:block text-primary-500 ')}
        >
          로그인
        </Link>
      )}
    </>
  );
}
