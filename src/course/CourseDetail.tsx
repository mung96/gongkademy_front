import { apiServerRequester } from '@/api/serverRequest';
import Button from '@/components/Button';
import { getCourseThumbnailPath } from '@/utils';
import Image from 'next/image';

type Props = {
  courseId: number;
};
type GetCourseDetailResponse = {
  title: string;
  thumbnail: string;
  courseNote: string;
  courseTime: number;
  isRegister: boolean;
};

async function getCourseDetailResponse(courseId: number) {
  try {
    const response = await apiServerRequester.get<GetCourseDetailResponse>(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return { title: '', thumbnail: '', courseNote: '', courseTime: 0, isRegister: false };
}

export default async function CourseDetail({ courseId }: Props) {
  const courseDetail = await getCourseDetailResponse(courseId);
  return (
    <div className="flex flex-col gap-6 tablet:flex-row tablet:justify-start tablet:gap-4 ">
      <div className=" aspect-video w-full min-w-[163px] rounded-lg tablet:h-[247px] tablet:w-[352px] desktop:w-[400px]">
        {/* <img className="rounded-lg size-full" src={course.thumbnail} alt={'강좌 썸네일'} /> */}
        <Image
          src={getCourseThumbnailPath(courseDetail.thumbnail)}
          alt={`${courseDetail.title} 썸네일`}
          width={400}
          height={247}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg"
          sizes="(min-width: 768px) 352px, (min-width: 1024px) 330px, 320px"
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
          <Button variant="filled">수강 신청</Button>
          <Button variant="outlined">강의 자료 다운로드</Button>
        </div>
      </section>
    </div>
  );
}
