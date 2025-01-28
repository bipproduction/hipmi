import { funGetUserIdByToken } from '@/app_modules/_global/fun/get';
import LayoutEvent_DetailSponsor from '@/app_modules/event/detail/detail_sponsor/layout';
import React from 'react';

async function Layout({children} : {children: React.ReactNode}) {
  const userLoginId = await funGetUserIdByToken()
  return (
    <>
      <LayoutEvent_DetailSponsor userLoginId={userLoginId}>
        {children}
      </LayoutEvent_DetailSponsor>
    </>
  );
}

export default Layout;
