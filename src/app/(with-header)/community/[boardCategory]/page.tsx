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
import { notFound, useRouter } from 'next/navigation';
import { getBoardListResponse } from '@/board/api';
import { RootState } from '@/store/rootReducer';
import { useSelector } from 'react-redux';

type Props = {
  params: { boardCategory: BoardCategory };
  searchParams: { keyword?: string };
};

// async function getSubBoardList(
//   boardCategory: BoardCategory,
//   page: number = 1,
//   criteria: BoardCriteria = BoardCriteria.COMMENT_CNT,
//   onSuccess?: (response: GetBoardListResponse) => void,
//   courseId?: number,
//   lectureId?: number,
//   keyword?: string,
// ) {
//   const response = await apiRequester.get<GetBoardListResponse>(
//     `/boards/subquery?category=${boardCategory}&page=${page}&criteria=${criteria}${courseId !== undefined ? '&course=' + courseId : ''}${lectureId !== undefined ? '&lecture=' + lectureId : ''}${keyword?.length ? '&keyword=' + keyword : ''}`,
//   );
//   if (onSuccess) {
//     onSuccess(response.data);
//   }
//   return response.data;
// }

export default function Page({ params, searchParams }: Props) {
  const { boardCategory } = params;
  const isLogin = useSelector((stat: RootState) => stat.auth.isLogin);

  const router = useRouter();
  if (!Object.values(BoardCategory).includes(boardCategory)) {
    notFound();
  }
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState(searchParams.keyword || '');

  //0=원래쿼리, 1=서브쿼리
  // const [type, setType] = useState(0);
  // useEffect(() => {
  //   if (type == 0) {
  //     const fetchBoardList = async () => {
  //       const data = await getBoardListResponse(
  //         boardCategory,
  //         page,
  //         BoardCriteria.COMMENT_CNT,
  //         undefined,
  //         undefined,
  //         undefined,
  //         keyword,
  //       );
  //       setBoardList(data.boardList);
  //       setTotalPage(data.totalPage);
  //     };
  //     fetchBoardList();
  //   } else {
  //     const fetchBoardList = async () => {
  //       const data = await getSubBoardList(
  //         boardCategory,
  //         page,
  //         BoardCriteria.COMMENT_CNT,
  //         undefined,
  //         undefined,
  //         undefined,
  //         keyword,
  //       );
  //       setBoardList(data.boardList);
  //       setTotalPage(data.totalPage);
  //     };
  //     fetchBoardList();
  //   }
  // }, [type]);

  // boardList 불러오기 (페이지, 카테고리 변경 시)
  useEffect(() => {
    async function fetchBoardList() {
      const data = await getBoardListResponse(
        boardCategory,
        page,
        BoardCriteria.COMMENT_CNT,
        undefined,
        undefined,
        undefined,
        keyword,
      );
      setBoardList(data.boardList);
      setTotalPage(data.totalPage);
    }
    fetchBoardList();
  }, [page, boardCategory]);

  // 검색을 위한 함수 (엔터키를 누르면 호출)
  const handleSearchKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // 검색 시 첫 페이지로 이동
      setPage(1);
      router.replace(`?keyword=${encodeURIComponent(keyword)}`);
      const data = await getBoardListResponse(
        boardCategory,
        1,
        BoardCriteria.CREATE_AT,
        undefined,
        undefined,
        undefined,
        keyword,
      );
      setBoardList(data.boardList);
      setTotalPage(data.totalPage);
    }
  };

  const handleWriteButtonClick = () => {
    if (isLogin) {
      router.push(PATH.COMMUNITY_WRITE(boardCategory));
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };

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
            value={keyword}
            label="search"
            placeholder={boardCategory === BoardCategory.QUESTION ? '질문 검색' : '고민 검색'}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            icon={<MagnifierIcon />}
          />
          {/* <Button icon={<PencilIcon />} onClick={() => setType(0)}>
            일반쿼리
          </Button>
          <Button icon={<PencilIcon />} onClick={() => setType(1)}>
            서브쿼리
          </Button> */}
          <Button icon={<PencilIcon />} onClick={handleWriteButtonClick}>
            글쓰기
          </Button>
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
