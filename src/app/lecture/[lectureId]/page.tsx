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
import { useRouter } from 'next/navigation';
type GetCourseDetailResponse = {
  title: string;
  thumbnail: string;
  courseNote: string;
  courseTime: number;
  isRegister: boolean;
};
type GetLectureDetailResponse = {
  title: string;
  lastPlayedTime: number;
  lastLectureId: number;
  nextLectureId: number;
  prevLectureId: number;
  url: string;
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
async function getLectureDetailResponse(lectureId: number, onSuccess?: (data: GetLectureDetailResponse) => void) {
  try {
    const response = await apiRequester.get<GetLectureDetailResponse>(`/courses/lectures/${lectureId}`);
    if (onSuccess) {
      onSuccess(response.data);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return { title: '', lastPlayedTime: 0, lastLectureOrder: 0, url: '' };
}
//TODO: 수강 중이 아닐때 튕겨내야함.
export default function Page({
  params,
  searchParams,
}: {
  params: { lectureId: number };
  searchParams: { courseId: number };
}) {
  const courseId = Number(searchParams.courseId);
  const lectureId = Number(params.lectureId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courseDetail, setCourseDetail] = useState<GetCourseDetailResponse>();
  const [lectureDetail, setLectureDetail] = useState<GetLectureDetailResponse>();

  const router = useRouter();
  useEffect(() => {
    getCourseDetailResponse(courseId, (data) => setCourseDetail(data));
    getLectureDetailResponse(lectureId, (data) => setLectureDetail(data));
  }, []);

  return (
    <main className="flex w-full flex-col items-center tablet:max-w-screen-tablet desktop:max-w-[1232px] ">
      <header className="flex h-14 w-full items-center justify-between px-6">
        <Button icon={<MenuIcon />} onClick={() => setIsSidebarOpen(true)}>
          메뉴
        </Button>
        <p className="subtitle2 tablet:subtitle3">{lectureDetail?.title}</p>
      </header>
      {isSidebarOpen && (
        <>
          <PlayerSidebar
            onClose={() => setIsSidebarOpen(false)}
            courseId={courseId}
            lectureId={lectureId}
            courseTime={courseDetail?.courseTime}
          />
          <div className="fixed inset-0 z-30 bg-neutral-gray-950 opacity-25" onClick={() => setIsSidebarOpen(false)} />
        </>
      )}

      {/* TODO: size 반응형 별로 잡아야함. */}
      <div className="flex w-full flex-col items-center justify-center tablet:max-w-screen-tablet desktop:max-w-[1232px]">
        {lectureDetail && (
          <YouTube
            videoId={lectureDetail?.url}
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
        )}
      </div>

      <div className="flex w-full flex-col gap-4 px-4 pt-4">
        <LectureQuestionList courseId={courseId} lectureId={lectureId} />
      </div>
      <footer className="mt-[72px] flex w-full justify-between px-6 py-[6px]">
        <Link href={PATH.COURSE(courseId, 'curriculum')}>
          <Button icon={<HomeIcon />}>강좌 홈</Button>
        </Link>

        <div className="flex gap-2">
          {lectureDetail?.prevLectureId && (
            <Button variant="outlined" onClick={() => router.push(PATH.LECTURE(lectureDetail.prevLectureId, courseId))}>
              이전 강의
            </Button>
          )}
          {lectureDetail?.nextLectureId && (
            <Button variant="outlined" onClick={() => router.push(PATH.LECTURE(lectureDetail.nextLectureId, courseId))}>
              다음 강의
            </Button>
          )}
        </div>
      </footer>
    </main>
  );
}
