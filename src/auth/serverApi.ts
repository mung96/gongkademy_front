import { apiServerRequester } from '@/api/serverRequest';
import { CheckSessionResponse } from '@/auth/type';
import { END_POINT, HTTP_STATUS } from '@/constants/api';
import { isAxiosError } from 'axios';

export async function validateServerSession(onSuccess?: () => void, onFail?: () => void) {
  try {
    const response = await apiServerRequester.get<CheckSessionResponse>(END_POINT.SESSION_CHECK);
    if (onSuccess) {
      onSuccess();
    }
    return response?.data.isLogin;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        if (onFail) {
          onFail();
        }
        return false;
      }
    }
  }
}
