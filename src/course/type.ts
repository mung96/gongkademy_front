export type CourseItem = {
  courseId: number;
  title: string;
  thumbnail: string;
};

export enum RegisterStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export type GetCourseListResponse = {
  courseList: CourseItem[];
};
export type LectureItem = {
  lectureId: number;
  title: string;
  runtime: number;
  playStatus: PlayStatus;
};
export enum PlayStatus {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_PLAY = 'NOT_PLAY',
}
