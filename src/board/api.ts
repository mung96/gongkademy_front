import { apiServerRequester } from '@/api/serverRequest';
import { Board, BoardCategory, BoardCriteria } from '@/board/type';

export type GetBoardListResponse = {
  totalPage: number;
  boardList: Board[];
};

export async function getBoardList(
  boardCategory: BoardCategory,
  page: number = 1,
  criteria: BoardCriteria = BoardCriteria.CREATE_AT,
) {
  try {
    const response = await apiServerRequester.get<GetBoardListResponse>(
      `/boards?category=${boardCategory}&page=${page}&&criteria=${criteria}`,
    );
    return response.data.boardList;
  } catch (e) {
    console.log(e);
  }
  return [];
}
