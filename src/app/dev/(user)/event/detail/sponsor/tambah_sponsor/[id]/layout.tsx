import LayoutEvent_TambahSponsor from '@/app_modules/event/detail/tambah_sponsor/layout';
import React from 'react';

function Layout({children}: {children: React.ReactNode}) {
  return (
    <LayoutEvent_TambahSponsor>
      {children}
    </LayoutEvent_TambahSponsor>
  );
}

export default Layout;
