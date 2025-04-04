import { apiRequester } from '@/api/requester';
import { Board, BoardCategory, BoardCriteria } from '@/board/type';

export type GetBoardListResponse = {
  totalPage: number;
  boardList: Board[];
};

export async function getBoardListResponse(
  boardCategory: BoardCategory,
  page: number = 1,
  criteria: BoardCriteria = BoardCriteria.CREATE_AT,
  onSuccess?: (response: GetBoardListResponse) => void,
  courseId?: number,
  lectureId?: number,
  keyword?: string,
) {
  const response = await apiRequester.get<GetBoardListResponse>(
    `/boards?category=${boardCategory}&page=${page}&criteria=${criteria}${courseId !== undefined ? '&course=' + courseId : ''}${lectureId !== undefined ? '&lecture=' + lectureId : ''}${keyword?.length ? '&keyword=' + keyword : ''}`,
  );
  if (onSuccess) {
    onSuccess(response.data);
  }
  return response.data;
}
