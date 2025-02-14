import { apiServerRequester } from '@/api/serverRequest';
import { CheckSessionResponse } from '@/auth/type';
import { END_POINT, HTTP_STATUS } from '@/constants/api';
import { isAxiosError } from 'axios';

export async function validateServerSession() {
  try {
    const response = await apiServerRequester.get<CheckSessionResponse>(END_POINT.SESSION_CHECK, {
      withCredentials: true,
    });
    if (response.data) {
      return { isLogin: response.data.isLogin };
    }
    return null;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        // TODO: 실패처리
      }
    }
    return null;
  }
}
