"use client";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import {
  UIGlobal_Drawer,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { clientLogger } from "@/util/clientLogger";
import { ActionIcon } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCirclePlus, IconDotsVertical } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { apiGetEventDetailById } from "../../_lib/api_event";
import { MODEL_EVENT } from "../../_lib/interface";
import moment from "moment";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

function LayoutEvent_Sponsor({ children }: { children: React.ReactNode }) {
  const params = useParams<{ id: string }>();
  const eventId = params.id as string;
  const [data, setData] = useState<MODEL_EVENT | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetEventDetailById({
        id: eventId,
      });

      if (respone) {
        setData(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get data detail event", error);
    }
  }

  const isExpired = moment(data?.tanggalSelesai).diff(moment(), "minutes") < 0;

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Daftar Sponsor"
            customButtonRight={
              !data ? (
                <CustomSkeleton height={30} width={30} circle />
              ) : !isExpired ? (
                <ActionIcon
                  variant="transparent"
                  onClick={() => setOpenDrawer(true)}
                >
                  <IconDotsVertical color="white" />
                </ActionIcon>
              ) : (
                ""
              )
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={[
          {
            id: 1,
            name: "Tambah Sponsor",
            icon: <IconCirclePlus />,
            path: RouterEvent.tambah_sponsor({ id: params.id }),
          },
        ]}
      />
    </>
  );
}

export default LayoutEvent_Sponsor;
