"use client";

import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { Stack, Tabs } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Investasi_ViewPortofolio } from "../../_view";
export function Investasi_UiPortofolio({
  listStatus,
  statusId,
  dataPortofolio,
}: {
  listStatus: MODEL_NEW_DEFAULT_MASTER[];
  statusId: string;
  dataPortofolio: any[];
}) {
  const [activeTab, setActiveTab] = useState<string | null>(statusId);
  const router = useRouter();

  return (
    <>
      <Tabs
        variant="pills"
        radius="xl"
        defaultValue={activeTab}
        styles={{
          tabsList: {
            position: "sticky",
            top: 0,
            zIndex: 99,
          },
        }}
        value={activeTab}
        onTabChange={(val: any) => {
          setActiveTab(val);
          router.push(NEW_RouterInvestasi.portofolio({ id: val }));
        }}
      >
        <Stack>
          <Tabs.List grow mb={"xs"}>
            {listStatus.map((e) => (
              <Tabs.Tab
                w={"20%"}
                key={e.id}
                value={e.id}
                fw={"bold"}
                style={{
                  transition: "ease 0.5s ",
                  backgroundColor:
                    activeTab === e.id ? MainColor.yellow : AccentColor.blue,
                  color: activeTab === e.id ? "black" : "white",
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Investasi_ViewPortofolio
            statusId={statusId}
            dataPortofolio={dataPortofolio as any}
          />
        </Stack>
      </Tabs>
    </>
  );
}
