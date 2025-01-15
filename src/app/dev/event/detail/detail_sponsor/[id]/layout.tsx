import LayoutEvent_DetailSponsor from '@/app_modules/event/detail/detail_sponsor/layout';
import React from 'react';

function Layout({children} : {children: React.ReactNode}) {
  return (
    <>
      <LayoutEvent_DetailSponsor>{children}</LayoutEvent_DetailSponsor>
    </>
  );
}

export default Layout;
