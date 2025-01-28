"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { Stack, Tabs, Text } from "@mantine/core";
import { IconUser, IconUsersGroup } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { gs_colab_proyek } from "../../global_state";
import Colab_PartisipasiProyek from "./partisipasi";
import Colab_ProyekSaya from "./saya";

export default function Colab_Proyek() {
  const [activeTab, setActiveTab] = useAtom(gs_colab_proyek);

  const listTabs = [
    {
      id: 1,
      icon: <IconUsersGroup />,
      label: "Partisipasi Proyek",
      value: "Partisipasi",
      path: <Colab_PartisipasiProyek />,
    },
    {
      id: 2,
      icon: <IconUser />,
      label: "Proyek Saya",
      value: "Saya",
      path: <Colab_ProyekSaya />,
    },
  ];

  return (
    <Tabs
      variant="pills"
      value={activeTab}
      onTabChange={setActiveTab}
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
              style={{
                transition: "0.5s",
                color: activeTab === e.value ? MainColor.darkblue : MainColor.black,
                backgroundColor:
                  activeTab === e.value ? MainColor.yellow : MainColor.white,
                border:
                  activeTab === e.value
                    ? `1px solid ${AccentColor.yellow}`
                    : `1px solid ${MainColor.white}`,
              }}
            >
              <Stack align="center" justify="center" spacing={0}>
                {e.icon}
                <Text>{e.label}</Text>
              </Stack>
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
  );
}
