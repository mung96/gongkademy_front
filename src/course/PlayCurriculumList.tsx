'use client';

import { apiRequester } from '@/api/requester';
import { PATH } from '@/constants/path';
import CurriculumItem from '@/course/CurriculumItem';
import { LectureItem } from '@/course/type';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  courseId: number;
  lectureId: number;
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
export default function PlayCurriculumList({ courseId, lectureId }: Props) {
  const [lectureList, setLectureList] = useState<LectureItem[]>([]);

  useEffect(() => {
    getCurriculumList(courseId, (data) => {
      setLectureList(data.lectureList);
    });
  }, []);

  return (
    <ul className="flex flex-col">
      {lectureList.map((lecture) => (
        <Link className="w-full" href={PATH.LECTURE(lecture.lectureId, courseId)} key={lecture.lectureId}>
          <CurriculumItem lecture={lecture} isPlaying={lecture.lectureId === lectureId} />
        </Link>
      ))}
    </ul>
  );
}
