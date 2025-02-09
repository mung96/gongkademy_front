'use client';

import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { apiRequester } from '@/api/requester';
import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { HTTP_STATUS } from '@/constants/api';

type FormValues = {
  nickname: string;
};
const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 20;
async function getMemberInfo(onSuccess?: (nickname: string) => void) {
  try {
    const response = await apiRequester.get<{ nickname: string }>(`/members`);
    if (onSuccess) {
      onSuccess(response.data.nickname);
    }
    return response.data;
  } catch (error) {
    console.log('error발생');
    console.log(error);
  }
  return '';
}

async function updateNickname(formValues: FormValues, onSuccess?: (nickname: string) => void) {
  try {
    const response = await apiRequester.patch<{ nickname: string }>(`/members`, { ...formValues });
    alert('닉네임이 변경되었습니다');
    if (onSuccess) {
      onSuccess(response.data.nickname);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === HTTP_STATUS.CONFLICT) {
        alert('이미 사용중인 닉네임입니다');
        return;
      } else {
        console.log('error발생');
        console.log(error);
      }
    }
  }
}

export default function Page() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    getMemberInfo((nickname) => setValue('nickname', nickname));
  }, []);

  return (
    <form
      method="post"
      onSubmit={handleSubmit((formValues) => updateNickname(formValues, (nickname) => setValue('nickname', nickname)))}
      className={'flex w-full flex-col items-center gap-4  tablet:max-w-[536px] tablet:gap-6 desktop:max-w-[608px]'}
    >
      <h2 className={'title2 tablet:title1 text-neutral-gray-950'}>프로필 수정</h2>
      <div className={'flex w-full flex-col justify-start  gap-2'}>
        <label className={'subtitle2 text-neutral-gray-950'}>닉네임</label>
        <Input
          placeholder="닉네임을 입력해주세요"
          register={register('nickname', {
            required: true,
            minLength: NICKNAME_MIN_LENGTH,
            maxLength: NICKNAME_MAX_LENGTH,
            pattern: /^[a-zA-Z가-힣]+$/,
          })}
          label="nickname"
        />
        <p className={' text-neutral-gray-500'}>닉네임은 영어, 한글로 2자이상 20자이하 입니다</p>
      </div>

      <Button className={'w-full desktop:max-w-[608px]'} disabled={!isValid || isSubmitting}>
        변경
      </Button>
    </form>
  );
}
