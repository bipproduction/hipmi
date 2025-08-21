import { funGetUserIdByToken } from '@/app_modules/_global/fun/get';
import Event_Invoice from '@/app_modules/event/detail/invoice';
import React from 'react';

async function Page() {
  // const userLoginId = await funGetUserIdByToken();
  return (
    <>
      <Event_Invoice userLoginId={""} />
    </>
  );
}

export default Page;
