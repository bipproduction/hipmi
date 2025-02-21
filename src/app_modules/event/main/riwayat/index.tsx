"use client";

import {
  MainColor
} from "@/app_modules/_global/color/color_pallet";
import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { Stack, Tabs } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { listTabsRiwayatEvent } from "../../component/list_tab_riwayat";
import Event_ViewRiwayat from "./view_riwayat";

export default function Event_Riwayat() {
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const statusId = param.id;

  return (
    <>
      <Tabs
        variant="pills"
        radius={"xl"}
        defaultValue={statusId}
        value={statusId}
        onTabChange={(val: any) => {
          router.replace(RouterEvent.riwayat({ id: val }));
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
            {listTabsRiwayatEvent.map((e) => (
              <Tabs.Tab
                key={e.id}
                value={e.id}
                fw={"bold"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    statusId === e.id ? MainColor.yellow : MainColor.white,
                  color: MainColor.darkblue,
                }}
              >
                {e.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Event_ViewRiwayat />
        </Stack>
      </Tabs>
    </>
  );
}
