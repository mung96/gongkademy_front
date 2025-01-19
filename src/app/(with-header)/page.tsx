'use client';

import Button from '@/components/Button';
import PencilIcon from '@/app/assets/svg/PencilIcon.svg';

export default function Home() {
  return (
    <Button icon={<PencilIcon />} onClick={() => console.log('클릭')} variant='outlined' >글쓰기</Button>
  );
}
