"use client";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { AccentColor, MainColor, } from "@/app_modules/_global/color/color_pallet";
import { Stack, Tabs } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import Donasi_ViewGalangDanaNew from "./donasi_galang_dana_new";

export default function GalangDanaDonasiNew() {
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const status = [
    {
      id: "1",
      name: "Publish"
    },
    {
      id: "2",
      name: "Review"
    },
    {
      id: "3",
      name: "Draft"
    },
    {
      id: "4",
      name: "Reject"
    }
  ]

  async function onChangeStatus({ statusId }: { statusId: string }) {
    router.replace(RouterDonasi.status_galang_dana({ id: statusId }));
  }

  return (
    <>
      <Tabs
        color="orange"
        variant="pills"
        radius="xl"
        value={param.id}
        onTabChange={(val: any) => {
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
            {status.map((e, i) => (
              <Tabs.Tab
                key={e.id}
                value={e.id}
                fw={"bold"}
                c={"black"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    param.id === e.id ? MainColor.yellow : "white",
                  border:
                    param.id === e.id
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid white`,
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Donasi_ViewGalangDanaNew />
        </Stack>
      </Tabs>
    </>
  );
}
