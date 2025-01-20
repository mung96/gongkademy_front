import { exhaustiveCheck } from '@/utils/typeGuard';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export enum PlayStatus {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_STARTED = 'NOT_STARTED',
}

const statusStyles = cva(``, {
  variants: {
    status: {
      [PlayStatus.COMPLETED]: 'text-primary-500',
      [PlayStatus.IN_PROGRESS]: 'text-neutral-gray-950',
      [PlayStatus.NOT_STARTED]: 'text-secondary-500',
    },
  },
});

const getStatusLabel = (status: PlayStatus) => {
  if (status == PlayStatus.NOT_STARTED) {
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
  title: string;
  runTime: number;
  status: PlayStatus;
};

export default function CurriculumItem({ title, runTime, status }: Props) {
  return (
    <li className="flex items-center justify-between h-[58px] px-4 rounded-lg min-w-[500px]">
      <p className="text-neutral-gray-950 subtitle2 tablet:subtitle3">{title}</p>
      <div className="flex items-center gap-4">
        <p className={twMerge('body1', statusStyles({ status }))}>{getStatusLabel(status)}</p>
        <p className="body2">{runTime}분</p>
      </div>
    </li>
  );
}
