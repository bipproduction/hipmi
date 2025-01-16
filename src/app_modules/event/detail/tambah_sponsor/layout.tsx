'use client';
import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from '@/app_modules/_global/ui';
import React from 'react';

function LayoutEvent_TambahSponsor({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Tambah Sponsor"/>}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}

export default LayoutEvent_TambahSponsor;
