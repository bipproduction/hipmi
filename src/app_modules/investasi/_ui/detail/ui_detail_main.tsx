"use client";

import { MainColor } from "@/app_modules/_global/color";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import {
  UIGlobal_Drawer
} from "@/app_modules/_global/ui";
import UI_NewLayoutTamplate, { UI_NewChildren, UI_NewHeader } from "@/app_modules/_global/ui/V2_layout_tamplate";
import {
  NEW_RouterInvestasi
} from "@/lib/router_hipmi/router_investasi";
import { ActionIcon } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCategoryPlus, IconDeviceIpadPlus, IconDotsVertical } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiNewGetOneInvestasiById } from "../../_lib/api_fetch_new_investasi";
import { MODEL_INVESTASI } from "../../_lib/interface";
import { Investasi_ViewDetailPublish } from "../../_view";

export function Investasi_UiDetailMain({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const param = useParams<{ id: string }>();
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<MODEL_INVESTASI | null>(null);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiNewGetOneInvestasiById({ id: param.id });

      if (response.success) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error get investasi", error);
      setData(null);
    }
  };

  const listPage = [
    {
      id: "1",
      name: "Tambah & Edit Dokumen",
      icon: <IconCategoryPlus />,
      path: NEW_RouterInvestasi.rekap_dokumen({ id: data?.id as any }),
    },
    {
      id: "2",
      name: "Tambah & Edit Berita",
      icon: <IconDeviceIpadPlus />,
      path: NEW_RouterInvestasi.rekap_berita({ id: data?.id as any }),
    },
  ];

  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Detail "
            customButtonRight={
              userLoginId === data?.authorId ? (
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
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewDetailPublish
            data={data as any}
            userLoginId={userLoginId}
          />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>

      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail "
            customButtonRight={
              userLoginId === data?.authorId ? (
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
          data={data as any}
          userLoginId={userLoginId}
        />
      </UIGlobal_LayoutTamplate> */}

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
