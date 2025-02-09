import XIcon from '/public/assets/svg/XIcon.svg';
import PlayCurriculumList from '@/course/PlayCurriculumList';

type Props = {
  courseId: number;
  lectureId: number;
  onClose: () => void;
  courseTime?: number | undefined;
};

export default function PlayerSidebar({ onClose, courseId, lectureId }: Props) {
  // const widthPercent = 27;

  return (
    <aside className="absolute left-0 top-0 z-50 flex h-full w-[376px] max-w-[376px] flex-col gap-4 bg-neutral-gray-0 p-4 ">
      <button className="flex justify-end" onClick={onClose}>
        <XIcon />
      </button>
      <div className="flex flex-col gap-2 rounded-lg bg-neutral-gray-50 px-4 pb-4 pt-3">
        <p className="subtitle2 text-neutral-gray-950">수강 목차</p>
      </div>
      {/* <div className="flex flex-col gap-2 px-4 pt-3 pb-4 rounded-lg bg-neutral-gray-50">
        <p className="subtitle2 text-neutral-gray-950">수강률</p>
        <p className="body2 text-neutral-gray-700">
          (
          {courseTime !== undefined
            ? `${Math.floor(courseTime / 3600)}시간 ${Math.floor((courseTime % 3600) / 60)}분`
            : '00시간 00분'}
          )
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-4 rounded-lg bg-neutral-gray-200">
            <div style={{ width: `${widthPercent}%` }} className="h-4 rounded-lg bg-primary-400" />
          </div>
          <p className="body2 text-primary-500">{widthPercent}%</p>
        </div>
      </div> */}
      <div className="flex flex-col overflow-scroll ">
        <PlayCurriculumList courseId={courseId} lectureId={lectureId} />
      </div>
    </aside>
  );
}
