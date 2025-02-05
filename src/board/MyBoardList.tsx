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
  try {
    const response = await apiRequester.get<GetBoardListResponse>(
      `/members/boards/${boardCategory}?page=${page}&criteria=${criteria}`,
    );
    console.log('요청 경로' + response.config.url);
    if (onSuccess) {
      onSuccess(response.data);
    }
    return response.data;
  } catch (error) {
    console.log('error발생');
    console.log(error);
  }
  return { boardList: [], totalPage: 0 };
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
    <div className="flex flex-col items-center w-full gap-4">
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
        <p className="py-4 body1">작성한 게시글이 없습니다.</p>
      )}
    </div>
  );
}
