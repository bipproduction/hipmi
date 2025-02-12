"use client";

import { Stack, Tabs } from "@mantine/core";
import { RouterEvent } from "@/lib/router_hipmi/router_event";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_EVENT } from "../../_lib/interface";
import Event_RiwayatSaya from "./saya";
import Event_SemuaRiwayat from "./semua";

export default function Event_Riwayat({
  statusId,
  dataSemuaRiwayat,
  dataRiwayatSaya,
}: {
  statusId: string;
  dataSemuaRiwayat?: MODEL_EVENT[];
  dataRiwayatSaya?: MODEL_EVENT[];
}) {
  const router = useRouter();
  const [changeStatus, setChangeStatus] = useState(statusId);

  const listTabs = [
    {
      id: "1",
      label: "Semua Riwayat",
      value: "Semua",
    },
    {
      id: "2",
      label: "Riwayat Saya",
      value: "Saya",
    },
  ];

  async function onChangeStatus({ statusId }: { statusId: string }) {
    router.push(RouterEvent.riwayat({ id: statusId }));
  }

  return (
    <>
      <Tabs
        variant="pills"
        radius={"xl"}
        value={changeStatus}
        onTabChange={(val: any) => {
          setChangeStatus(val);
          onChangeStatus({ statusId: val });
        }}
        styles={{
          tabsList: {
            backgroundColor: MainColor.darkblue,
            position: "sticky",
            top: 0,
            zIndex: 99,
          },
        }}
      >
        <Stack>
          <Tabs.List grow>
            {listTabs.map((e) => (
              <Tabs.Tab
                key={e.id}
                value={e.id}
                fw={"bold"}
                c={"black"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    changeStatus === e.id ? MainColor.yellow : MainColor.white,
                  border:
                    changeStatus === e.id
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid ${MainColor.white}`,
                }}
              >
                {e.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {statusId == "1" && (
            <Event_SemuaRiwayat listData={dataSemuaRiwayat as any} />
          )}
          {statusId == "2" && (
            <Event_RiwayatSaya listData={dataRiwayatSaya as any} />
          )}
        </Stack>
      </Tabs>
    </>
  );
}
