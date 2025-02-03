import Event_LayoutMetodePembayaran from '@/app_modules/event/detail/sponsor/metode_pembayaran/layout';
import React from 'react';

function Layout({ children } : { children: React.ReactNode }) {
  return (
    <>
      <Event_LayoutMetodePembayaran>
        {children}
      </Event_LayoutMetodePembayaran>
    </>
  );
}

export default Layout;
