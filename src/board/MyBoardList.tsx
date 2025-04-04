'use client';

import { apiRequester } from '@/api/requester';
import { GetBoardListResponse } from '@/board/api';
import BoardItem from '@/board/BoardItem';
import { Board, BoardCategory, BoardCriteria } from '@/board/type';
import Pagination from '@/components/Pagination';
import { PATH } from '@/constants/path';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = { boardCategory: BoardCategory };

export async function getMyBoardListResponse(
  boardCategory: BoardCategory,
  page: number = 1,
  criteria: BoardCriteria = BoardCriteria.CREATE_AT,
  onSuccess?: (response: GetBoardListResponse) => void,
) {
  const response = await apiRequester.get<GetBoardListResponse>(
    `/members/boards/${boardCategory}?page=${page}&criteria=${criteria}`,
  );
  if (onSuccess) {
    onSuccess(response.data);
  }
  return response.data;
}

export default function MyBoardList({ boardCategory }: Props) {
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [boardList, setBoardList] = useState<Board[]>([]);

  useEffect(() => {
    getMyBoardListResponse(boardCategory, page, BoardCriteria.CREATE_AT, (data) => {
      setTotalPage(data.totalPage);
      setBoardList(data.boardList);
    });
  }, []);
  return (
    <div className="flex w-full flex-col items-center gap-4">
      {boardList?.length ? (
        <>
          <ul className="w-full ">
            {boardList.map((board) => (
              <Link href={PATH.COMMUNITY_DETAIL(boardCategory, Number(board.boardId))} key={board.boardId}>
                <BoardItem board={board} />
              </Link>
            ))}
          </ul>
          <Pagination totalPage={totalPage} buttonPerPage={5} page={page} setPage={setPage} />
        </>
      ) : (
        <p className="body1 py-4">작성한 게시글이 없습니다.</p>
      )}
    </div>
  );
}
