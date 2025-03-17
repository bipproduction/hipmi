"use client";

import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import {
  UIGlobal_DrawerCustom,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import { ActionIcon, SimpleGrid, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconCategoryPlus,
  IconDotsVertical,
  IconEdit,
  IconFilePencil,
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetOneInvestasiById } from "../../_lib/api_interface";
import { MODEL_INVESTASI } from "../../_lib/interface";
import {
  Investasi_ViewDetailDraft,
  Investasi_ViewDetailReject,
  Investasi_ViewDetailReview,
} from "../../_view";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewHeader,
  UI_NewChildren,
} from "@/app_modules/_global/ui/V2_layout_tamplate";

export function Investasi_UiDetailPortofolio() {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [pageId, setPageId] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState<MODEL_INVESTASI | null>(null);
  const listPage = [
    {
      id: "1",
      name: "Edit Investasi",
      icon: <IconEdit />,
      path: NEW_RouterInvestasi.edit_investasi({ id: investasiId }),
    },
    {
      id: "2",
      name: "Edit Prospektus",
      icon: <IconFilePencil />,
      path: NEW_RouterInvestasi.edit_prospektus({ id: investasiId }),
    },
    {
      id: "3",
      name: "Tambah & Edit Dokumen",
      icon: <IconCategoryPlus />,
      path: NEW_RouterInvestasi.rekap_dokumen({ id: investasiId }),
    },
  ];

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetOneInvestasiById({
        id: investasiId,
      });

      if (respone.success) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get detail investasi:", error);
    }
  }

  if (data === null) {
    return (
      <>
        <UIGlobal_LayoutTamplate
          header={<UIGlobal_LayoutHeaderTamplate title={`Detail`} />}
        >
          <CustomSkeleton height={"80vh"} />
        </UIGlobal_LayoutTamplate>
      </>
    );
  }

  // DRAFT
  if (data.masterStatusInvestasiId == "3")
    return (
      <>
        {/* <UIGlobal_LayoutTamplate
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
          <Investasi_ViewDetailDraft dataInvestasi={data} />
        </UIGlobal_LayoutTamplate> */}

        <UI_NewLayoutTamplate>
          <UI_NewHeader>
            <Component_Header
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
          </UI_NewHeader>
          <UI_NewChildren>
            <Investasi_ViewDetailDraft dataInvestasi={data} />
          </UI_NewChildren>
        </UI_NewLayoutTamplate>

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
    // <UIGlobal_LayoutTamplate
    //   header={
    //     <UIGlobal_LayoutHeaderTamplate
    //       title={`Detail ${data.MasterStatusInvestasi.name}`}
    //     />
    //   }
    // >
    //   {data.masterStatusInvestasiId === "2" && (
    //     <Investasi_ViewDetailReview dataInvestasi={data} />
    //   )}

    //   {data.masterStatusInvestasiId === "4" && (
    //     <Investasi_ViewDetailReject dataInvestasi={data} />
    //   )}
    // </UIGlobal_LayoutTamplate>
    <UI_NewLayoutTamplate>
      <UI_NewHeader>
        <Component_Header title={`Detail ${data.MasterStatusInvestasi.name}`} />
      </UI_NewHeader>
      <UI_NewChildren>
        {data.masterStatusInvestasiId === "2" && (
          <Investasi_ViewDetailReview dataInvestasi={data} />
        )}

        {data.masterStatusInvestasiId === "4" && (
          <Investasi_ViewDetailReject dataInvestasi={data} />
        )}
      </UI_NewChildren>
    </UI_NewLayoutTamplate>
  );
}
