export type CourseItem = {
  courseId: number;
  title: string;
  thumbnail: string;
};

export enum RegisterStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum PlayStatus {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_PLAY = 'NOT_PLAY',
}

export type GetCourseListResponse = {
  courseList: CourseItem[];
};

export type LectureItem = {
  lectureId: number;
  lectureOrder: number;
  title: string;
  runtime: number;
  playStatus: PlayStatus;
};

export type LectureItemDto = {
  lectureId: number;
  title: string;
  runtime: number;
  isComplete: boolean;
};

export type GetLectureListResponse = {
  isRegister: boolean;
  lectureList: LectureItemDto[];
};
