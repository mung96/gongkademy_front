import { apiServerRequester } from '@/api/serverRequest';
import { BoardCategory, Comment } from '@/board/type';
import Combobox from '@/components/Combobox';
import { getFormatDate } from '@/utils';

type GetBoardDetailResponse = {
  boardId: number;
  title: string;
  body: string;
  date: string;
  nickname: string;
  courseTitle: string;
  lectureTitle: string;
  commentList: Comment[];
};

export default async function Page({ params }: { params: { boardCategory: BoardCategory; boardId: number } }) {
  const { boardCategory, boardId } = params;

  async function getBoardDetail() {
    try {
      const response = await apiServerRequester.get<GetBoardDetailResponse>(`/boards/${boardId}`);

      return response.data;
    } catch (e) {
      console.log(e);
    }
    return {
      boardId: 0,
      title: '',
      body: '',
      date: new Date().toString(),
      nickname: '',
      courseTitle: '',
      lectureTitle: '',
      commentList: [],
    };
  }

  const boardDetail = await getBoardDetail();
  console.log('boardDetail', boardDetail);

  return (
    <main className={'flex flex-col items-center px-4 pb-[72px] pt-9 tablet:px-6  tablet:pt-12 desktop:pt-16'}>
      <div className={'flex  flex-col items-center  gap-7    p-6 tablet:max-w-[720px] desktop:max-w-[816px]'}>
        <div
          className={
            'flex flex-col gap-4 rounded-lg   bg-neutral-gray-50 p-6 tablet:max-w-[720px] desktop:max-w-[816px]'
          }
        >
          <div className="flex justify-between">
            <h1 className={'subtitle1 text-neutral-gray-950'}>{boardDetail.title}</h1>
            {/* <div className="flex w-full gap-[14px] border">
              <Combobox placeholder={'더보기'} items={[]} />
            </div> */}
          </div>
          <div className={'flex justify-between'}>
            <p className={'body2 text-neutral-gray-500'}>{boardDetail.nickname}</p>
            <p className={'body2 text-neutral-gray-500'}>{getFormatDate(boardDetail.date)}</p>
          </div>

          <p className={'body1 text-neutral-gray-950'}>{boardDetail.body}</p>
        </div>

        <ul className={'flex w-full flex-col gap-4'}>
          {boardDetail.commentList.map((comment) => (
            <li
              className={'flex flex-col gap-3 rounded-lg bg-neutral-gray-50 px-6 pb-4 pt-[22px]'}
              key={comment.commentId}
            >
              <div className={'flex justify-between'}>
                <p className={'body2 text-neutral-gray-500'}>{comment.nickname}</p>
                <p className={'body2 text-neutral-gray-500'}>{getFormatDate(comment.date)}</p>
              </div>
              <p className={'body1 text-neutral-gray-950'}>{comment.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
