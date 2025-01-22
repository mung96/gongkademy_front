import { PATH } from '@/constants/path';
import CourseCard from '@/course/CourseCard';
import { Course } from '@/course/type';
import Link from 'next/link';

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

export default function Page() {
  return (
    <main className="px-4 pb-[72px] pt-9 tablet:px-6 tablet:pt-12 desktop:pt-16">
      <section className="flex items-center justify-center ">
        <ul className="grid grid-cols-2 gap-4 tablet:max-w-screen-tablet desktop:max-w-screen-desktop desktop:grid-cols-3">
          {courseList.map((course) => (
            <Link href={PATH.COURSE(course.id) + `?tab=curriculum`} key={course.id}>
              <CourseCard key={course.id} course={course} />
            </Link>
          ))}
        </ul>
      </section>
    </main>
  );
}
