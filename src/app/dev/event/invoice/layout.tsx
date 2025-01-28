import Event_LayoutInvoice from '@/app_modules/event/detail/invoice/layout';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Event_LayoutInvoice>
        {children}
      </Event_LayoutInvoice>
    </>
  );
}

export default Layout;
