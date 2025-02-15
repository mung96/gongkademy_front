import { apiRequester } from '@/api/requester';
import { GetLectureListResponse, LectureItemDto } from '@/course/type';

export async function getLectureListResponse(
  courseId: number,
  onSuccess?: (lectureItemDtoList: LectureItemDto[]) => void,
) {
  const response = await apiRequester.get<GetLectureListResponse>(`/courses/${courseId}/lectures`);
  if (onSuccess) {
    onSuccess(response.data.lectureList);
  }
  return response.data;
}
