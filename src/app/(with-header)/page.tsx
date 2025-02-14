import ChevronRightIcon from '/public/assets/svg/ChevronRightIcon.svg';
import HomeCourseListOrLogin from '@/course/HomeCourseListOrLogin';
import Link from 'next/link';
import { PATH } from '@/constants/path';
import BoardItem from '@/board/BoardItem';
import { BoardCategory, BoardCriteria } from '@/board/type';
import { getBoardListResponse } from '@/board/api';

async function getHomeBoardList() {
  const data = await getBoardListResponse(BoardCategory.WORRY, 1, BoardCriteria.CREATE_AT);

  if (data.boardList?.length > 4) {
    return data.boardList.slice(0, 4);
  }
  return data.boardList;
}
export default async function Home() {
  const boardList = await getHomeBoardList();
  return (
    <div className="flex flex-col items-center  pb-[72px] pt-9 tablet:pt-12 desktop:pt-16">
      <main className="flex w-full min-w-[343px] flex-col items-center gap-9  px-4 tablet:min-w-[720px] tablet:max-w-[720px] tablet:justify-center tablet:gap-12 tablet:px-6 desktop:min-w-[1024px] desktop:max-w-[1024px] desktop:gap-16">
        <h1 className="flex flex-col items-center tablet:flex-row">
          <span className="title1 text-neutral-gray-950">공학의 장벽을 낮추는 곳,</span>
          <span className="title1 text-primary-500">공카데미</span>
        </h1>
        <div className="flex w-full flex-col gap-2 ">
          <div className="flex items-center justify-start gap-2 ">
            <p className="subtitle2 text-neutral-gray-950">질문과 고민</p>
            <ChevronRightIcon />
          </div>
          <section className="w-full">
            <ul className="flex w-full flex-col items-center gap-4 desktop:grid desktop:grid-cols-2">
              {boardList?.map((board) => (
                <Link
                  className="w-full"
                  href={PATH.COMMUNITY_DETAIL(BoardCategory.WORRY, Number(board.boardId))}
                  key={board.boardId}
                >
                  <BoardItem board={board} />
                </Link>
              ))}
            </ul>
          </section>
        </div>
        <div className="flex w-full flex-col gap-4 ">
          <div className="flex items-center justify-start gap-2 ">
            <p className="subtitle2 text-neutral-gray-950">수강 중인 강좌</p>
            <ChevronRightIcon />
          </div>
          <HomeCourseListOrLogin />
        </div>
      </main>
    </div>
  );
}
