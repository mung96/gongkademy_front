'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/Input';
import MagnifierIcon from '/public/assets/svg/MagnifierIcon.svg';
import Combobox from '@/components/Combobox';
import BoardItem from '@/board/BoardItem';
import Pagination from '@/components/Pagination';
import { getLectureListResponse } from '@/course/api';
import { getLectureLabelValue } from '@/utils';
import { getBoardListResponse } from '@/board/api';
import { Board, BoardCategory, BoardCriteria } from '@/board/type';
import Link from 'next/link';
import { PATH } from '@/constants/path';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = { courseId: number };

export default function QuestionList({ courseId }: Props) {
  const [lectureList, setLectureList] = useState<{ label: string; value: number }[]>([]);
  const [lecture, setLecture] = useState<{ label: string; value: number } | null>(null);
  const [questionList, setQuestionList] = useState<Board[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  // boardList 불러오기 (페이지, 카테고리 변경 시)
  useEffect(() => {
    async function fetchBoardList() {
      const data = await getBoardListResponse(
        BoardCategory.QUESTION,
        page,
        BoardCriteria.CREATE_AT,
        undefined,
        undefined,
        undefined,
        keyword,
      );
      setQuestionList(data.boardList);
      setTotalPage(data.totalPage);
    }
    fetchBoardList();
  }, [page, lecture]);

  // 검색을 위한 함수 (엔터키를 누르면 호출)
  const handleSearchKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // 검색 시 첫 페이지로 이동
      setPage(1);
      router.replace(`?keyword=${encodeURIComponent(keyword)}`);
      const data = await getBoardListResponse(
        BoardCategory.QUESTION,
        1,
        BoardCriteria.CREATE_AT,
        undefined,
        undefined,
        undefined,
        keyword,
      );
      setQuestionList(data.boardList);
      setTotalPage(data.totalPage);
    }
  };

  useEffect(() => {
    getLectureListResponse(Number(courseId), (data) => {
      setLectureList(getLectureLabelValue(data));
    });
  }, []);

  useEffect(() => {
    getBoardListResponse(
      BoardCategory.QUESTION,
      page,
      BoardCriteria.CREATE_AT,
      (data) => {
        setTotalPage(data.totalPage);
        setQuestionList(data.boardList);
      },
      courseId,
      lecture?.value === 0 ? undefined : lecture?.value,
    );
    console.log('변경');
  }, [lecture, page]);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex w-full items-center gap-2">
        <Input
          value={keyword}
          label="search"
          placeholder="질문 검색"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          icon={<MagnifierIcon />}
        />
        <div>
          <Combobox placeholder={'강의 선택'} items={lectureList} onSelect={setLecture} selectedItem={lecture} />
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        {questionList?.length ? (
          <>
            <ul className="w-full ">
              {questionList.map((question) => (
                <Link
                  href={PATH.COMMUNITY_DETAIL(BoardCategory.QUESTION, Number(question.boardId))}
                  key={question.boardId}
                >
                  <BoardItem board={question} />
                </Link>
              ))}
            </ul>
            <Pagination totalPage={totalPage} buttonPerPage={5} page={page} setPage={setPage} />
          </>
        ) : (
          <p className="body1 py-4">해당 강의는 질문이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
