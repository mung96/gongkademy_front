'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/Input';
import MagnifierIcon from '/public/assets/svg/MagnifierIcon.svg';
import BoardItem from '@/board/BoardItem';
import Pagination from '@/components/Pagination';
import { getBoardListResponse } from '@/board/api';
import { Board, BoardCategory, BoardCriteria } from '@/board/type';
import Link from 'next/link';
import { PATH } from '@/constants/path';
import PencilIcon from '/public/assets/svg/PencilIcon.svg';
import Button from '@/components/Button';

type Props = { courseId: number; lectureId: number };

export default function LectureQuestionList({ courseId, lectureId }: Props) {
  const [search, setSearch] = useState('');
  const [questionList, setQuestionList] = useState<Board[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

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
      lectureId,
    );
  }, [page]);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex w-full items-center gap-2">
        <Input
          value={search}
          placeholder="질문 검색"
          onChange={(e) => setSearch(e.target.value)}
          icon={<MagnifierIcon />}
          label={'search'}
        />
        <Button icon={<PencilIcon />} onClick={() => console.log('글쓰기 클릭')}>
          글쓰기
        </Button>
      </div>

      {/*
      
       */}
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
