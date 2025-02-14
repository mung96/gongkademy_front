'use client';

import { useEffect } from 'react';

/*
signOut()을 이용해서 뭔가 비동기 작업이 일어나고 쿠키 삭제가 안되는거 같음?
next-auth.session-token 이거를 날리는게 문제임. 이걸 제대로 날려야함
 */
export default function Page() {
  useEffect(() => {
    // signOut({ redirect: true, callbackUrl: PATH.HOME });
    // async function logout() {
    //   try {
    //     // NextAuth의 signOut()을 호출하여 세션 쿠키/토큰을 삭제합니다.
    //     // redirect: false 옵션을 사용하여 결과를 기다린 후, 수동으로 리다이렉트합니다.
    //     await signOut({ redirect: true, callbackUrl: PATH.HOME });
    //     // await signOut({ redirect: false });
    //     console.log('로그아웃 이후 세션: ', session);
    //     // signOut 호출 후 쿠키 제거에 약간의 딜레이가 있을 수 있으므로,
    //   } catch (error) {
    //     console.error('NextAuth 세션 삭제 에러:', error);
    //   }
    // }
    // logout();
  }, []);

  return <div>로그아웃 중입니다.</div>;
}
