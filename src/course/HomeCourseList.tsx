'use client';

import Button from '@/components/Button';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import { PATH } from '@/constants/path';
import CourseCard from '@/course/CourseCard';
import { Course } from '@/course/type';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
const courseList: Course[] = [
  {
    id: '1',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '2',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '3',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '4',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '5',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '6',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '7',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '8',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '9',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '10',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '11',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '12',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
];
export default function HomeCourseList() {
  const isLogin = false;
  const dispatch = useDispatch();
  return (
    <section className="flex items-center justify-center ">
      {isLogin ? (
        <ul className="flex flex-col gap-6 tablet:max-w-screen-tablet desktop:max-w-screen-desktop">
          {courseList.map((course) => (
            <Link href={PATH.COURSE(course.id) + `?tab=curriculum`} key={course.id}>
              <CourseCard key={course.id} course={course} />
            </Link>
          ))}
        </ul>
      ) : (
        <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-gray-300 bg-neutral-gray-50">
          <p className="body1 text-neutral-gray-950">로그인 후에 강의를 수강할 수 있어요</p>
          <Link href={SERVER_BASE_URL + END_POINT.NAVER_LOGIN}>
            <Button onClick={() => console.log('로그인')}>3초 만에 로그인</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
