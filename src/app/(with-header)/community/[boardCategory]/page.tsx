'use client';

import BoardItem from '@/board/BoardItem';
import Input from '@/components/Input';
import ListItem from '@/components/ListItem';
import { PATH } from '@/constants/path';
import Link from 'next/link';
import { useState } from 'react';
import MagnifierIcon from '/public/assets/svg/MagnifierIcon.svg';
import Button from '@/components/Button';
import PencilIcon from '/public/assets/svg/PencilIcon.svg';
import Pagination from '@/components/Pagination';
import { boardList } from '@/dummy';
import { BoardCategory } from '@/board/type';
import { notFound } from 'next/navigation';

export default function Page({ params }: { params: { boardCategory: BoardCategory } }) {
  const { boardCategory } = params;
  if (!Object.values(BoardCategory).includes(boardCategory)) {
    notFound();
  }

  const [search, setSearch] = useState('');

  return (
    <main className="flex flex-col items-center gap-4 px-4 pb-[72px] pt-9 tablet:flex-row tablet:items-start tablet:justify-center tablet:px-6 tablet:pt-12 desktop:pt-16">
      <nav className="flex tablet:w-[168px] tablet:flex-col tablet:gap-3 desktop:w-[192px]">
        <Link href={PATH.COMMUNITY(BoardCategory.WORRY)}>
          <ListItem label={'고민'} isSelect={boardCategory === BoardCategory.WORRY} textAlign="left" />
        </Link>
        <Link href={PATH.COMMUNITY(BoardCategory.QUESTION)}>
          <ListItem label={'질문'} isSelect={boardCategory === BoardCategory.QUESTION} textAlign="left" />
        </Link>
      </nav>
      <div className="flex w-full flex-col gap-3  tablet:max-w-[536px] desktop:max-w-[1024px]">
        <div className="flex w-full flex-1 items-center gap-3">
          <Input
            value={search}
            label="search"
            placeholder="질문 검색"
            onChange={(e) => setSearch(e.target.value)}
            icon={<MagnifierIcon />}
          />
          <Link href={PATH.COMMUNITY_WRITE(boardCategory)}>
            <Button icon={<PencilIcon />} onClick={() => console.log('글쓰기 클릭')}>
              글쓰기
            </Button>
          </Link>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <ul className="w-full">
            {boardList.map((board) => (
              <Link href={PATH.COMMUNITY_DETAIL(boardCategory, Number(board.boardId))} key={board.boardId}>
                <BoardItem board={board} />
              </Link>
            ))}
          </ul>
          <Pagination totalPage={38} limit={20} buttonPerPage={5} />
        </div>
      </div>
    </main>
  );
}
