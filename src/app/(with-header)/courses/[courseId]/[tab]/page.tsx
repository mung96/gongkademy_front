import ListItem from '@/components/ListItem';
import { PATH } from '@/constants/path';
import CourseDetail from '@/course/CourseDetail';
import Link from 'next/link';

import CurriculumList from '@/course/CurriculumList';
import QuestionList from '@/course/QuestionList';
import { Suspense } from 'react';
import { apiServerRequester } from '@/api/serverRequest';

type Props = {
  params: { courseId: string; tab: 'curriculum' | 'question' };
};
export type GetCourseDetailResponse = {
  title: string;
  thumbnail: string;
  courseNote: string;
  courseTime: number;
  isRegister: boolean;
};
async function getCourseDetailResponse(courseId: number) {
  const response = await apiServerRequester.get<GetCourseDetailResponse>(`/courses/${courseId}`);
  return response.data;
}
export default async function Page({ params }: Props) {
  const courseId = Number(params.courseId);
  const { tab } = params;
  const courseDetail: GetCourseDetailResponse = await getCourseDetailResponse(courseId);

  return (
    <main className="">
      <div className="pb-[72px] tablet:flex tablet:flex-col tablet:items-center">
        <div className="flex flex-col gap-9 px-4 pt-9 tablet:w-[768px] tablet:px-6 tablet:pt-12 desktop:w-[1280px] desktop:gap-12 desktop:px-[128px] desktop:pt-16">
          {/* <div className="relative aspect-[400/247] h-[247px] w-[400px] overflow-hidden rounded-lg">
            <Image
              src={getCourseThumbnailPath(courseDetail.thumbnail)}
              alt={`${courseDetail.title} 썸네일`}
              fill
              priority
              sizes="(min-width: 1024px) 330px, (min-width: 768px) 352px, 100vw"
            />
          </div> */}
          <CourseDetail courseId={courseId} courseDetail={courseDetail} />

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
            {tab === 'question' && (
              <Suspense>
                <QuestionList courseId={courseId} />
              </Suspense>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
