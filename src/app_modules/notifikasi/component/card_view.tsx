"use client";

import { gs_count_ntf } from "@/app/lib/global_state";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";
import { gs_event_hotMenu } from "@/app_modules/event/global_state";
import { gs_job_hot_menu } from "@/app_modules/job/global_state";
import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ICategoryapp, MODEL_NOTIFIKASI } from "../model/interface";
import { notifikasi_eventCheckStatus } from "./path/event";
import { notifikasi_jobCheckStatus } from "./path/job";
import { gs_vote_hotMenu } from "@/app_modules/vote/global_state";
import { notifikasi_votingCheckStatus } from "./path/voting";
import { redirectDonasiPage } from "./path/donasi";
import { gs_donasi_hot_menu } from "@/app_modules/donasi/global_state";
import moment from "moment";
import "moment/locale/id";

export function ComponentNotifiaksi_CardView({
  data,
  onLoadData,
  categoryPage,
}: {
  data: MODEL_NOTIFIKASI;
  onLoadData: (val: any) => void;
  categoryPage: string;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [loadCountNtf, setLoadCountNtf] = useAtom(gs_count_ntf);

  const [jobMenuId, setJobMenuId] = useAtom(gs_job_hot_menu);
  const [eventMenuId, setEventMenuId] = useAtom(gs_event_hotMenu);
  const [votingMenu, setVotingMenu] = useAtom(gs_vote_hotMenu);
  const [donasiMenu, setDonasiMenu] = useAtom(gs_donasi_hot_menu);

  return (
    <>
      <Card
        style={{
          backgroundColor: data?.isRead
            ? MainColor.darkblue
            : AccentColor.darkblue,
          color: data?.isRead ? "gray" : "white",
          border: data?.isRead
            ? `2px solid ${AccentColor.darkblue}`
            : `2px solid ${AccentColor.blue}`,
          borderRadius: "10px 10px 10px 10px",
        }}
        my={"xs"}
        onClick={async () => {
          // JOB
          if (data?.kategoriApp === "JOB") {
            await notifikasi_jobCheckStatus({
              appId: data.appId,
              dataId: data.id,
              categoryPage: categoryPage,
              router: router,
              onLoadDataJob(val) {
                onLoadData(val);
              },
              onSetJobMenuId(val) {
                setJobMenuId(val);
              },
              onSetVisible(val) {
                setVisible(val);
              },
              onLoadCountNtf(val) {
                setLoadCountNtf(val);
              },
            });
          }

          // EVENT
          if (data?.kategoriApp === "EVENT") {
            await notifikasi_eventCheckStatus({
              appId: data.appId,
              dataId: data.id,
              categoryPage: categoryPage,
              router: router,
              onLoadDataEvent(val) {
                onLoadData(val);
              },
              onSetVisible(val) {
                setVisible(val);
              },
              onSetEventMenuId(val) {
                setEventMenuId(val);
              },
              onLoadCountNtf(val) {
                setLoadCountNtf(val);
              },
            });
          }

          if (data?.kategoriApp === "VOTING") {
            await notifikasi_votingCheckStatus({
              appId: data.appId,
              dataId: data.id,
              categoryPage: categoryPage,
              router: router,
              onLoadDataEvent(val) {
                onLoadData(val);
              },
              onSetVisible(val) {
                setVisible(val);
              },
              onSetMenuId(val) {
                setVotingMenu(val);
              },
              onLoadCountNtf(val) {
                setLoadCountNtf(val);
              },
            });
          }

          if (data?.kategoriApp === "DONASI") {
            redirectDonasiPage({
              appId: data.appId,
              dataId: data.id,
              categoryPage: categoryPage,
              router: router,
              onLoadDataEvent(val) {
                onLoadData(val);
              },
              onSetVisible(val) {
                setVisible(val);
              },
              onSetMenuId(val) {
                setDonasiMenu(val);
              },
              onLoadCountNtf(val) {
                setLoadCountNtf(val);
              },
            });
          }

          // data?.kategoriApp === "FORUM" &&
          //   redirectDetailForumPage({
          //     data: data,
          //     router: router,
          //   });

          // data?.kategoriApp === "VOTING" &&
          //   redirectVotingPage({
          //     data: data,
          //     router: router,
          //     onSetPage(val) {
          //       // onSetMenu(val);
          //     },
          //   });

          // data?.kategoriApp === "EVENT" &&
          //   redirectEventPage({
          //     data: data,
          //     router: router,
          //     onSetPage(val) {
          //       // onSetMenu(val);
          //     },
          //   });

          // data?.kategoriApp === "COLLABORATION" &&
          //   redirectDetailCollaborationPage({
          //     data: data,
          //     router: router,
          //   });

          // data.kategoriApp === "INVESTASI" &&
          //   redirectInvestasiPage({
          //     data: data,
          //     router: router,
          //     onSetPage(val) {
          //       // onSetMenu(val);
          //     },
          //   });
        }}
      >
        {/* <pre>{JSON.stringify(e, null, 2)}</pre> */}
        <Card.Section p={"sm"}>
          <Stack spacing={"xs"}>
            <Group position="apart">
              <Text fw={"bold"} fz={10}>
                # {data?.kategoriApp}
              </Text>
              {data?.status ? (
                <Badge
                  //   fz={10}
                  variant="outline"
                  color={data?.isRead ? "gray" : "teal"}
                >
                  {data?.status}
                </Badge>
              ) : (
                ""
              )}
            </Group>
            <Divider color={data?.isRead ? "gray" : "white"} />
          </Stack>
        </Card.Section>
        <Card.Section px={"sm"} pb={"sm"}>
          <Stack spacing={data.kategoriApp === "FORUM" ? 0 : "xs"}>
            <Text lineClamp={2} fw={"bold"}>
              {data?.title}
            </Text>
            {data.kategoriApp === "FORUM" ? (
              <div
                style={{ fontSize: 12 }}
                dangerouslySetInnerHTML={{ __html: data?.pesan }}
              />
            ) : (
              <Text lineClamp={2}>{data?.pesan}</Text>
            )}
          </Stack>
        </Card.Section>
        <Card.Section p={"sm"}>
          <Group position="apart">
            <Text fz={10} color="gray">
              {moment(data.createdAt).format("LLL")}
            </Text>
            {data?.isRead ? (
              <Group spacing={5}>
                <IconChecks color="gray" size={10} />
                <Text fz={10} color="gray">
                  Sudah dilihat
                </Text>
              </Group>
            ) : (
              <Group spacing={5}>
                <IconCheck color="gray" size={10} />
                <Text fz={10} color="gray">
                  Belum dilihat
                </Text>
              </Group>
            )}
          </Group>
          {visible && <ComponentGlobal_CardLoadingOverlay />}
        </Card.Section>
      </Card>
    </>
  );
}
