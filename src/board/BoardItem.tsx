import { Board, BoardCategory } from '@/board/type';
import { getFormatDate } from '@/utils';

type Props = {
  board: Board;
};

export default function BoardItem({ board }: Props) {
  return (
    <li className="flex min-w-[340px] flex-col gap-2 rounded-lg bg-neutral-gray-0 p-4 hover:bg-neutral-gray-50 tablet:px-6">
      {board.category === BoardCategory.QUESTION && (
        <div className="flex items-center gap-2 tablet:hidden">
          <p className="body2 text-neutral-gray-400">{board.courseTitle}</p>
          <p className="body2 text-neutral-gray-400">{board.lectureTitle}</p>
        </div>
      )}

      <p className="subtitle2 tablet:subtitle3 truncate text-neutral-gray-950">{board.title}</p>
      <p className="body1 truncate text-neutral-gray-800">{board.body}</p>
      <div className="mt-1 flex justify-between">
        <div className="flex gap-3">
          {board.category === BoardCategory.QUESTION && (
            <div className="flex items-center gap-2 max-tablet:hidden">
              <p className="body2 text-neutral-gray-400">{board.courseTitle}</p>
              <p className="body2 text-neutral-gray-400">{board.lectureTitle}</p>
            </div>
          )}
          <p className="body2 text-neutral-gray-400">{getFormatDate(board.date)}</p>
        </div>
        <div className="flex gap-2">
          <p className="body2 text-neutral-gray-400">댓글수</p>
          <p className="body2 text-neutral-gray-700">{board.commentCount}</p>
        </div>
      </div>
    </li>
  );
}
