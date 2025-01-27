'use client';

import { BoardCategory } from '@/board/BoardItem';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ListItem from '@/components/ListItem';
import TextArea from '@/components/TextArea';
import { PATH } from '@/constants/path';
import { exhaustiveCheck } from '@/utils/typeGuard';
import Link from 'next/link';
import { useState } from 'react';

const getBodyPlaceholder = (category: BoardCategory) => {
  if (category == BoardCategory.WORRY) {
    return '고민을 적어주세요';
  }
  if (category == BoardCategory.QUESTION) {
    return '질문을 적어주세요';
  } else {
    exhaustiveCheck(category);
    return '';
  }
};

const BODY_MAX_LENGTH = 10_000;

export default function Page({ searchParams }: { searchParams: { category: BoardCategory } }) {
  const { category } = searchParams;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  return (
    <main className="flex flex-col items-center gap-4 px-4 pb-[72px] pt-9 tablet:flex-row tablet:items-start tablet:justify-center tablet:px-6 tablet:pt-12 desktop:pt-16">
      <form className="flex w-full flex-col gap-4">
        <nav className="flex tablet:w-[168px] tablet:flex-col tablet:gap-3 desktop:w-[192px]">
          <Link href={PATH.COMMUNITY_WRITE(BoardCategory.WORRY)} className="flex-1">
            <ListItem label={'고민'} isSelect={category === BoardCategory.WORRY} />
          </Link>
          <Link href={PATH.COMMUNITY_WRITE(BoardCategory.QUESTION)} className="flex-1">
            <ListItem label={'질문'} isSelect={category === BoardCategory.QUESTION} />
          </Link>
        </nav>
        <Input placeholder="제목을 적어주세요" onChange={(e) => setTitle(e.target.value)} value={title} />
        <TextArea
          onChange={(e) => setBody(e.target.value)}
          placeholder={getBodyPlaceholder(category)}
          value={body}
          maxLength={BODY_MAX_LENGTH}
        />
        <Button onClick={() => console.log('글쓰기 클릭')}>올리기</Button>
      </form>
    </main>
  );
}
