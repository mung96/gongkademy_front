'use client';

import { BoardCategory } from '@/board/type';
import Button from '@/components/Button';
import Combobox from '@/components/Combobox';
import Input from '@/components/Input';
import ListItem from '@/components/ListItem';
import TextArea from '@/components/TextArea';
import { PATH } from '@/constants/path';
import { exhaustiveCheck } from '@/utils/typeGuard';
import Link from 'next/link';
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
  const {
    register,
    handleSubmit,
    formState: { isValid: isFormValid, isSubmitting },
  } = useForm<FormValues>({});
  return (
    <main className="flex flex-col items-center gap-4 px-4 pb-[72px] pt-9 tablet:flex-row tablet:items-start tablet:justify-center tablet:px-6 tablet:pt-12 desktop:pt-16">
      <form
        method="post"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="flex w-full flex-col items-center gap-4 tablet:max-w-[720px] desktop:max-w-[816px]"
      >
        <nav className="flex w-full tablet:w-[192px]">
          <Link href={PATH.COMMUNITY_WRITE(BoardCategory.WORRY)} className="flex-1">
            <ListItem label={'고민'} isSelect={category === BoardCategory.WORRY} />
          </Link>
          <Link href={PATH.COMMUNITY_WRITE(BoardCategory.QUESTION)} className="flex-1">
            <ListItem label={'질문'} isSelect={category === BoardCategory.QUESTION} />
          </Link>
        </nav>
        <Input placeholder="제목을 적어주세요" register={register('title', { required: true })} label="title" />
        {category === BoardCategory.QUESTION && (
          <div className="flex w-full gap-[14px] border">
            <Combobox placeholder={'강좌 선택'} items={[]} />
            <Combobox placeholder={'강의 선택'} items={[]} />
          </div>
        )}

        <TextArea
          placeholder={getBodyPlaceholder(category)}
          maxLength={BODY_MAX_LENGTH}
          label="body"
          register={register('body', { required: true })}
        />
        <Button className="w-full" disabled={!isFormValid || isSubmitting}>
          올리기
        </Button>
      </form>
    </main>
  );
}
