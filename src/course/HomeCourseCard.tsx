import { Course } from '@/course/type';
import { getCourseThumbnailPath } from '@/utils';
import Image from 'next/image';

type Props = {
  course: Course;
};

export default function HomeCourseCard({ course }: Props) {
  return (
    <li className="flex w-full flex-col gap-2 ">
      <div className="min-w-[163px] rounded-lg  tablet:max-w-[233px] desktop:max-w-[334px]">
        <Image
          src={getCourseThumbnailPath(course.thumbnail)}
          alt={`${course.title} 썸네일`}
          width={730}
          height={425}
          layout="responsive"
          className="rounded-lg "
          sizes="(min-width: 768px) 233px, (min-width: 1024px) 334px"
        />
      </div>
      <p className="subtitle2 text-neutral-gray-950">{course.title}</p>
    </li>
  );
}
