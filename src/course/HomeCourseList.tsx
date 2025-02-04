import { apiRequester } from '@/api/requester';
import { PATH } from '@/constants/path';
import CourseCard from '@/course/CourseCard';
import { RegisterStatus } from '@/course/type';
import Link from 'next/link';

export type CourseItem = {
  courseId: number;
  title: string;
  thumbnail: string;
};
export type RegisterdCourseListResponse = {
  courseList: CourseItem[];
};

async function getRegisteredCourseList() {
  try {
    const response = await apiRequester.get<RegisterdCourseListResponse>(
      '/members/courses?status=' + RegisterStatus.IN_PROGRESS,
    );
    return response.data.courseList;
  } catch (e) {
    console.log(e);
  }
  return [];
}

export default async function HomeCourseList() {
  const courseList = await getRegisteredCourseList();

  console.log(courseList);

  return (
    <ul className="flex flex-col gap-6 tablet:max-w-screen-tablet desktop:max-w-screen-desktop">
      {courseList.map((course) => (
        <Link href={PATH.COURSE(course.courseId) + `?tab=curriculum`} key={course.courseId}>
          <CourseCard key={course.courseId} course={course} />
        </Link>
      ))}
    </ul>
  );
}
