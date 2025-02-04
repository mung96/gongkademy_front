import { Course } from '@/course/type';
import Image from 'next/image';

type Props = {
  course: Course;
};

// function getCourseThumbnailPath(course: Course) {
//   return course.thumbnail;
// }

export default function HomeCourseCard({ course }: Props) {
  return (
    <li className="flex w-full flex-col gap-2 ">
      <div className=" h-[207px] w-full min-w-[163px] rounded-lg tablet:h-[200px] tablet:w-[352px] desktop:w-[330px]">
        {/* <img className="rounded-lg size-full" src={course.thumbnail} alt={'강좌 썸네일'} /> */}
        <Image
          src="/assets/jpg/재료역학1.jpeg"
          alt={`${course.title} 썸네일`}
          width={330}
          height={207}
          className="rounded-lg"
        />
      </div>
      <p className="subtitle2 text-neutral-gray-950">{course.title}</p>
    </li>
  );
}
