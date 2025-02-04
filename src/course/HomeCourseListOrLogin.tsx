'use client';

import Button from '@/components/Button';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import { RootState } from '@/store/rootReducer';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function HomeCourseListOrLogin({ children }: { children: React.ReactNode }) {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  return (
    <section className="flex items-center justify-center ">
      {isLogin ? (
        children
      ) : (
        <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-gray-300 bg-neutral-gray-50">
          <p className="body1 text-neutral-gray-950">로그인 후에 강의를 수강할 수 있어요</p>
          <Link href={SERVER_BASE_URL + END_POINT.NAVER_LOGIN}>
            <Button onClick={() => console.log('로그인')}>3초 만에 로그인</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
