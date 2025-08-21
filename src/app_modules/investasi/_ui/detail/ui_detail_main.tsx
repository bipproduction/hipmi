"use client";

import { MainColor } from "@/app_modules/_global/color";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";
import { UIGlobal_Drawer } from "@/app_modules/_global/ui";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { ActionIcon } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconCategoryPlus,
  IconDeviceIpadPlus,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiNewGetOneInvestasiById } from "../../_lib/api_fetch_new_investasi";
import { MODEL_INVESTASI } from "../../_lib/interface";
import { Investasi_ViewDetailPublish } from "../../_view";

export function Investasi_UiDetailMain() {
  const param = useParams<{ id: string }>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<MODEL_INVESTASI | null>(null);
  const [userLoginId, setUserLoginId] = useState<string | null>(null);

  useShallowEffect(() => {
    handleGetUserId();
  }, []);

  async function handleGetUserId() {
    try {
      const respone = await apiNewGetUserIdByToken();

      if (respone) {
        setUserLoginId(respone.userId);
      }
    } catch (error) {
      console.error("Error get data detail", error);
    }
  }

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
            userLoginId={userLoginId as string}
          />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
