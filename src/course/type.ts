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
