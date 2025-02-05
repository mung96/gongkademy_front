'use client';

import Button from '@/components/Button';
import { apiRequester } from '@/api/requester';

type Props = {
  courseId: number;
};

export default function DownloadCourseNoteButton({ courseId }: Props) {
  const handleDownload = async () => {
    try {
      const response = await apiRequester.get(`/courses/${courseId}/note`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition.split('filename=').pop();

      link.setAttribute('download', fileName); // 파일 이름 설정
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('파일 다운로드 실패:', error);
    }
  };

  return (
    <Button variant="outlined" onClick={handleDownload}>
      강의 자료 다운로드
    </Button>
  );
}
