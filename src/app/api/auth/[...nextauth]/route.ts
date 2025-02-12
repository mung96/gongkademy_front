import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
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
          // Next.js App Router에서는 req 타입을 NextRequest로 캐스팅하여 cookie를 가져옵니다.
          const response = await apiServerRequester.get<CheckSessionResponse>(`/auth/session/check`, {
            withCredentials: true,
          });

          // Spring Boot API가 { valid: true, user: { ... } } 형태로 응답한다고 가정합니다.
          if (response.data) {
            return { id: response.data.memberId.toString(), isLogin: response.data.isLogin };
          }
          return null;
        } catch (error) {
          if (isAxiosError(error)) {
            if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
              //TODO: 실패처리
            }
          }
          return null;
        }
      },
    }),
  ],
  // JWT 기반 세션 관리
  session: {
    //TODO: 이거 다시 봐야함
    maxAge: 30 * 60,
    updateAge: 60 * 5,
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
  secret: JWT_SECRET_KEY,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
