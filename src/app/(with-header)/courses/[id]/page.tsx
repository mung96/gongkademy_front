'use client';
import Input from '@/components/Input';
import ListItem from '@/components/ListItem';
import { PATH } from '@/constants/path';
import CourseDetail from '@/course/CourseDetail';
import CurriculumItem, { PlayStatus } from '@/course/CurriculumItem';
import Link from 'next/link';
import { useState } from 'react';
import MagnifierIcon from '@/app/assets/svg/MagnifierIcon.svg';
const course = {
  id: '1',
  title: '강좌명',
  thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
};

type Props = {
  searchParams: { tab: 'curriculum' | 'question' };
  params: { id: string };
};
export default function Page({ params, searchParams }: Props) {
  const { id: courseId } = params;
  const { tab } = searchParams;
  const [search, setSearch] = useState('');
  return (
    <main className="">
      <div className="pb-[72px] tablet:flex tablet:flex-col tablet:items-center">
        <div className="flex flex-col gap-9 px-4 pt-9 tablet:w-[768px] tablet:px-6 tablet:pt-12 desktop:w-[1280px] desktop:gap-12 desktop:px-[128px] desktop:pt-16">
          <CourseDetail course={course} />

          <section>
            <ul className="flex">
              <Link href={PATH.COURSE(courseId) + `?tab=curriculum`}>
                <ListItem label={'커리큘럼'} isSelect={tab === 'curriculum'} />
              </Link>
              <Link href={PATH.COURSE(courseId) + `?tab=question`}>
                <ListItem label={'질문'} isSelect={tab === 'question'} />
              </Link>
            </ul>
            {tab === 'curriculum' && (
              <ul className="flex flex-col">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <Link href={PATH.LECTURE(item.toString())} key={item}>
                    <CurriculumItem title={'강의제목'} runTime={0} status={PlayStatus.COMPLETED} />
                  </Link>
                ))}
              </ul>
            )}

            <Input
              value={search}
              placeholder="질문 검색"
              onChange={(e) => setSearch(e.target.value)}
              icon={<MagnifierIcon />}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
