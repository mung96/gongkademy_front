import { LectureItem, PlayStatus } from '@/course/type';
import { exhaustiveCheck } from '@/utils';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const statusStyles = cva(``, {
  variants: {
    status: {
      [PlayStatus.COMPLETED]: 'text-primary-500',
      [PlayStatus.IN_PROGRESS]: 'text-neutral-gray-950',
      [PlayStatus.NOT_PLAY]: 'text-secondary-500',
    },
  },
});

const getStatusLabel = (status: PlayStatus) => {
  if (status == PlayStatus.NOT_PLAY) {
    return '미수강';
  }
  if (status == PlayStatus.IN_PROGRESS) {
    return '수강중';
  }
  if (status == PlayStatus.COMPLETED) {
    return '수강완료';
  } else {
    exhaustiveCheck(status);
    return '';
  }
};

type Props = {
  lecture: LectureItem;
};

export default function CurriculumItem({ lecture }: Props) {
  return (
    <li className="flex h-[58px] min-w-[300px] items-center justify-between rounded-lg px-4 hover:bg-neutral-gray-50">
      <p className="subtitle2 tablet:subtitle3 text-neutral-gray-950">{lecture.title}</p>
      <div className="flex items-center gap-4">
        {lecture.playStatus !== null && (
          <p className={twMerge('body1', statusStyles({ status: lecture.playStatus }))}>
            {getStatusLabel(lecture.playStatus)}
          </p>
        )}

        <p className="body2">{Math.floor(lecture.runtime / 60)}분</p>
      </div>
    </li>
  );
}
