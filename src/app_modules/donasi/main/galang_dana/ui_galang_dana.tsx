"use client";

import { Stack, Tabs, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_donasi_tabs_posting } from "../../global_state";
import PostingDraftDonasi from "./draft";
import PostingPublishDonasi from "./publish";
import PostingRejectDonasi from "./reject";
import PostingReviewDonasi from "./review";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { useState } from "react";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";

export default function GalangDanaDonasi({
  statusId,
  dataStatus,
  listStatus,
}: {
  statusId: string;
  dataStatus: any[];
  listStatus: MODEL_NEW_DEFAULT_MASTER[];
}) {
  const router = useRouter();
  const [changeStatus, setChangeStatus] = useState(statusId);

  const [tabsPostingDonasi, setTabsPostingDonasi] = useAtom(
    gs_donasi_tabs_posting
  );

  // const listPosting = [
  //   {
  //     id: 1,
  //     value: "Publish",
  //     path: <PostingPublishDonasi listPublish={listPublish} />,
  //     color: "green",
  //   },
  //   {
  //     id: 2,
  //     value: "Review",
  //     path: <PostingReviewDonasi listReview={listReview} />,
  //     color: "yellow",
  //   },
  //   {
  //     id: 3,
  //     value: "Draft",
  //     path: <PostingDraftDonasi listDraft={listDraft} />,
  //     color: "red",
  //   },
  //   {
  //     id: 4,
  //     value: "Reject",
  //     path: <PostingRejectDonasi listReject={listReject} />,
  //     color: "red",
  //   },
  // ];

  async function onChangeStatus({ statusId }: { statusId: string }) {
    router.replace(RouterDonasi.status_galang_dana({ id: statusId }));
  }

  return (
    <>
      <Tabs
        color="orange"
        variant="pills"
        radius="xl"
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
            {listStatus.map((e, i) => (
              <Tabs.Tab
                key={e.id}
                value={e.id}
                fw={"bold"}
                c={"black"}
                style={{
                  transition: "0.5s",
                  backgroundColor:
                    changeStatus === e.id ? MainColor.yellow : "white",
                  border:
                    changeStatus === e.id
                      ? `1px solid ${AccentColor.yellow}`
                      : `1px solid white`,
                }}
              >
                {e.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {statusId == "1" && <PostingPublishDonasi listPublish={dataStatus} />}

          {statusId == "2" && <PostingReviewDonasi listReview={dataStatus} />}

          {statusId == "3" && <PostingDraftDonasi listDraft={dataStatus} />}

          {statusId == "4" && <PostingRejectDonasi listReject={dataStatus} />}
        </Stack>
      </Tabs>
    </>
  );
}
