'use client';

import ChevronRightIcon from '@/app/assets/svg/ChevronRightIcon.svg';
import BoardItem, { BoardCategory } from '@/board/BoardItem';
import Link from 'next/link';
import { boardList } from '@/app/(with-header)/courses/[courseId]/page';
import { PATH } from '@/constants/path';
import CourseCard from '@/course/CourseCard';
import { Course } from '@/course/type';
import Button from '@/components/Button';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
const courseList: Course[] = [
  {
    id: '1',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '2',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '3',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '4',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '5',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '6',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '7',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '8',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '9',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '10',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '11',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
  {
    id: '12',
    title: '강좌명',
    thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
  },
];
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
            <ul className="flex w-full flex-col items-center gap-4 desktop:grid desktop:grid-cols-2">
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
            </ul>
          </section>
        </div>
        <div className="flex w-full flex-col gap-4 ">
          <div className="flex items-center justify-start gap-2 ">
            <p className="subtitle2 text-neutral-gray-950">수강 중인 강좌</p>
            <ChevronRightIcon />
          </div>
          <section className="flex items-center justify-center ">
            {/* <ul className="flex flex-col gap-6 tablet:max-w-screen-tablet desktop:max-w-screen-desktop">
              {courseList.map((course) => (
                <Link href={PATH.COURSE(course.id) + `?tab=curriculum`} key={course.id}>
                  <CourseCard key={course.id} course={course} />
                </Link>
              ))}
            </ul> */}

            <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-gray-300 bg-neutral-gray-50">
              <p className="body1 text-neutral-gray-950">로그인 후에 강의를 수강할 수 있어요</p>
              <Link href={SERVER_BASE_URL + END_POINT.NAVER_LOGIN}>
                <Button onClick={() => console.log('로그인')}>3초 만에 로그인</Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
