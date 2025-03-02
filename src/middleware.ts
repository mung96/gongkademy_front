import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { END_POINT, HTTP_STATUS, SERVER_BASE_URL } from '@/constants/api';
import { isAxiosError } from 'axios';
import { apiServerRequester } from '@/api/serverRequest';
import { CheckSessionResponse } from '@/auth/type';
//다른 도메인에 대해서 항상 isLogin이 false로 나오는 문제가 있음

export async function middleware(req: NextRequest) {
  async function validateServerSession() {
    try {
      const cookieHeader = req.headers.get('cookie') || '';

      const response = await apiServerRequester.get<CheckSessionResponse>(END_POINT.SESSION_CHECK, {
        headers: {
          Cookie: cookieHeader, // 백엔드에 쿠키 전달
        },
      });
      return response?.data.isLogin;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
          return false;
        }
      }
    }
  }

  const isLogin = await validateServerSession();
  // const isLogin = true;
  const { pathname, search } = new URL(req.url);
  const fullPath = pathname + search; // 도메인 없이 pathname과 querystring 결합

  if (!isLogin) {
    return NextResponse.redirect(SERVER_BASE_URL + END_POINT.KAKAO_LOGIN(fullPath));
  }

  // 인증된 사용자는 그대로 요청을 진행합니다.
  return NextResponse.next();
}
// 미들웨어가 적용될 경로를 지정
export const config = {
  matcher: ['/lecture/:id*', '/community/write', '/mypage/:path*'],
};
