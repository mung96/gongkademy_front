'use client';

import BoardItem from '@/board/BoardItem';
import Input from '@/components/Input';
import ListItem from '@/components/ListItem';
import { PATH } from '@/constants/path';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MagnifierIcon from '/public/assets/svg/MagnifierIcon.svg';
import Button from '@/components/Button';
import PencilIcon from '/public/assets/svg/PencilIcon.svg';
import Pagination from '@/components/Pagination';
import { Board, BoardCategory, BoardCriteria } from '@/board/type';
import { notFound } from 'next/navigation';
import { getBoardListResponse } from '@/board/api';

export default function Page({ params }: { params: { boardCategory: BoardCategory } }) {
  const { boardCategory } = params;
  if (!Object.values(BoardCategory).includes(boardCategory)) {
    notFound();
  }
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    async function fetchBoardList() {
      const data = await getBoardListResponse(boardCategory, page, BoardCriteria.CREATE_AT);
      setBoardList(data.boardList);
      setTotalPage(data.totalPage);
    }

    fetchBoardList();
  }, [page]);

  //TODO: 검색 API 만들어야함.
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
            placeholder={boardCategory === BoardCategory.QUESTION ? '질문 검색' : '고민 검색'}
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
          <Pagination totalPage={totalPage} buttonPerPage={5} page={page} setPage={setPage} />
        </div>
      </div>
    </main>
  );
}
