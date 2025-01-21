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
    <li className="flex min-w-[340px] flex-col gap-2 rounded-lg bg-neutral-gray-0 p-4 hover:bg-neutral-gray-50 tablet:px-6">
      {category === BoardCategory.QUESTION && (
        <div className="flex items-center gap-2 tablet:hidden">
          <p className="body2 text-neutral-gray-400">{courseTitle}</p>
          <p className="body2 text-neutral-gray-400">{lectureTitle}</p>
        </div>
      )}

      <p className="subtitle2 tablet:subtitle3 text-neutral-gray-950">{title}</p>
      <p className="body1 text-neutral-gray-800">{content}</p>
      <div className="mt-1 flex justify-between">
        <div className="flex gap-3">
          {category === BoardCategory.QUESTION && (
            <div className="flex items-center gap-2 max-tablet:hidden">
              <p className="body2 text-neutral-gray-400">{courseTitle}</p>
              <p className="body2 text-neutral-gray-400">{lectureTitle}</p>
            </div>
          )}
          <p className="body2 text-neutral-gray-400">{date}</p>
        </div>
        <div className="flex gap-2">
          <p className="body2 text-neutral-gray-400">댓글수</p>
          <p className="body2 text-neutral-gray-700">{commentCount}</p>
        </div>
      </div>
    </li>
  );
}
