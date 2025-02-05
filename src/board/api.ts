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
) {
  try {
    const response = await apiRequester.get<GetBoardListResponse>(
      `/boards?category=${boardCategory}&page=${page}&&criteria=${criteria}`,
    );

    return response.data;
  } catch (e) {
    console.log(e);
  }
  return { boardList: [], totalPage: 0 };
}
