import Link from 'next/link';
import { PATH } from '@/constants/path';
import ListItem from '@/components/ListItem';

import { BoardCategory } from '@/board/type';
import MyBoardList from '@/board/MyBoardList';
import { validateServerSession } from '@/auth/serverApi';
import { redirect } from 'next/navigation';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';

export default function Page({ params }: { params: { boardCategory: BoardCategory } }) {
  const { boardCategory } = params;
  validateServerSession(
    () => {},
    () => {
      redirect(SERVER_BASE_URL + END_POINT.KAKAO_LOGIN(PATH.MY_COMMUNITY(boardCategory)));
    },
  );

  return (
    <div className={'flex w-full flex-col items-center gap-4  tablet:gap-6 '}>
      <h2 className={'title2 tablet:title1 text-neutral-gray-950'}>내가 쓴 게시글</h2>
      <nav className="flex justify-center tablet:gap-3  desktop:w-[192px]">
        <Link href={PATH.MY_COMMUNITY(BoardCategory.WORRY)}>
          <ListItem label={'고민'} isSelect={boardCategory === BoardCategory.WORRY} textAlign={'center'} />
        </Link>
        <Link href={PATH.MY_COMMUNITY(BoardCategory.QUESTION)}>
          <ListItem label={'질문'} isSelect={boardCategory === BoardCategory.QUESTION} textAlign={'center'} />
        </Link>
      </nav>
      <div className="flex w-full flex-col gap-3">
        <MyBoardList boardCategory={boardCategory} />
      </div>
    </div>
  );
}
