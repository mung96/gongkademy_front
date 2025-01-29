import { BoardCategory } from './../board/BoardItem';

export const PATH = {
  HOME: '/',
  COURSES: '/courses',
  COURSE: (courseId: string) => `/courses/${courseId}`,
  LECTURE: (lectureId: string) => `/lecture/${lectureId}`,

  COMMUNITY: (boardCategory: BoardCategory) => `/community/${boardCategory}`,
  COMMUNITY_DETAIL: (boardCategory: BoardCategory, boardId: number) => `/community/${boardCategory}/${boardId}`,
  COMMUNITY_WRITE: (boardCategory: BoardCategory) => `/community/write?category=${boardCategory}`,
  MYPAGE: '/mypage',
} as const;
