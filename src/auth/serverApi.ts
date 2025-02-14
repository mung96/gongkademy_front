import { apiServerRequester } from '@/api/serverRequest';
import { CheckSessionResponse } from '@/auth/type';
import { END_POINT, HTTP_STATUS } from '@/constants/api';
import { isAxiosError } from 'axios';

export async function validateServerSession() {
  try {
    const response = await apiServerRequester.get<CheckSessionResponse>(END_POINT.SESSION_CHECK);
    console.log('응답이다.', response);
    return response?.data.isLogin;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        console.log('에러 응답이다.', error.response);
        console.log('세션이 없음');
        return false;
      }
    }
  }
}
