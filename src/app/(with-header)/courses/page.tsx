import CourseCard from '@/course/CourseCard';
import { Course } from '@/course/type';

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
];

export default function Page() {
  return (
    <main>
      <section>
        <ul className="grid grid-cols-2 justify-center gap-x-4 border-2">
          {courseList.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ul>
      </section>
    </main>
  );
}
