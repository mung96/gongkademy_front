'use client';

import Button from '@/components/Button';
import HomeIcon from '/public/assets/svg/HomeIcon.svg';
import MenuIcon from '/public/assets/svg/MenuIcon.svg';
import { useState } from 'react';
import YouTube from 'react-youtube';
import PlayerSidebar from '@/course/PlayerSidebar';
import LectureQuestionList from '@/course/LectureQuestionList';
import { PATH } from '@/constants/path';
import Link from 'next/link';

export default function Page({
  searchParams,
  params,
}: {
  searchParams: { courseId: number };
  params: { lectureId: number };
}) {
  const [search, setSearch] = useState('');
  const { courseId } = searchParams;
  const { lectureId } = params;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex w-full flex-col items-center tablet:max-w-screen-tablet desktop:max-w-[1232px] ">
      <header className="flex h-14 w-full items-center justify-between px-6">
        <Button icon={<MenuIcon />} onClick={() => setIsSidebarOpen(true)}>
          메뉴
        </Button>
        <p className="subtitle2 tablet:subtitle3">강의제목</p>
      </header>
      {isSidebarOpen && (
        <>
          <PlayerSidebar onClose={() => setIsSidebarOpen(false)} />
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
