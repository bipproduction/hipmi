import Event_LayoutEditSponsor from '@/app_modules/event/detail/sponsor/edit_sponsor/layout';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Event_LayoutEditSponsor>
        {children}
      </Event_LayoutEditSponsor>
    </>
  );
}

export default Layout;
