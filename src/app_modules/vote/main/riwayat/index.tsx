"use client";

import { RouterVote } from "@/lib/router_hipmi/router_vote";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { Stack, Tabs } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import Vote_RiwayatSaya from "./saya";
import Vote_SemuaRiwayat from "./semua";

export default function Vote_Riwayat() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const listTabs = [
    {
      id: "1",
      value: "Semua",
      label: "Semua Riwayat",
    },
    {
      id: "2",
      value: "Saya",
      label: "Riwayat Saya",
    },
  ];

  return (
    <>
      <Tabs
        mt={1}
        variant="pills"
        radius={"xl"}
        value={params.id}
        onTabChange={(val: any) => {
          router.replace(RouterVote.riwayat({ id: val }));
        }}
        styles={{
          tabsList: {
            backgroundColor: MainColor.darkblue,
            position: "sticky",
            top: 0,
            zIndex: 99,
          },
          panel: {
            paddingTop: 10,
          },
        }}
      >
        <Stack>
          <Tabs.List grow>
            {listTabs.map((e, i) => (
              <Tabs.Tab
                key={i}
                value={e.id}
                fw={"bold"}
                c={"black"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    params.id === e.id ? MainColor.yellow : MainColor.white,
                  border:
                    params.id === e.id
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid ${MainColor.white}`,
                }}
              >
                {e.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {params.id === "1" && <Vote_SemuaRiwayat />}
          {params.id === "2" && <Vote_RiwayatSaya />}
        </Stack>
      </Tabs>
    </>
  );
}
