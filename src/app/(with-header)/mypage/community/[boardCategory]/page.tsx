'use client';

import Link from 'next/link';
import { PATH } from '@/constants/path';
import BoardItem, { BoardCategory } from '@/board/BoardItem';
import ListItem from '@/components/ListItem';

import Pagination from '@/components/Pagination';
import { Key } from 'react';
import { boardList } from '@/dummy';

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
        <div className="flex w-full flex-col items-center gap-4">
          <ul className="w-full">
            {boardList.map(
              (board: {
                id: Key | null | undefined;
                title: string;
                content: string;
                date: string;
                category: BoardCategory;
                commentCount: number;
                courseTitle: string | undefined;
                lectureTitle: string | undefined;
              }) => (
                <Link href={PATH.COMMUNITY_DETAIL(boardCategory, Number(board.id))} key={board.id}>
                  <BoardItem
                    title={board.title}
                    content={board.content}
                    date={board.date}
                    category={board.category}
                    commentCount={board.commentCount}
                    courseTitle={board.courseTitle}
                    lectureTitle={board.lectureTitle}
                  />
                </Link>
              ),
            )}
          </ul>
          <Pagination totalPage={38} limit={20} buttonPerPage={5} />
        </div>
      </div>
    </div>
  );
}
