import { CourseItem, LectureItemDto } from '@/course/type';

export function getFormatDate(dateString: string): string {
  return dateString?.split('T')[0];
}

export function getCourseThumbnailPath(courseThumbnail: string) {
  return `/assets/thumbnail/${courseThumbnail}.webp`;
}

export const exhaustiveCheck = (status: never): never => {
  throw new Error(`분기 처리가 되지 않은 타입이 있습니다.: ${status}`);
};
export function getCourseLabelValue(courseItemDtoList: CourseItem[]) {
  return courseItemDtoList.map((courseItemDto) => ({
    label: courseItemDto.title,
    value: courseItemDto.courseId,
  }));
}
export function getLectureLabelValue(lectureItemDtoList: LectureItemDto[]) {
  const lectureList = lectureItemDtoList.map((lectureItemDto) => ({
    label: lectureItemDto.title,
    value: lectureItemDto.lectureId,
  }));
  lectureList.unshift({ label: '전체', value: 0 });
  return lectureList;
}
