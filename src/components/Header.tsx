import { PATH } from '@/constants/path';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Logo from '/public/assets/svg/Logo.svg';
import HeaderLoginButton from '@/components/HeaderLoginButton';
import { BoardCategory } from '@/board/type';

export const textStyle = 'body2 flex items-center justify-center px-3 text-neutral-gray-950';

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 min-h-16 w-full justify-center border-b border-neutral-gray-100 bg-neutral-gray-0">
      <div className="flex h-full w-[1300px] min-w-[365px] max-w-[1300px] items-center justify-between px-6">
        <div className="flex items-center max-tablet:w-full max-tablet:justify-center">
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
        <HeaderLoginButton />
      </div>
    </header>
  );
}
