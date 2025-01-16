'use client';
import { RouterEvent } from '@/app/lib/router_hipmi/router_event';
import { UIGlobal_Drawer, UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from '@/app_modules/_global/ui';
import { ActionIcon } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import React, { useState } from 'react';
import { TfiCup } from "react-icons/tfi";

function LayoutEvent_Sponsor({ children}: { children: React.ReactNode;}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate
          title="Daftar Sponsor"
          customButtonRight={
            <ActionIcon
              variant='transparent'
              onClick={() => setOpenDrawer(true)}
            >
              <IconDotsVertical color="white" />
            </ActionIcon>
          }
        />}>
        {children}
      </UIGlobal_LayoutTamplate>
      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={[
          {
            id: 1,
            name: 'Tambah Sponsor',
            icon: <TfiCup/>,
            path: RouterEvent.tambah_sponsor,
          },
        ]}

      />
    </>
  );
}

export default LayoutEvent_Sponsor;
