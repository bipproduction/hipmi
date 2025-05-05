import { LayoutEvent_Peserta } from '@/app_modules/event';
import React from 'react';

export default async function Page({ children }: { children: React.ReactNode }) {
  return (
    <LayoutEvent_Peserta>
      {children}
    </LayoutEvent_Peserta>
  )
}
