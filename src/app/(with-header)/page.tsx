// 'use client';
import ChevronRightIcon from '@/app/assets/svg/ChevronRightIcon.svg';
import HomeCourseList from '@/course/HomeCourseList';
import HomeCourseListOrLogin from '@/course/HomeCourseListOrLogin';

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-[72px] pt-9 tablet:pt-12 desktop:pt-16">
      <main className="flex w-full flex-col items-center gap-9 px-4 tablet:max-w-[720px] tablet:justify-center tablet:gap-12 tablet:px-6 desktop:max-w-[1024px] desktop:gap-16">
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
            {/* <ul className="flex flex-col items-center w-full gap-4 desktop:grid desktop:grid-cols-2">
              {boardList.map((board) => (
                <Link
                  className="w-full"
                  href={PATH.COMMUNITY_DETAIL(BoardCategory.QUESTION, Number(board.id))}
                  key={board.id}
                >
                  <BoardItem
                    title={board.title}
                    content={board.content}
                    date={board.date}
                    category={board.category}
                    commentCount={board.commentCount}
                    courseTitle={board.courseTitle}
                    lectureTitle={board.lectureTitle}
                  />
                </Link>
              ))}
            </ul> */}
          </section>
        </div>
        <div className="flex w-full flex-col gap-4 ">
          <div className="flex items-center justify-start gap-2 ">
            <p className="subtitle2 text-neutral-gray-950">수강 중인 강좌</p>
            <ChevronRightIcon />
          </div>
          <HomeCourseListOrLogin>
            <HomeCourseList />
          </HomeCourseListOrLogin>
        </div>
      </main>
    </div>
  );
}
