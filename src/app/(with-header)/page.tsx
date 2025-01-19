'use client';

import Button from '@/components/Button';
import PencilIcon from '@/app/assets/svg/PencilIcon.svg';
import ListItem from '@/components/ListItem';
import CurriculumItem, { PlayStatus } from '@/course/CurriculumItem';
import BoardItem, { BoardCategory } from '@/board/BoardItem';

export default function Home() {
  return (
    <>
      <Button icon={<PencilIcon />} onClick={() => console.log('클릭')} variant="outlined">
        글쓰기
      </Button>
      <ListItem label="리스트 아이템" icon={<PencilIcon />} isSelect={false} />
      <ListItem label="리스트 아이템" icon={<PencilIcon />} isSelect={true} />
      <CurriculumItem title="커리큘럼 아이템" runTime={0} status={PlayStatus.COMPLETED} />
      <BoardItem
        title="게시판 아이템"
        content="내용"
        date="2021-10-10"
        category={BoardCategory.WORRY}
        courseTitle="코스 타이틀"
        lectureTitle="강의 타이틀"
        commentCount={0}
      />
    </>
  );
}
