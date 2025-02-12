import { PATH } from '@/constants/path';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Logo from '/public/assets/svg/Logo.svg';
import { BoardCategory } from '@/board/type';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
export const textStyle = 'body2 flex items-center justify-center px-3 text-neutral-gray-950';

//TODO: 로그아웃을 여러번 해야하는 이슈가 있음
export default async function Header() {
  const session = await getServerSession(authOptions);
  const isLogin = session?.user.isLogin;
  // const isLogin = true;
  // console.log(session);
  // const isLogin = true;

  return (
    <header className="sticky top-0 z-50 flex h-16 min-h-16 w-full justify-center border-b border-neutral-gray-100 bg-neutral-gray-0">
      <div className="flex h-full w-[1300px] min-w-[365px] max-w-[1300px] items-center justify-between px-6">
        <div className="flex items-center max-tablet:w-full max-tablet:justify-center">
          {/* <Button onClick={() => signOut({ redirect: true, callbackUrl: PATH.HOME })}></Button> */}
          <Link className={textStyle} href={PATH.HOME}>
            <Logo />
          </Link>
          <Link className={twMerge(textStyle, 'hidden tablet:block')} href={PATH.COURSES}>
            강좌
          </Link>
          <Link className={twMerge(textStyle, 'hidden tablet:block')} href={PATH.COMMUNITY(BoardCategory.WORRY)}>
            커뮤니티
          </Link>
        </div>
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
      </div>
    </header>
  );
}
