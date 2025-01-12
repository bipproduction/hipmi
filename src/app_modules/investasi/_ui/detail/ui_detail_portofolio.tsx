"use client";

import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import {
  UIGlobal_Drawer,
  UIGlobal_DrawerCustom,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { ActionIcon, Box, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  IconCategoryPlus,
  IconDotsVertical,
  IconEdit,
  IconFilePencil,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_INVESTASI } from "../../_lib/interface";
import {
  Investasi_ViewDetailDraft,
  Investasi_ViewDetailReject,
  Investasi_ViewDetailReview,
} from "../../_view";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { MainColor } from "@/app_modules/_global/color";

export function Investasi_UiDetailPortofolio({
  dataInvestasi,
  userLoginId,
}: {
  dataInvestasi: MODEL_INVESTASI;
  userLoginId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [pageId, setPageId] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<any>(dataInvestasi);
  const listPage = [
    {
      id: "1",
      name: "Edit Investasi",
      icon: <IconEdit />,
      path: NEW_RouterInvestasi.edit_investasi({ id: data.id }),
    },
    {
      id: "2",
      name: "Edit Prospektus",
      icon: <IconFilePencil />,
      path: NEW_RouterInvestasi.edit_prospektus({ id: data.id }),
    },
    {
      id: "3",
      name: "Tambah & Edit Dokumen",
      icon: <IconCategoryPlus />,
      path: NEW_RouterInvestasi.rekap_dokumen({ id: data.id }),
    },
  ];

  if (data.masterStatusInvestasiId == "3")
    return (
      <>
        <UIGlobal_LayoutTamplate
          header={
            <UIGlobal_LayoutHeaderTamplate
              title={`Detail Draft`}
              customButtonRight={
                <ActionIcon
                  variant="transparent"
                  onClick={() => setOpenDrawer(true)}
                >
                  <IconDotsVertical color={MainColor.white} />
                </ActionIcon>
              }
            />
          }
        >
          <Investasi_ViewDetailDraft dataInvestasi={dataInvestasi} />
        </UIGlobal_LayoutTamplate>

        {/* <UIGlobal_Drawer
          opened={openDrawer}
          close={() => setOpenDrawer(false)}
          component={listPage}
        /> */}

        <UIGlobal_DrawerCustom
          opened={openDrawer}
          close={() => setOpenDrawer(false)}
          component={
            <SimpleGrid cols={listPage.length}>
              {listPage.map((e, i) => (
                <Stack key={i} align="center" spacing={"xs"}>
                  <ActionIcon
                    variant="transparent"
                    c={MainColor.white}
                    onClick={() => {
                      setPageId(e?.id);
                      setLoading(true);
                      if (e.id === "1") {
                        setData({});
                      }
                      router.push(e?.path, { scroll: false });
                    }}
                  >
                    {isLoading && e?.id === pageId ? (
                      <ComponentGlobal_Loader />
                    ) : (
                      e?.icon
                    )}
                  </ActionIcon>
                  <Text fz={"sm"} align="center" color={MainColor.white}>
                    {e?.name}
                  </Text>
                </Stack>
              ))}
            </SimpleGrid>
          }
        />
      </>
    );

  return (
    <UIGlobal_LayoutTamplate
      header={
        <UIGlobal_LayoutHeaderTamplate
          title={`Detail ${dataInvestasi.MasterStatusInvestasi.name}`}
        />
      }
    >
      {dataInvestasi.masterStatusInvestasiId === "2" && (
        <Investasi_ViewDetailReview dataInvestasi={dataInvestasi} />
      )}

      {dataInvestasi.masterStatusInvestasiId === "4" && (
        <Investasi_ViewDetailReject dataInvestasi={dataInvestasi} />
      )}
    </UIGlobal_LayoutTamplate>
  );
}
