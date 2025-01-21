import { Course } from '@/course/type';

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  return (
    <li className="flex w-full flex-col gap-2 ">
      <div className=" h-[207px] w-full min-w-[163px] rounded-lg tablet:h-[200px] tablet:w-[352px] desktop:w-[330px]">
        <img className="size-full rounded-lg" src={course.thumbnail} alt={'강좌 썸네일'} />
      </div>
      <p className="subtitle2 text-neutral-gray-950">{course.title}</p>
    </li>
  );
}
