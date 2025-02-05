'use client';

import { apiRequester } from '@/api/requester';
import Button from '@/components/Button';

type Props = {
  courseId: number;
};

async function registerCourse(courseId: number) {
  try {
    const response = await apiRequester.post(`/courses/${courseId}/register`);
    alert('수강 신청이 완료되었습니다.');
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default function DownloadCourseNoteButton({ courseId }: Props) {
  return (
    <Button variant="outlined" onClick={() => console.log('자료다운')}>
      강의 자료 다운로드
    </Button>
  );
}
