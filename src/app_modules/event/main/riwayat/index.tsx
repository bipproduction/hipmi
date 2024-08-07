"use client";

import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import ComponentGlobal_AuthorNameOnHeader from "@/app_modules/_global/author_name_on_header";
import { Card, Stack, Grid, Title, Text, Center, Tabs } from "@mantine/core";
import moment from "moment";

import { MODEL_EVENT } from "../../model/interface";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Event_SemuaRiwayat from "./semua";
import Event_RiwayatSaya from "./saya";
import { useAtom } from "jotai";
import { gs_event_riwayat } from "../../global_state";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function Event_Riwayat({
  dataSemuaRiwayat,
  dataRiwayatSaya
}: {
  dataSemuaRiwayat: MODEL_EVENT[];
  dataRiwayatSaya: MODEL_EVENT[]
}) {
  const router = useRouter();
  const [tabsRiwayat, setTabsRiwayat] = useAtom(gs_event_riwayat)

  const listTabs = [
    {
      id: 1,
      label: "Semua Riwayat",
      value: "Semua",
      path: <Event_SemuaRiwayat listData={dataSemuaRiwayat as any} />,
    },
    {
      id: 2,
      label: "Riwayat Saya",
      value: "Saya",
      path: <Event_RiwayatSaya listData={dataRiwayatSaya as any} />,
    },
  ];

  return (
    <>
      <Tabs
        defaultValue={"Semua"}
        variant="pills"
        radius={"xl"}
        onTabChange={setTabsRiwayat}
        value={tabsRiwayat}
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
                value={e.value}
                fw={"bold"}
                c={"black"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    tabsRiwayat === e.value ? MainColor.yellow : "white",
                  border:
                    tabsRiwayat === e.value
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid white`,
                }}
              >
                {e.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {listTabs.map((e) => (
            <Tabs.Panel key={e.id} value={e.value}>
              {e.path}
            </Tabs.Panel>
          ))}
        </Stack>
      </Tabs>
    </>
  );
}
