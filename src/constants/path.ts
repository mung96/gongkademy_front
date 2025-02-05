import { RegisterStatus } from '@/course/type';
import { BoardCategory } from '@/board/type';
import { register } from 'module';

export const PATH = {
  HOME: '/',
  COURSES: '/courses',
  COURSE: (courseId: number, tab: 'curriculum' | 'question') => `/courses/${courseId}/${tab}`,
  LECTURE: (lectureId: number) => `/lecture/${lectureId}`,

  COMMUNITY: (boardCategory: BoardCategory) => `/community/${boardCategory}`,
  COMMUNITY_DETAIL: (boardCategory: BoardCategory, boardId: number) => `/community/${boardCategory}/${boardId}`,
  COMMUNITY_WRITE: (boardCategory: BoardCategory) => `/community/write?category=${boardCategory}`,

  MY_PROFILE: '/mypage/profile',
  MY_COMMUNITY: (boardCategory: BoardCategory) => `/mypage/community/${boardCategory}`,
  MY_COURSES: (registerStatus: RegisterStatus) => `/mypage/courses/${registerStatus}`,
} as const;
