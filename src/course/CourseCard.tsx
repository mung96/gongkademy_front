import { CourseItem } from '@/course/type';
import { getCourseThumbnailPath } from '@/utils';
import Image from 'next/image';

type Props = {
  course: CourseItem;
};

export default function CourseCard({ course }: Props) {
  return (
    <li className="flex w-full flex-col gap-2 ">
      <div className="relative h-[207px]  w-full min-w-[163px] rounded-lg  tablet:h-[200px] tablet:w-[352px] desktop:w-[330px]">
        <Image
          src={getCourseThumbnailPath(course.thumbnail)}
          alt={`${course.title} 썸네일`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          sizes="(min-width: 768px) 352px, (min-width: 1024px) 330px, 320px"
        />
      </div>
      <p className="subtitle2 text-neutral-gray-950">{course.title}</p>
    </li>
  );
}
