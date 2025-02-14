import { apiRequester } from '@/api/requester';
import { CheckSessionResponse } from '@/auth/type';
import { END_POINT, HTTP_STATUS } from '@/constants/api';
import { isAxiosError } from 'axios';

export async function validateSession(onSuccess?: () => void) {
  try {
    const response = await apiRequester.get<CheckSessionResponse>(END_POINT.SESSION_CHECK, {
      withCredentials: true,
    });
    if (onSuccess) {
      onSuccess();
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        // TODO: 실패처리
      }
    }
    return null;
  }
}
