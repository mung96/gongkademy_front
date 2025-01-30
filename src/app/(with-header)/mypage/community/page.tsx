'use client';

import Link from 'next/link';
import { PATH } from '@/constants/path';
import BoardItem, { BoardCategory } from '@/board/BoardItem';
import ListItem from '@/components/ListItem';
import Input from '@/components/Input';
import Button from '@/components/Button';
import PencilIcon from '@/app/assets/svg/PencilIcon.svg';
import ProfileIcon from '@/app/assets/svg/ProfileIcon.svg';
import VideoIcon from '@/app/assets/svg/VideoIcon.svg';

import { boardList } from '@/app/(with-header)/courses/[courseId]/page';
import Pagination from '@/components/Pagination';
import { useState } from 'react';

export default function Page({ params }: { params: { boardCategory: BoardCategory } }) {
  const { boardCategory } = params;
  const [search, setSearch] = useState('');

  return (
    <div className="flex w-full flex-col gap-3  tablet:max-w-[536px] desktop:max-w-[1024px]">
      <div className="flex w-full flex-1 items-center gap-3">
        <Input value={search} label="search" placeholder="질문 검색" onChange={(e) => setSearch(e.target.value)} />
        <Link href={PATH.COMMUNITY_WRITE(boardCategory)}>
          <Button icon={<PencilIcon />} onClick={() => console.log('글쓰기 클릭')}>
            글쓰기
          </Button>
        </Link>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <ul className="w-full">
          {boardList.map((board) => (
            <Link href={PATH.COMMUNITY_DETAIL(boardCategory, Number(board.id))} key={board.id}>
              <BoardItem
                title={board.title}
                content={board.content}
                date={board.date}
                category={board.category}
                commentCount={board.commentCount}
                courseTitle={board.courseTitle}
                lectureTitle={board.lectureTitle}
              />
            </Link>
          ))}
        </ul>
        <Pagination totalPage={38} limit={20} buttonPerPage={5} />
      </div>
    </div>
  );
}
