import { DefaultSession, NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { isAxiosError } from 'axios';
import { HTTP_STATUS } from '@/constants/api';
import { apiServerRequester } from '@/api/serverRequest';
import { JWT_SECRET_KEY } from '@/constants/key';

type CheckSessionResponse = {
  memberId: number;
  isLogin: boolean;
};

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Spring Boot Session',
      credentials: {},
      async authorize() {
        try {
          const response = await apiServerRequester.get<CheckSessionResponse>('/auth/session/check', {
            withCredentials: true,
          });

          // 응답 데이터가 있을 경우 사용자 정보 반환
          if (response.data) {
            return { id: response.data.memberId.toString(), isLogin: response.data.isLogin };
          }
          return null;
        } catch (error) {
          if (isAxiosError(error)) {
            if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
              // TODO: 실패처리 (예: 에러 메시지 출력 등)
            }
          }
          return null;
        }
      },
    }),
  ],
  // JWT 기반 세션 관리
  session: {
    maxAge: 30 * 60, // 30분
    updateAge: 60 * 5, // 5분
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as DefaultSession['user'] & { isLogin: boolean };
      return session;
    },
  },
  // 쿠키 설정 추가 (배포 환경에서 cross-site 요청 지원)
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'none', // cross-site 상황에서 필요
        secure: true, // production에서는 HTTPS가 필수
        path: '/',
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      },
    },
  },
  secret: JWT_SECRET_KEY,
};
