import { apiRequester } from '@/api/requester';
import { CheckSessionResponse } from '@/auth/type';
import { END_POINT, HTTP_STATUS } from '@/constants/api';
import { isAxiosError } from 'axios';

export async function validateSession(onSuccess?: () => void, onFail?: () => void) {
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
        // console.log('실패');
        if (onFail) {
          onFail();
        }
      }
    }
    return null;
  }
}
