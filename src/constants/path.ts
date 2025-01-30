import { BoardCategory } from './../board/BoardItem';

export const PATH = {
  HOME: '/',
  COURSES: '/courses',
  COURSE: (courseId: string) => `/courses/${courseId}`,
  LECTURE: (lectureId: string) => `/lecture/${lectureId}`,

  COMMUNITY: (boardCategory: BoardCategory) => `/community/${boardCategory}`,
  COMMUNITY_DETAIL: (boardCategory: BoardCategory, boardId: number) => `/community/${boardCategory}/${boardId}`,
  COMMUNITY_WRITE: (boardCategory: BoardCategory) => `/community/write?category=${boardCategory}`,

  MY_PROFILE: '/mypage/profile',
  MY_COMMUNITY: '/mypage/community',
  MY_COURSES: '/mypage/courses',
} as const;
