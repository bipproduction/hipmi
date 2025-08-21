import Event_LayoutNominalSponsor from '@/app_modules/event/detail/sponsor/nominal_sponsor/layout';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Event_LayoutNominalSponsor>{children}</Event_LayoutNominalSponsor>
    </>
  );
}

export default Layout;
