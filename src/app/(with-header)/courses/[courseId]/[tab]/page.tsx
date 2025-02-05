import ListItem from '@/components/ListItem';
import { PATH } from '@/constants/path';
import CourseDetail from '@/course/CourseDetail';
import Link from 'next/link';

import CurriculumList from '@/course/CurriculumList';
import QuestionList from '@/course/QuestionList';

type Props = {
  params: { courseId: string; tab: 'curriculum' | 'question' };
};
export default function Page({ params }: Props) {
  const courseId = Number(params.courseId);
  const { tab } = params;

  return (
    <main className="">
      <div className="pb-[72px] tablet:flex tablet:flex-col tablet:items-center">
        <div className="flex flex-col gap-9 px-4 pt-9 tablet:w-[768px] tablet:px-6 tablet:pt-12 desktop:w-[1280px] desktop:gap-12 desktop:px-[128px] desktop:pt-16">
          <CourseDetail courseId={courseId} />

          <section className="flex flex-col gap-2">
            <ul className="flex w-full flex-col gap-2 tablet:flex-row tablet:justify-between">
              <div className="flex">
                <Link href={PATH.COURSE(courseId, 'curriculum')}>
                  <ListItem label={'커리큘럼'} isSelect={tab === 'curriculum'} />
                </Link>
                <Link href={PATH.COURSE(courseId, 'question')}>
                  <ListItem label={'질문'} isSelect={tab === 'question'} />
                </Link>
              </div>
            </ul>
            {tab === 'curriculum' && <CurriculumList courseId={courseId} />}
            {tab === 'question' && <QuestionList courseId={courseId} />}
          </section>
        </div>
      </div>
    </main>
  );
}
