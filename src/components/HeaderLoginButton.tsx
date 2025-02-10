'use client';

import { textStyle } from '@/components/Header';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import { PATH } from '@/constants/path';
import { RootState } from '@/store/rootReducer';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

export default function HeaderLoginButton() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  return (
    <div className="flex items-center ">
      <Link
        className={twMerge(textStyle, 'hidden tablet:block')}
        href={isLogin ? PATH.MY_PROFILE : SERVER_BASE_URL + END_POINT.NAVER_LOGIN}
      >
        마이페이지
      </Link>
      {isLogin ? (
        <Link
          href={SERVER_BASE_URL + END_POINT.LOGOUT}
          className={twMerge(textStyle, 'hidden tablet:block text-neutral-gray-500 ')}
        >
          로그아웃
        </Link>
      ) : (
        <Link
          href={SERVER_BASE_URL + END_POINT.NAVER_LOGIN}
          className={twMerge(textStyle, 'hidden tablet:block text-primary-500 ')}
        >
          로그인
        </Link>
      )}
    </div>
  );
}
