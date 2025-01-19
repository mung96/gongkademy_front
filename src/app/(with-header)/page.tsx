'use client';

import Button from '@/components/Button';
import PencilIcon from '@/app/assets/svg/PencilIcon.svg';
import ListItem from '@/components/ListItem';
import CurriculumItem, { PlayStatus } from '@/course/CurriculumItem';

export default function Home() {
  return (
    <>
      <Button icon={<PencilIcon />} onClick={() => console.log('클릭')} variant="outlined">
        글쓰기
      </Button>
      <ListItem label="리스트 아이템" icon={<PencilIcon />} isSelect={false} />
      <ListItem label="리스트 아이템" icon={<PencilIcon />} isSelect={true} />
      <CurriculumItem title="커리큘럼 아이템" runTime={0} status={PlayStatus.COMPLETED} />
    </>
  );
}
