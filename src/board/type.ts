export enum BoardCategory {
  QUESTION = 'QUESTION',
  WORRY = 'WORRY',
}

export type Board = {
  boardId: number;
  title: string;
  body: string;
  date: string;
  category: BoardCategory;
  courseTitle?: string;
  lectureTitle?: string;
  commentCount: number;
};
