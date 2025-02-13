'use client';

import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const textStyle = 'body2 flex items-center justify-center px-3 text-neutral-gray-950';
export default function LoginButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const redirectUrl = `${pathname}${queryString ? `?${queryString}` : ''}`;
  return (
    <Link
      href={SERVER_BASE_URL + END_POINT.NAVER_LOGIN(redirectUrl)}
      className={twMerge(textStyle, 'hidden tablet:block text-primary-500 ')}
    >
      로그인
    </Link>
  );
}
