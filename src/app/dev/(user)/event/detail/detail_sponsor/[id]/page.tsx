import { funGetUserIdByToken } from '@/app_modules/_global/fun/get';
import DetailSponsor_Event from '@/app_modules/event/detail/detail_sponsor';
import React from 'react';

async function Page() {
  // const userLoginId = await funGetUserIdByToken();
  return (
    <>
      <DetailSponsor_Event userLoginId={""} />
    </>
  );
}

export default Page;
