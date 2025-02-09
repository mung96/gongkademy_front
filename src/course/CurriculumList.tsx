import { apiServerRequester } from '@/api/serverRequest';
import { PATH } from '@/constants/path';
import CurriculumItem from '@/course/CurriculumItem';
import { LectureItem } from '@/course/type';
import Link from 'next/link';

type Props = {
  courseId: number;
};

type GetCurriculumListResponse = {
  isRegister: boolean;
  lectureList: LectureItem[];
};

export async function getCurriculumList(courseId: number) {
  try {
    const response = await apiServerRequester.get<GetCurriculumListResponse>(`/courses/${courseId}/lectures`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return { isRegister: false, lectureList: [] };
}
export default async function CurriculumList({ courseId }: Props) {
  const { isRegister, lectureList } = await getCurriculumList(courseId);

  return (
    <ul className="flex flex-col">
      {lectureList.map((lecture) =>
        isRegister ? (
          <Link href={PATH.LECTURE(courseId, lecture.lectureId, lecture.lectureOrder)} key={lecture.lectureId}>
            <CurriculumItem lecture={lecture} />
          </Link>
        ) : (
          <CurriculumItem lecture={lecture} key={lecture.lectureId} />
        ),
      )}
    </ul>
  );
}
