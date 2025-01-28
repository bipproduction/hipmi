"use client";

import {
  UIGlobal_Drawer,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { ActionIcon } from "@mantine/core";
import { IconCategoryPlus, IconDotsVertical } from "@tabler/icons-react";
import { MODEL_INVESTASI } from "../../_lib/interface";
import { Investasi_ViewDetailPublish } from "../../_view";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  NEW_RouterInvestasi,
  RouterInvestasi_OLD,
} from "@/app/lib/router_hipmi/router_investasi";
import { IconDeviceIpadPlus } from "@tabler/icons-react";
import { MainColor } from "@/app_modules/_global/color";

export function Investasi_UiDetailMain({
  dataInvestasi,
  userLoginId,
}: {
  dataInvestasi: MODEL_INVESTASI;
  userLoginId: string;
}) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Tambah & Edit Dokumen",
      icon: <IconCategoryPlus />,
      path: NEW_RouterInvestasi.rekap_dokumen({ id: dataInvestasi.id }),
    },
    {
      id: "2",
      name: "Tambah & Edit Berita",
      icon: <IconDeviceIpadPlus />,
      path: NEW_RouterInvestasi.rekap_berita({ id: dataInvestasi.id }),
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail "
            customButtonRight={
              userLoginId === dataInvestasi.authorId ? (
                <ActionIcon
                  variant="transparent"
                  onClick={() => setOpenDrawer(true)}
                >
                  <IconDotsVertical color={MainColor.white} />
                </ActionIcon>
              ) : (
                <ActionIcon disabled variant="transparent" />
              )
            }
          />
        }
      >
        <Investasi_ViewDetailPublish
          dataInvestasi={dataInvestasi}
          userLoginId={userLoginId}
        />
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
