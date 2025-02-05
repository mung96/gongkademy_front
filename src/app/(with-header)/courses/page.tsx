import { apiServerRequester } from '@/api/serverRequest';
import { PATH } from '@/constants/path';
import CourseCard from '@/course/CourseCard';
import { GetCourseListResponse } from '@/course/type';
import Link from 'next/link';

export async function getCourseListResponse() {
  try {
    const response = await apiServerRequester.get<GetCourseListResponse>(`/courses`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return { courseList: [] };
}

export default async function Page() {
  const { courseList } = await getCourseListResponse();
  return (
    <main className="px-4 pb-[72px] pt-9 tablet:px-6 tablet:pt-12 desktop:pt-16">
      <section className="flex items-center justify-center ">
        <ul className="grid w-full grid-cols-2 gap-4 tablet:max-w-screen-tablet desktop:max-w-screen-desktop desktop:grid-cols-3">
          {courseList.map((course) => (
            <Link href={PATH.COURSE(course.courseId, 'curriculum')} key={course.courseId}>
              <CourseCard key={course.courseId} course={course} />
            </Link>
          ))}
        </ul>
      </section>
    </main>
  );
}
