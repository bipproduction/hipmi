'use client';
import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from '@/app_modules/_global/ui';
import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

function Event_LayoutInvoice({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UIGlobal_LayoutTamplate header={<UIGlobal_LayoutHeaderTamplate title="Invoice"
        customButtonLeft={
          <ActionIcon variant='transparent'>
          <IconX color='white'/>
          </ActionIcon>
        }
      />}>
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}

export default Event_LayoutInvoice;
