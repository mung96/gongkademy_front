import { apiServerRequester } from '@/api/serverRequest';
import BoardMoreButton from '@/board/BoardMoreButton';
import CommentInput from '@/board/CommentInput';
import CommentMoreButton from '@/board/CommentMoreButton';
import { BoardCategory, Comment } from '@/board/type';
import { HTTP_STATUS } from '@/constants/api';
import { getFormatDate } from '@/utils';
import { isAxiosError } from 'axios';
import { notFound } from 'next/navigation';

type GetBoardDetailResponse = {
  boardId: number;
  title: string;
  body: string;
  date: string;
  nickname: string;
  courseTitle: string;
  lectureTitle: string;
  boardCategory: BoardCategory;
  isMine: boolean;
  commentList: Comment[];
};

export default async function Page({ params }: { params: { boardCategory: BoardCategory; boardId: number } }) {
  const { boardCategory, boardId } = params;

  async function getBoardDetail() {
    try {
      const response = await apiServerRequester.get<GetBoardDetailResponse>(`/boards/${boardId}`);
      console.log('게시글 응답', response.data);

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === HTTP_STATUS.NOT_FOUND) {
          notFound();
        } else {
          console.log('에러: ' + error);
        }
      }
    }
    return {
      boardId: 0,
      title: '',
      body: '',
      date: new Date().toString(),
      nickname: '',
      courseTitle: '',
      lectureTitle: '',
      isMine: false,
      commentList: [],
      boardCategory: boardCategory,
    };
  }

  const boardDetail = await getBoardDetail();
  if (boardDetail.boardCategory !== boardCategory) {
    notFound();
  }

  return (
    <main className={'flex w-lvw flex-col items-center px-4 pb-[72px] pt-9 tablet:px-6  tablet:pt-12 desktop:pt-16'}>
      <div className={'flex w-full flex-col  items-center gap-7   p-6 tablet:max-w-[720px] desktop:max-w-[816px]'}>
        <div
          className={'flex w-full  flex-col gap-4 rounded-lg bg-neutral-gray-50 p-6 tablet:w-[720px] desktop:w-[816px]'}
        >
          <div className="flex w-full justify-between">
            <h1 className={'subtitle1  break-all text-neutral-gray-950'}>{boardDetail.title}</h1>
            {boardDetail.isMine && <BoardMoreButton boardId={boardDetail.boardId} boardCategory={boardCategory} />}
          </div>
          <div className={'flex justify-between'}>
            <p className={'body2 text-neutral-gray-500'}>{boardDetail.nickname}</p>
            <p className={'body2 text-neutral-gray-500'}>{getFormatDate(boardDetail.date)}</p>
          </div>

          <p className={'body1 break-words text-neutral-gray-950'}>{boardDetail.body}</p>

          {boardDetail.boardCategory === BoardCategory.QUESTION && (
            <div className="flex gap-2">
              <p className="body1 w-fit rounded-lg bg-neutral-gray-200 px-2 py-1 text-neutral-gray-950">
                {boardDetail.courseTitle}
              </p>
              <p className="body1 w-fit rounded-lg bg-neutral-gray-200 px-2 py-1 text-neutral-gray-950">
                {boardDetail.lectureTitle}
              </p>
            </div>
          )}
        </div>
        <CommentInput boardId={boardId} />
        <ul className={'flex w-full flex-col gap-2 tablet:w-[720px]  desktop:w-[816px]'}>
          {boardDetail.commentList.map((comment) => (
            <li
              className={'flex flex-col gap-3 rounded-lg bg-neutral-gray-50 px-6 pb-4 pt-[22px] '}
              key={comment.commentId}
            >
              <div className={'flex justify-between'}>
                <p className={'body2 text-neutral-gray-500'}>{comment.nickname}</p>
                <p className={'body2 text-neutral-gray-500'}>{getFormatDate(comment.date)}</p>
              </div>
              <p className={'body1 text-neutral-gray-950'}>{comment.content}</p>
              {comment.isMine && (
                <div className="flex justify-end">
                  <CommentMoreButton commentId={comment.commentId} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
