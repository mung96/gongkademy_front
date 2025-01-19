'use client';

import Button from '@/components/Button';

export default function Home() {
  return (
    <Button onClick={() => console.log('1')} variant={'outlined'} disabled={true}>버튼</Button>
  );
}
