import { GetCourseDetailResponse } from '@/app/(with-header)/courses/[courseId]/[tab]/page';
import LoadingComponent from '@/components/LoadingComponent';
import DownloadCourseNoteButton from '@/course/DownloadCourseNoteButton';
import RegisterCourseButton from '@/course/RegisterCourseButton';
import { getCourseThumbnailPath } from '@/utils';
import Image from 'next/image';

type Props = {
  courseId: number;
  courseDetail: GetCourseDetailResponse;
};

export default function CourseDetail({ courseId, courseDetail }: Props) {
  if (courseDetail === null) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col gap-6 tablet:flex-row tablet:justify-start tablet:gap-4 ">
      <div className="relative aspect-[400/247] h-[247px] w-[400px] overflow-hidden rounded-lg">
        <Image
          src={getCourseThumbnailPath(courseDetail.thumbnail)}
          alt={`${courseDetail.title} 썸네일`}
          fill
          priority
          sizes="(min-width: 1024px) 330px, (min-width: 768px) 352px, 100vw"
        />
      </div>

      <section className="flex flex-col gap-4 tablet:justify-end">
        <h1 className="title1 text-neutral-gray-950">{courseDetail.title}</h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-5">
            <p className="body1 text-neutral-gray-800">수업시간</p>
            <p className="body1 text-neutral-gray-800">
              {Math.floor(courseDetail.courseTime / 3600)}시간 {Math.floor((courseDetail.courseTime % 3600) / 60)}분
            </p>
          </div>
          <div className="flex gap-5">
            <p className="body1 text-neutral-gray-800">수강 기한</p>
            <p className="body1 text-neutral-gray-800">무제한</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 tablet:flex-row tablet:gap-4">
          {!courseDetail.isRegister && <RegisterCourseButton courseId={courseId} />}
          <DownloadCourseNoteButton courseId={courseId} />
        </div>
      </section>
    </div>
  );
}
