'use client';

import Button from '@/components/Button';
import MenuIcon from '/public/assets/svg/MenuIcon.svg';
import MagnifierIcon from '/public/assets/svg/MagnifierIcon.svg';
import HomeIcon from '/public/assets/svg/HomeIcon.svg';
import PencilIcon from '/public/assets/svg/PencilIcon.svg';
import Input from '@/components/Input';
import { useState } from 'react';
import BoardItem from '@/board/BoardItem';
import YouTube from 'react-youtube';
import PlayerSidebar from '@/course/PlayerSidebar';
import { boardList } from '@/dummy';

export default function Page() {
  const [search, setSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <header className="flex h-14 items-center justify-between px-6">
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

      <div>
        <YouTube
          videoId={'3opFbsYdQho'}
          opts={{
            width: '100%',
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

      <div className="flex flex-col gap-4 px-4 pt-4">
        <div className="flex items-center gap-2">
          <Input
            value={search}
            placeholder="질문 검색"
            onChange={(e) => setSearch(e.target.value)}
            icon={<MagnifierIcon />}
            label={'search'}
          />
          <Button icon={<PencilIcon />} onClick={() => console.log('글쓰기 클릭')}>
            글쓰기
          </Button>
        </div>

        <ul className="w-full">
          {boardList.map((board) => (
            <BoardItem
              title={board.title}
              content={board.content}
              date={board.date}
              category={board.category}
              commentCount={board.commentCount}
              courseTitle={board.courseTitle}
              lectureTitle={board.lectureTitle}
              key={board.id}
            />
          ))}
        </ul>
      </div>
      <footer className="mt-[72px] flex justify-between px-6 py-[6px]">
        <Button icon={<HomeIcon />} onClick={() => console.log('강좌 홈 클릭')}>
          강좌 홈
        </Button>

        <div className="flex gap-2">
          <Button variant="outlined" onClick={() => console.log('이전 강의 클릭')}>
            이전 강의
          </Button>
          <Button variant="outlined" onClick={() => console.log('다음 강의 클릭')}>
            다음 강의
          </Button>
        </div>
      </footer>
    </div>
  );
}
