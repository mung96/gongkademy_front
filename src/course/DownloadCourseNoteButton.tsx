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
        }
      }
    }
  };

  // const handleDownload = () => {
  //   const fileUrl =
  //     'https://blog.kakaocdn.net/dn/bnqe5b/btr2RieadXb/l5TCrkNPyhwSb9VJWNcW00/%E1%84%8C%E1%85%A2%E1%84%85%E1%85%AD%E1%84%8B%E1%85%A7%E1%86%A8%E1%84%92%E1%85%A1%E1%86%A8%20%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD.pdf?attach=1&knm=tfile.pdf';
  //   const link = document.createElement('a');
  //   link.href = fileUrl;
  //   link.setAttribute('download', '강의자료.pdf'); // 원하는 파일명으로 변경 가능
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // };

  return (
    <Button variant="outlined" onClick={handleDownload}>
      <a ref={buttonRef}>강의 자료 다운로드</a>
    </Button>
  );
}
