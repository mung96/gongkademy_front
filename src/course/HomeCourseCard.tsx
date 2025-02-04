import { Course } from '@/course/type';
import { getCourseThumbnailPath } from '@/utils/image';
import Image from 'next/image';

type Props = {
  course: Course;
};

export default function HomeCourseCard({ course }: Props) {
  // console.log('Ttt' + thumbnail);
  return (
    <li className="flex w-full flex-col gap-2 ">
      <div className=" h-[207px] w-full min-w-[163px] rounded-lg tablet:h-[200px] tablet:w-[352px] desktop:w-[330px]">
        <Image
          src={getCourseThumbnailPath(course.thumbnail)}
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
