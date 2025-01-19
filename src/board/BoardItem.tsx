export enum BoardCategory {
  QUESTION = 'QUESTION',
  WORRY = 'WORRY',
}

type Props = {
  title: string;
  content: string;
  date: string;
  category: BoardCategory;
  courseTitle?: string;
  lectureTitle?: string;
  commentCount: number;
};

export default function BoardItem({ title, content, date, category, courseTitle, lectureTitle, commentCount }: Props) {
  return (
    <li className="flex flex-col gap-2 px-4 py-4 rounded-lg tablet:px-6 bg-neutral-gray-0 hover:bg-neutral-gray-50 min-w-[340px]">
      {category === BoardCategory.QUESTION && (
        <div className="flex items-center gap-2 tablet:hidden">
          <p className="text-neutral-gray-400 body2">{courseTitle}</p>
          <p className="text-neutral-gray-400 body2">{lectureTitle}</p>
        </div>
      )}

      <p className="text-neutral-gray-950 subtitle2 tablet:subtitle3">{title}</p>
      <p className="text-neutral-gray-800 body1">{content}</p>
      <div className="flex justify-between mt-1">
        <div className="flex gap-3">
          {category === BoardCategory.QUESTION && (
            <div className="flex items-center gap-2 max-tablet:hidden">
              <p className="text-neutral-gray-400 body2">{courseTitle}</p>
              <p className="text-neutral-gray-400 body2">{lectureTitle}</p>
            </div>
          )}
          <p className="text-neutral-gray-400 body2">{date}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-neutral-gray-400 body2">댓글수</p>
          <p className="text-neutral-gray-700 body2">{commentCount}</p>
        </div>
      </div>
    </li>
  );
}
