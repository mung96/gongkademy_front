import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import { getToken } from 'next-auth/jwt';
import { JWT_SECRET_KEY } from '@/constants/key';

/*  middleware에서는 토큰만 접근되나? session은 접근을 못함?? */
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: JWT_SECRET_KEY });

  // token이 없으면 인증되지 않은 사용자이므로, 로그인 페이지로 리다이렉트합니다.
  //TODO: 원래 가려던 페이지로 리다이렉트 해줘야함.
  if (!token) {
    console.log('로그인 url ', req.url);
    const loginUrl = new URL(SERVER_BASE_URL + END_POINT.NAVER_LOGIN, req.url);
    // 로그인 후 다시 원래 페이지로 돌아오도록 callbackUrl을 지정할 수 있습니다.
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 인증된 사용자는 그대로 요청을 진행합니다.
  return NextResponse.next();
}

// 미들웨어가 적용될 경로를 지정합니다.
export const config = {
  matcher: ['/lecture/:id*', '/community/write', '/mypage/:path*'],
};
