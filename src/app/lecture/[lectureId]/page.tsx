'use client';

import Button from '@/components/Button';
import HomeIcon from '/public/assets/svg/HomeIcon.svg';
import MenuIcon from '/public/assets/svg/MenuIcon.svg';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import PlayerSidebar from '@/course/PlayerSidebar';
import LectureQuestionList from '@/course/LectureQuestionList';
import { PATH } from '@/constants/path';
import Link from 'next/link';
import { apiRequester } from '@/api/requester';
type GetCourseDetailResponse = {
  title: string;
  thumbnail: string;
  courseNote: string;
  courseTime: number;
  isRegister: boolean;
};

async function getCourseDetailResponse(courseId: number, onSuccess?: (data: GetCourseDetailResponse) => void) {
  try {
    const response = await apiRequester.get<GetCourseDetailResponse>(`/courses/${courseId}`);
    if (onSuccess) {
      onSuccess(response.data);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return { title: '', thumbnail: '', courseNote: '', courseTime: 0, isRegister: false };
}

export default function Page({
  searchParams,
  params,
}: {
  searchParams: { courseId: number; lectureOrder: number };
  params: { lectureId: number };
}) {
  const courseId = Number(searchParams.courseId);
  const lectureOrder = Number(searchParams.lectureOrder);
  const lectureId = Number(params.lectureId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courseDetail, setCourseDetail] = useState<GetCourseDetailResponse>();
  useEffect(() => {
    getCourseDetailResponse(courseId, (data) => setCourseDetail(data));
  }, []);

  return (
    <main className="flex w-full flex-col items-center tablet:max-w-screen-tablet desktop:max-w-[1232px] ">
      <header className="flex h-14 w-full items-center justify-between px-6">
        <Button icon={<MenuIcon />} onClick={() => setIsSidebarOpen(true)}>
          메뉴
        </Button>
        <p className="subtitle2 tablet:subtitle3">{courseDetail?.title}</p>
      </header>
      {isSidebarOpen && (
        <>
          <PlayerSidebar
            onClose={() => setIsSidebarOpen(false)}
            courseId={courseId}
            lectureOrder={lectureOrder}
            courseTime={courseDetail?.courseTime}
          />
          <div className="fixed inset-0 z-30 bg-neutral-gray-950 opacity-25" onClick={() => setIsSidebarOpen(false)} />
        </>
      )}

      {/* TODO: size 반응형 별로 잡아야함. */}
      <div className="flex w-full flex-col items-center justify-center tablet:max-w-screen-tablet desktop:max-w-[1232px]">
        <YouTube
          videoId={'3opFbsYdQho'}
          opts={{
            // width: '100%',
            'aspect-ratio': 16 / 9,
            playerVars: {
              autoplay: 1,
              rel: 0, //관련동영상 없애기
              modestbranding: 1,
              controls: 1,
            },
          }}
          onPlay={() => console.log('재생')}
          onReady={() => console.log('준비')}
        />
      </div>

      <div className="flex w-full flex-col gap-4 px-4 pt-4">
        <LectureQuestionList courseId={courseId} lectureId={lectureId} />
      </div>
      <footer className="mt-[72px] flex w-full justify-between px-6 py-[6px]">
        <Link href={PATH.COURSE(courseId, 'curriculum')}>
          <Button icon={<HomeIcon />}>강좌 홈</Button>
        </Link>

        <div className="flex gap-2">
          <Button variant="outlined" onClick={() => console.log('이전 강의 클릭')}>
            이전 강의
          </Button>
          <Button variant="outlined" onClick={() => console.log('다음 강의 클릭')}>
            다음 강의
          </Button>
        </div>
      </footer>
    </main>
  );
}
