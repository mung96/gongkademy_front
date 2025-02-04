'use client';

import Button from '@/components/Button';
import { Course } from '@/course/type';

type Props = {
  course: Course;
};

export default function CourseDetail({}: Props) {
  return (
    <div className="flex flex-col gap-6 tablet:flex-row tablet:justify-start tablet:gap-4 ">
      <div className=" aspect-video w-full min-w-[163px] rounded-lg tablet:h-[247px] tablet:w-[352px] desktop:w-[400px]">
        {/* <img className="rounded-lg size-full" src={course.thumbnail} alt={'강좌 썸네일'} /> */}
      </div>

      <section className="flex flex-col gap-4 tablet:justify-end">
        <h1 className="title1 text-neutral-gray-950">제목</h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-5">
            <p className="body1 text-neutral-gray-800">수업시간</p>
            <p className="body1 text-neutral-gray-800">
              {0}시간 {0}분
            </p>
          </div>
          <div className="flex gap-5">
            <p className="body1 text-neutral-gray-800">수강 기한</p>
            <p className="body1 text-neutral-gray-800">무제한</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 tablet:flex-row tablet:gap-4">
          <Button variant="filled" onClick={() => console.log('수강 신청')}>
            수강 신청
          </Button>
          <Button variant="outlined" onClick={() => console.log('수강 신청')}>
            강의 자료 다운로드
          </Button>
        </div>
      </section>
    </div>
  );
}
