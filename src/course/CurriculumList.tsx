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
  const response = await apiServerRequester.get<GetCurriculumListResponse>(`/courses/${courseId}/lectures`);
  return response.data;
}
export default async function CurriculumList({ courseId }: Props) {
  const { isRegister, lectureList } = await getCurriculumList(courseId);

  return (
    <ul className="flex flex-col">
      {lectureList.map((lecture) =>
        isRegister ? (
          <Link href={PATH.LECTURE(lecture.lectureId, courseId)} key={lecture.lectureId}>
            <CurriculumItem lecture={lecture} />
          </Link>
        ) : (
          <CurriculumItem lecture={lecture} key={lecture.lectureId} />
        ),
      )}
    </ul>
  );
}
