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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  NEW_RouterInvestasi,
  RouterInvestasi_OLD,
} from "@/lib/router_hipmi/router_investasi";
import { IconDeviceIpadPlus } from "@tabler/icons-react";
import { MainColor } from "@/app_modules/_global/color";
import { useShallowEffect } from "@mantine/hooks";
import { apiNewGetOneInvestasiById } from "../../_lib/api_fetch_new_investasi";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export function Investasi_UiDetailMain({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const param = useParams<{ id: string }>();
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<MODEL_INVESTASI | null>(null);

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

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiNewGetOneInvestasiById({ id: param.id });

      if (response.success) {
        console.log(response.data);
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error get investasi", error);
      setData(null);
    }
  };

  return (
    <>
      <UIGlobal_LayoutTamplate
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
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
