'use client';

import { apiRequester } from '@/api/requester';
import Button from '@/components/Button';
import { HTTP_STATUS } from '@/constants/api';
import { RootState } from '@/store/rootReducer';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

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
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  async function writeComment(formValues: FormValues) {
    try {
      const response = await apiRequester.post(`/boards/${boardId}/comments`, { ...formValues });
      router.refresh();
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
          alert('로그인이 필요합니다.');
        }
      }
    }
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit((data) => writeComment(data))}
      className="flex w-full flex-col gap-2 tablet:w-[720px]  tablet:flex-row desktop:w-[816px]"
    >
      <textarea
        placeholder={isLogin ? '댓글을 적어주세요' : '로그인 후 사용 가능합니다'}
        maxLength={COMMENT_MAX_LENGTH}
        {...register('content', { required: true, maxLength: COMMENT_MAX_LENGTH })}
        readOnly={!isLogin || isSubmitting}
        className="body1 h-[140px] w-full resize-none rounded-lg bg-neutral-gray-100 px-3 py-2 pr-9 text-neutral-gray-700 outline-none outline-offset-0 placeholder:text-neutral-gray-700 hover:outline-primary-300 focus:text-neutral-gray-900 focus:caret-primary-600 focus:outline-primary-500 disabled:text-neutral-gray-300"
      />
      <Button className="w-full tablet:w-[56px]" disabled={!isFormValid || isSubmitting}>
        작성
      </Button>
    </form>
  );
}
