export enum BoardCategory {
  QUESTION = 'QUESTION',
  WORRY = 'WORRY',
}

export enum BoardCriteria {
  CREATE_AT = 'CREATED_AT',
  COMMENT_CNT = 'COMMENT_CNT',
}

export type Board = {
  boardId: number;
  title: string;
  body: string;
  date: string;
  boardCategory: BoardCategory;
  courseTitle?: string;
  lectureTitle?: string;
  commentCount: number;
};

export type Comment = {
  commentId: number;
  nickname: string;
  content: string;
  date: string;
  isMine: boolean;
};
