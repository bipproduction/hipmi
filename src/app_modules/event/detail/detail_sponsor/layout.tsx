'use client';
import { UIGlobal_Drawer, UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from '@/app_modules/_global/ui';
import { ActionIcon } from '@mantine/core';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';

function LayoutEvent_DetailSponsor({ children }: { children: React.ReactNode }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <UIGlobal_LayoutTamplate header={<UIGlobal_LayoutHeaderTamplate title="Detail Sponsor"
        customButtonRight={
          <ActionIcon variant='transparent' onClick={() => setOpenDrawer(true)}>
            <IconDotsVertical color='white' />
          </ActionIcon>} />}>
      {children}
      </UIGlobal_LayoutTamplate>
      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={[
          {
            id: 1,
            name: 'Edit Sponsor',
            icon: <IconEdit />,
            // path: RouterEvent.tambah_sponsor,
          },
          {
            id: 2,
            name: 'Hapus Sponsor',
            icon: <IconTrash/>
          }
        ]}
      />
    </>
  );
}

export default LayoutEvent_DetailSponsor;
