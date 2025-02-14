import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import { validateServerSession } from '@/auth/serverApi';

/*  middleware에서는 토큰만 접근되나? session은 접근을 못함?? */
export async function middleware(req: NextRequest) {
  const isLogin = await validateServerSession();
  const { pathname, search } = new URL(req.url);
  const fullPath = pathname + search; // 도메인 없이 pathname과 querystring 결합

  if (!isLogin) {
    return NextResponse.redirect(SERVER_BASE_URL + END_POINT.NAVER_LOGIN(fullPath));
  }

  // 인증된 사용자는 그대로 요청을 진행합니다.
  return NextResponse.next();
}

// 미들웨어가 적용될 경로를 지정
export const config = {
  matcher: ['/lecture/:id*', '/community/write', '/mypage/:path*'],
};
