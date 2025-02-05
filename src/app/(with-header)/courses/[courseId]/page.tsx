// 'use client';
import Input from '@/components/Input';
import ListItem from '@/components/ListItem';
import { PATH } from '@/constants/path';
import CourseDetail from '@/course/CourseDetail';
import CurriculumItem, { PlayStatus } from '@/course/CurriculumItem';
import Link from 'next/link';
// import { useState } from 'react';
import MagnifierIcon from '/public/assets/svg/MagnifierIcon.svg';
import Combobox from '@/components/Combobox';
import BoardItem from '@/board/BoardItem';
import Pagination from '@/components/Pagination';
import { boardList } from '@/dummy';

type Props = {
  searchParams: { tab: 'curriculum' | 'question' };
  params: { courseId: string };
};
export default function Page({ params, searchParams }: Props) {
  const courseId = Number(params.courseId);
  const { tab } = searchParams;
  // const [search, setSearch] = useState('');
  // const [item, setItem] = useState({ label: '강의1', value: '강의1' });
  // const [page, setPage] = useState(1);

  return (
    <main className="">
      <div className="pb-[72px] tablet:flex tablet:flex-col tablet:items-center">
        <div className="flex flex-col gap-9 px-4 pt-9 tablet:w-[768px] tablet:px-6 tablet:pt-12 desktop:w-[1280px] desktop:gap-12 desktop:px-[128px] desktop:pt-16">
          <CourseDetail courseId={courseId} />

          <section>
            <ul className="flex w-full flex-col gap-2 tablet:flex-row tablet:justify-between">
              <div className="flex">
                <Link href={PATH.COURSE(courseId) + `?tab=curriculum`}>
                  <ListItem label={'커리큘럼'} isSelect={tab === 'curriculum'} />
                </Link>
                <Link href={PATH.COURSE(courseId) + `?tab=question`}>
                  <ListItem label={'질문'} isSelect={tab === 'question'} />
                </Link>
              </div>
              {/* {tab === 'question' && (
                <div className="flex items-center gap-2">
                  <Input
                    value={search}
                    placeholder="질문 검색"
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<MagnifierIcon />}
                    label={'search'}
                  />
                  <Combobox
                    placeholder={'강의 선택'}
                    items={[
                      { label: '강의1', value: '강의1' },
                      { label: '강의2', value: '강의2' },
                    ]}
                    onSelect={(item) => setItem(item)}
                  />
                </div>
              )} */}
            </ul>

            {tab === 'curriculum' && (
              <ul className="flex flex-col">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <Link href={PATH.LECTURE(item)} key={item}>
                    <CurriculumItem title={'강의제목'} runTime={0} status={PlayStatus.COMPLETED} />
                  </Link>
                ))}
              </ul>
            )}

            {/* {tab === 'question' && (
              <div className="flex flex-col items-center w-full gap-4">
                <ul className="w-full">
                  {boardList.map((board) => (
                    <BoardItem board={board} key={board.boardId} />
                  ))}
                </ul>
                <Pagination totalPage={38} buttonPerPage={5} page={page} setPage={setPage} />
              </div>
            )} */}
          </section>
        </div>
      </div>
    </main>
  );
}
