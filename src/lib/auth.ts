import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Spring Boot Session',
      credentials: {},
      async authorize() {
        const response = await fetch(SERVER_BASE_URL + END_POINT.SESSION, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // 쿠키 포함
        });

        if (!response.ok) return null;

        const data = await response.json();
        console.log('Spring Boot 세션 확인 결과:', data);

        return {
          id: data.memberId,
          sessionId: data.sessionId, // Spring Boot 세션 ID 저장
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: { strategy: 'jwt' }, // JWT 대신 다른 방법이 필요하면 여기 변경
};
