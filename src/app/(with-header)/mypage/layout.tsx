'use client';

import Link from 'next/link';
import { PATH } from '@/constants/path';
import ListItem from '@/components/ListItem';
import PencilIcon from '@/app/assets/svg/PencilIcon.svg';
import VideoIcon from '@/app/assets/svg/VideoIcon.svg';
import ProfileIcon from '@/app/assets/svg/ProfileIcon.svg';
import { usePathname } from 'next/navigation';
import { BoardCategory } from '@/board/BoardItem';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: Server Component인 상태로 할 수는 없나?
  const pathname = usePathname();
  return (
    <main className="flex flex-col items-center gap-4 px-4 pb-[72px] pt-9 tablet:justify-center tablet:gap-6  tablet:px-6 tablet:pt-12 desktop:flex-row desktop:items-start desktop:pt-16">
      <nav className="flex  tablet:gap-3 desktop:w-[192px] desktop:flex-col">
        <Link href={PATH.MY_COMMUNITY(BoardCategory.WORRY)}>
          <ListItem
            label={'게시글'}
            isSelect={
              pathname === PATH.MY_COMMUNITY(BoardCategory.WORRY) ||
              pathname === PATH.MY_COMMUNITY(BoardCategory.QUESTION)
            }
            textAlign="left"
            icon={<PencilIcon />}
          />
        </Link>
        <Link href={PATH.MY_COURSES}>
          <ListItem label={'수강 강좌'} isSelect={pathname === PATH.MY_COURSES} textAlign="left" icon={<VideoIcon />} />
        </Link>
        <Link href={PATH.MY_PROFILE}>
          <ListItem
            label={'프로필 수정'}
            isSelect={pathname === PATH.MY_PROFILE}
            textAlign="left"
            icon={<ProfileIcon />}
          />
        </Link>
      </nav>
      <div className="flex w-full flex-col items-center gap-3  tablet:max-w-[720px] desktop:max-w-[1024px]">
        {children}
      </div>
    </main>
  );
}
