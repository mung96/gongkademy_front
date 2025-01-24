'use client';

import Button from '@/components/Button';
import MenuIcon from '@/app/assets/svg/MenuIcon.svg';
import MagnifierIcon from '@/app/assets/svg/MagnifierIcon.svg';
import HomeIcon from '@/app/assets/svg/HomeIcon.svg';
import PencilIcon from '@/app/assets/svg/PencilIcon.svg';
import Input from '@/components/Input';
import { useState } from 'react';
import BoardItem from '@/board/BoardItem';
import { boardList } from '@/app/(with-header)/courses/[id]/page';
export default function Page() {
  const [search, setSearch] = useState('');
  return (
    <div>
      <header className="flex items-center justify-between px-6 h-14">
        <Button icon={<MenuIcon />} onClick={() => console.log('메뉴 클릭')}>
          메뉴
        </Button>
        <p className="subtitle2 tablet:subtitle3">강의제목</p>
      </header>
      <div className="flex flex-col gap-4 px-4">
        <div className="flex items-center gap-2">
          <Input
            value={search}
            placeholder="질문 검색"
            onChange={(e) => setSearch(e.target.value)}
            icon={<MagnifierIcon />}
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
