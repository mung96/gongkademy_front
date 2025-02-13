import { DefaultSession, NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { isAxiosError } from 'axios';
import { HTTP_STATUS } from '@/constants/api';
import { apiServerRequester } from '@/api/serverRequest';
import { JWT_SECRET_KEY, NODE_ENV } from '@/constants/key';

type CheckSessionResponse = {
  memberId: number;
  isLogin: boolean;
};

const isProduction = NODE_ENV === 'production';

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
          if (response.data) {
            return { id: response.data.memberId.toString(), isLogin: response.data.isLogin };
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
      },
    }),
  ],
  session: {
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
  cookies: {
    sessionToken: {
      name: isProduction ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        secure: isProduction,
        path: '/',
        // 필요한 경우 domain도 명시
        // domain: 'your-domain.com',
      },
    },
    callbackUrl: {
      name: isProduction ? '__Secure-next-auth.callback-url' : 'next-auth.callback-url',
      options: {
        sameSite: 'none',
        secure: isProduction,
        path: '/',
      },
    },
  },
  secret: JWT_SECRET_KEY,
};
