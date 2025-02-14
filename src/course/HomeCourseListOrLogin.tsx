'use client';

import { apiRequester } from '@/api/requester';
import Button from '@/components/Button';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import { PATH } from '@/constants/path';
import HomeCourseCard from '@/course/HomeCourseCard';
import { RegisterStatus } from '@/course/type';
import { RootState } from '@/store/rootReducer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export type CourseItem = {
  courseId: number;
  title: string;
  thumbnail: string;
};
export type RegisteredCourseListResponse = {
  courseList: CourseItem[];
};

export default function HomeCourseListOrLogin() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const [courseList, setCourseList] = useState<CourseItem[]>([]);

  async function getRegisteredCourseList() {
    try {
      const response = await apiRequester.get<RegisteredCourseListResponse>(
        '/members/courses?status=' + RegisterStatus.IN_PROGRESS,
      );
      setCourseList(response.data.courseList);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getRegisteredCourseList();
    setCourseList([]);
  }, []);

  return (
    <section className="flex items-center justify-center ">
      {isLogin ? (
        courseList.length ? (
          <ul className="flex w-full flex-col gap-6 tablet:grid tablet:max-w-screen-tablet tablet:grid-cols-3 desktop:max-w-screen-desktop">
            {courseList.length ? (
              courseList.map((course) => (
                <Link href={PATH.COURSE(course.courseId, 'curriculum')} key={course.courseId} className="w-full">
                  <HomeCourseCard key={course.courseId} course={course} />
                </Link>
              ))
            ) : (
              <p className="body2 text-neutral-gray-950">수강 중인 강좌가 없어요</p>
            )}
          </ul>
        ) : (
          <p className="body1 py-4">수강 중인 강좌가 없습니다.</p>
        )
      ) : (
        <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-gray-300 bg-neutral-gray-50">
          <p className="body1 text-neutral-gray-950">로그인 후에 강의를 수강할 수 있어요</p>
          <Link href={SERVER_BASE_URL + END_POINT.NAVER_LOGIN(PATH.HOME)}>
            <Button>3초 만에 로그인</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
