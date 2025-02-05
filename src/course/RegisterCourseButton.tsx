'use client';

import { apiRequester } from '@/api/requester';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

type Props = {
  courseId: number;
};

export default function RegisterCourseButton({ courseId }: Props) {
  const router = useRouter();

  async function registerCourse(courseId: number) {
    try {
      const response = await apiRequester.post(`/courses/${courseId}/register`);
      alert('수강 신청이 완료되었습니다.');
      router.refresh();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button variant="filled" onClick={() => registerCourse(courseId)}>
      수강 신청
    </Button>
  );
}
