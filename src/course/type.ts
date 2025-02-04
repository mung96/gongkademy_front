export type Course = {
  courseId: number;
  title: string;
  thumbnail: string;
};

export enum RegisterStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
