import { BoardCategory } from './../board/BoardItem';
export const PATH = {
  HOME: '/',
  COURSES: '/courses',
  COMMUNITY: (boardCategory: BoardCategory) => `/community/${boardCategory}`,
  MYPAGE: '/mypage',
} as const;
