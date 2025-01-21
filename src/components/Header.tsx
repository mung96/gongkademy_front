import { BoardCategory } from '@/board/BoardItem';
import { PATH } from '@/constants/path';
import Link from 'next/link';

const textStyle = 'body2 flex items-center justify-center px-3 text-neutral-gray-950';
export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 w-full justify-center border-b border-neutral-gray-100 bg-neutral-gray-0">
      <div className="flex h-full w-[1300px] min-w-[365px] max-w-[1300px] items-center  justify-between px-6">
        <div className="flex items-center ">
          <Link className={textStyle} href={PATH.HOME}>
            로고
          </Link>
          <Link className={textStyle} href={PATH.COURSES}>
            강좌
          </Link>
          <Link className={textStyle} href={PATH.COMMUNITY('question' as BoardCategory)}>
            커뮤니티
          </Link>
        </div>
        <div className="flex items-center ">
          <Link className={textStyle} href={PATH.MYPAGE}>
            마이페이지
          </Link>
          <div className={textStyle}>로그인</div>
        </div>
      </div>
    </header>
  );
}
