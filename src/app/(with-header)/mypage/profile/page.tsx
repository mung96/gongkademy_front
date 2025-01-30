'use client';

import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';

type FormValues = {
  nickname: string;
};

export default function Page() {
  const { register, handleSubmit } = useForm<FormValues>();
  return (
    <div className="flex w-full flex-col items-center ">
      <div
        className={'flex w-full flex-col items-center gap-4   tablet:max-w-[536px] tablet:gap-6 desktop:max-w-[608px]'}
      >
        <h2 className={'title2 text-neutral-gray-950'}>프로필 수정</h2>
        <div className={'flex w-full flex-col gap-2 '}>
          <label className={'subtitle2 text-neutral-gray-950'}>닉네임</label>
          <Input placeholder="닉네임을 입력해주세요" register={register} label="nickname" />
        </div>
        <Button className={'w-full desktop:max-w-[608px]'} onClick={() => console.log('수정')}>
          변경
        </Button>
      </div>
    </div>
  );
}
