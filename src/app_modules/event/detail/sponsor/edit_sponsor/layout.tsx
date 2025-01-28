import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from '@/app_modules/_global/ui';
import React from 'react';

function Event_LayoutEditSponsor({children} : {children: React.ReactNode}) {
  return (
    <>
      <UIGlobal_LayoutTamplate header={<UIGlobal_LayoutHeaderTamplate title="Edit Sponsor"/>}>
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}

export default Event_LayoutEditSponsor;
