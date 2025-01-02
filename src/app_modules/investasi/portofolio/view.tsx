"use client";

import { Stack, Tabs } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAtom } from "jotai";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { gs_investasi_status } from "../g_state";
import { MODEL_Status_investasi } from "../_lib/interface";
import Draft from "./draft";
import Publish from "./publish";
import Reject from "./reject";
import Review from "./review";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";

export default function PortofolioInvestasi({
  listStatusInvestasi,
  dataDraft,
  dataReview,
  dataPublish,
  dataReject,
}: {
  listStatusInvestasi: any;
  dataDraft: any;
  dataReview: any;
  dataPublish: any;
  dataReject: any;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useAtom(gs_investasi_status);
  const [status_inves, setStatus_inves] =
    useState<MODEL_Status_investasi[]>(listStatusInvestasi);

  return (
    <>
      {/* <pre>{JSON.stringify(dataInvestasi, null, 2)}</pre> */}
      <Tabs
        color="orange"
        variant="pills"
        radius="xl"
        defaultValue="Draft"
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
            {status_inves.map((e) => (
              <Tabs.Tab
                key={e.id}
                value={e.name}
                fw={"bold"}
                c={"black"}
                style={{
                  transition: "0.5s",
                  color: activeTab === e.id ? MainColor.darkblue : MainColor.black,
                  // backgroundColor:
                  //   activeTab === e.name ? MainColor.yellow : AccentColor.white,
                  // border:
                  //   activeTab === e.name
                  //     ? `1px solid ${AccentColor.yellow}`
                  //     : `1px solid white`,
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="Publish">
            <Publish data={dataPublish as any} />
          </Tabs.Panel>
          <Tabs.Panel value="Review">
            <Review data={dataReview as any} />
          </Tabs.Panel>
          <Tabs.Panel value="Draft">
            <Draft data={dataDraft as any} />
          </Tabs.Panel>
          <Tabs.Panel value="Reject">
            <Reject data={dataReject as any} />
          </Tabs.Panel>
        </Stack>
      </Tabs>
    </>
  );
}
