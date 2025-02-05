'use client';

import { apiRequester } from '@/api/requester';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const COMMENT_MAX_LENGTH = 1_000;

type FormValues = {
  content: string;
};
type Props = {
  boardId: number;
};

export default function CommentInput({ boardId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isValid: isFormValid, isSubmitting },
  } = useForm<FormValues>();
  const router = useRouter();

  async function writeComment(formValues: FormValues) {
    try {
      const response = await apiRequester.post(`/boards/${boardId}/comments`, { ...formValues });
      router.refresh();
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit((data) => writeComment(data))}
      className="flex w-full flex-col gap-2 tablet:flex-row  tablet:w-[720px] desktop:w-[816px]"
    >
      <textarea
        placeholder={'댓글을 적어주세요'}
        maxLength={COMMENT_MAX_LENGTH}
        {...register('content', { required: true, maxLength: COMMENT_MAX_LENGTH })}
        className="body1 h-[140px] w-full resize-none rounded-lg bg-neutral-gray-100 px-3 py-2 pr-9 text-neutral-gray-700 outline-none outline-offset-0 placeholder:text-neutral-gray-700 hover:outline-primary-300 focus:text-neutral-gray-900 focus:caret-primary-600 focus:outline-primary-500 disabled:text-neutral-gray-300"
      />
      <Button className="w-full tablet:w-[56px]" disabled={!isFormValid || isSubmitting}>
        작성
      </Button>
    </form>
  );
}
