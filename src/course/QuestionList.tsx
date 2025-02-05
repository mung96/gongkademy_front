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

type Props = { courseId: number };

export default function QuestionList({ courseId }: Props) {
  const [search, setSearch] = useState('');
  const [lectureList, setLectureList] = useState<{ label: string; value: number }[]>([]);
  const [lecture, setLecture] = useState<{ label: string; value: number } | null>(null);
  const [questionList, setQuestionList] = useState<Board[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

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
  }, [lecture, page]);

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
