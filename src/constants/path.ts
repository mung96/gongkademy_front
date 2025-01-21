import { BoardCategory } from './../board/BoardItem';
export const PATH = {
  HOME: '/',
  COURSES: '/courses',
  COURSE: (courseId: string) => `/courses/${courseId}`,
  COMMUNITY: (boardCategory: BoardCategory) => `/community/${boardCategory}`,
  MYPAGE: '/mypage',
} as const;
