"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon } from "@mantine/core";
import {
  IconCreditCard,
  IconDotsVertical,
  IconEdit,
  IconTornado,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LayoutDetailDraftDonasi({
  children,
  donasiId,
}: {
  children: React.ReactNode;
  donasiId: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const [isLoadingDonasi, setLoadingDonasi] = useState(false);
  const [isLoadingCerita, setLoadingCerita] = useState(false);
  const [isLoadingRekening, setLoadingRekening] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Edit Donasi",
      icon: <IconEdit />,
      path: RouterDonasi.edit_donasi + donasiId,
    },
    {
      id: "2",
      name: "Edit Cerita Pengalang",
      icon: <IconTornado />,
      path: RouterDonasi.edit_cerita_penggalang + donasiId,
    },
    {
      id: "3",
      name: "Edit Rekening",
      icon: <IconCreditCard />,
      path: RouterDonasi.edit_rekening + donasiId,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Draft"
            customButtonRight={
              <ActionIcon
                variant="transparent"
                onClick={() => setOpenDrawer(true)}
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
