import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      // 기존 DefaultSession["user"]의 속성을 그대로 포함하면서 추가
      isLogin: boolean;
    } & DefaultSession['user'];
  }
}
