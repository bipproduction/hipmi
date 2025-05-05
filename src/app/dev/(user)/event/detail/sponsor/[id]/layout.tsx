import { LayoutEvent_Sponsor } from '@/app_modules/event';
import React from 'react';

function Layout({ children, }: {children: React.ReactNode}) {
  return (
    <>
      <LayoutEvent_Sponsor >
        {children}
      </LayoutEvent_Sponsor>
    </>
  );
}

export default Layout;
