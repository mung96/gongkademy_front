'use client';
import { apiRequester } from '@/api/requester';
import { PATH } from '@/constants/path';
import CurriculumItem from '@/course/CurriculumItem';
import { LectureItem } from '@/course/type';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  courseId: number;
};

type GetCurriculumListResponse = {
  isRegister: boolean;
  lectureList: LectureItem[];
};

export async function getCurriculumList(courseId: number, onSuccess?: (data: GetCurriculumListResponse) => void) {
  const response = await apiRequester.get<GetCurriculumListResponse>(`/courses/${courseId}/lectures`);
  if (onSuccess) {
    onSuccess(response.data);
  }
  return response.data;
}
export default function CurriculumList({ courseId }: Props) {
  const [response, setResponse] = useState<GetCurriculumListResponse>({ isRegister: false, lectureList: [] });

  useEffect(() => {
    getCurriculumList(courseId, (response) => setResponse(response));
  }, []);

  return (
    <ul className="flex flex-col">
      {response.lectureList.map((lecture) =>
        response.isRegister ? (
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
