'use client';

import Button from '@/components/Button';
import HomeIcon from '/public/assets/svg/HomeIcon.svg';
import MenuIcon from '/public/assets/svg/MenuIcon.svg';
import { useEffect, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
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
  const response = await apiRequester.get<GetCourseDetailResponse>(`/courses/${courseId}`);
  if (onSuccess) {
    onSuccess(response.data);
  }
  return response.data;
}
async function getLectureDetailResponse(lectureId: number, onSuccess?: (data: GetLectureDetailResponse) => void) {
  const response = await apiRequester.get<GetLectureDetailResponse>(`/courses/lectures/${lectureId}`);
  if (onSuccess) {
    onSuccess(response.data);
  }
  return response.data;
}

// api/courses/lectures/{lectureId}/play
async function postSavePoint(lectureId: number, savePoint: number, onSuccess?: () => void) {
  const response = await apiRequester.post(`/courses/lectures/${lectureId}/play`, {
    lastPlayedTime: savePoint,
  });
  if (onSuccess) {
    onSuccess();
  }
  return response.data;
}
//TODO: 수강 중이 아닐때 튕겨내야함.
const PLAY_STATE = {
  PAUSED: 2,
  PLAYING: 1,
};
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

  // const [savePoint, setSavePoint] = useState(0);
  const [player, setPlayer] = useState<YouTubePlayer>(undefined);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const UPDATE_PERIOD = 5_000;
  const startCourseLecturePlay = (event: YouTubeEvent) => {
    setPlayer(event.target);
    event.target.seekTo(lectureDetail?.lastPlayedTime, true);
  };
  //최근 수강 구간 업데이트
  let isSaving = false; //timer가 처음에만 동작하도록
  const updateCourseLectureSavePoint = useEffect(() => {
    if (player && !isSaving) {
      const timer = setInterval(() => {
        if (player.getPlayerState() === PLAY_STATE.PLAYING) {
          postSavePoint(lectureId, Math.floor(player.getCurrentTime()));
        }
      }, UPDATE_PERIOD);
      isSaving = true;
      setTimer(timer);
      return () => clearInterval(timer);
    }
  }, [player]);
  const clearTimer = useEffect(() => {
    if (player?.getPlayerState() === PLAY_STATE.PAUSED && timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [player]);
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
            onPlay={updateCourseLectureSavePoint}
            onReady={startCourseLecturePlay}
            onPause={clearTimer}
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
