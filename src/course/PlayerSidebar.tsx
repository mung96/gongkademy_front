import { PATH } from '@/constants/path';
import CurriculumItem, { PlayStatus } from '@/course/CurriculumItem';
import XIcon from '@/app/assets/svg/XIcon.svg';
import Link from 'next/link';

type Props = {
  onClose: () => void;
};

export default function PlayerSidebar({ onClose }: Props) {
  const widthPercent = 27;
  return (
    <aside className="absolute top-0 z-50 flex h-full max-w-[376px] flex-col gap-4 bg-neutral-gray-0 p-4">
      <button className="flex justify-end" onClick={onClose}>
        <XIcon />
      </button>
      <div className="flex flex-col gap-2 rounded-lg bg-neutral-gray-50 px-4 pb-4 pt-3">
        <p className="subtitle2 text-neutral-gray-950">수강률</p>
        <p className="body2 text-neutral-gray-700">
          ({'00시간 mm분'}/{'00시간 mm분'})
        </p>
        <div className="flex items-center gap-2">
          <div className="h-4 flex-1 rounded-lg bg-neutral-gray-200">
            <div style={{ width: `${widthPercent}%` }} className="h-4 rounded-lg bg-primary-400" />
          </div>
          <p className="body2 text-primary-500">{widthPercent}%</p>
        </div>
      </div>
      <ul className="flex flex-col overflow-scroll">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14].map((item) => (
          <Link href={PATH.LECTURE(item.toString())} key={item}>
            <CurriculumItem title={'강의제목'} runTime={0} status={PlayStatus.COMPLETED} />
          </Link>
        ))}
      </ul>
    </aside>
  );
}
