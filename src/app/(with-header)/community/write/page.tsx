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
import { useForm } from 'react-hook-form';

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
type FormValues = {
  title: string;
  body: string;
};
export default function Page({ searchParams }: { searchParams: { category: BoardCategory } }) {
  const { category } = searchParams;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { register, handleSubmit } = useForm<FormValues>();
  return (
    <main className="flex flex-col items-center gap-4 px-4 pb-[72px] pt-9 tablet:flex-row tablet:items-start tablet:justify-center tablet:px-6 tablet:pt-12 desktop:pt-16">
      <form
        className="flex w-full flex-col items-center gap-4 tablet:max-w-[720px] desktop:max-w-[816px]"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <nav className="flex w-full tablet:w-[192px]">
          <Link href={PATH.COMMUNITY_WRITE(BoardCategory.WORRY)} className="flex-1">
            <ListItem label={'고민'} isSelect={category === BoardCategory.WORRY} />
          </Link>
          <Link href={PATH.COMMUNITY_WRITE(BoardCategory.QUESTION)} className="flex-1">
            <ListItem label={'질문'} isSelect={category === BoardCategory.QUESTION} />
          </Link>
        </nav>
        <Input placeholder="제목을 적어주세요" register={register} label="title" />
        <TextArea
          placeholder={getBodyPlaceholder(category)}
          maxLength={BODY_MAX_LENGTH}
          label="body"
          register={register}
        />
        <Button className="w-full" onClick={() => console.log('글쓰기 클릭')}>
          올리기
        </Button>
      </form>
    </main>
  );
}
