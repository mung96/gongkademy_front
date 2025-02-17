'use client';

import { apiRequester } from '@/api/requester';
import Button from '@/components/Button';
import { HTTP_STATUS } from '@/constants/api';
import { isAxiosError } from 'axios';
import { useRef } from 'react';

type DownloadCourseNoteResponse = {
  courseNoteUrl: string;
  courseNoteName: string;
};

type Props = {
  courseId: number;
};

export default function DownloadCourseNoteButton({ courseId }: Props) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = async () => {
    if (buttonRef.current !== null && buttonRef.current.href === '') {
      try {
        const response = await apiRequester.get<DownloadCourseNoteResponse>(`/courses/${courseId}/note`);

        if (buttonRef.current !== null) {
          console.log(response.data);
          buttonRef.current.href = response.data.courseNoteUrl;
          buttonRef.current.click();
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.status === HTTP_STATUS.NOT_FOUND) {
            if (error.response?.data.message === '수강 중인 강좌가 아닙니다.') {
              alert('수강 신청 후 다운받을 수 있습니다.');
            }
          }
          if (error.status === HTTP_STATUS.UNAUTHORIZED) {
            alert('로그인이 필요합니다.');
          }
        }
      }
    }
  };

  return (
    <Button variant="outlined" onClick={handleDownload}>
      <a ref={buttonRef}>강의 자료 다운로드</a>
    </Button>
  );
}
