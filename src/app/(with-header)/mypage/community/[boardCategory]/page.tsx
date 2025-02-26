import Link from 'next/link';
import { PATH } from '@/constants/path';
import ListItem from '@/components/ListItem';

import { BoardCategory } from '@/board/type';
import MyBoardList from '@/board/MyBoardList';

export default function Page({ params }: { params: { boardCategory: BoardCategory } }) {
  const { boardCategory } = params;

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
