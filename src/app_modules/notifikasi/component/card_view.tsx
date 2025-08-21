"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";
import { gs_donasi_hot_menu } from "@/app_modules/donasi/global_state";
import { gs_event_hotMenu } from "@/app_modules/event/global_state";
import { gs_investas_menu } from "@/app_modules/investasi/g_state";
import { gs_job_hot_menu } from "@/app_modules/job/global_state";
import { gs_vote_hotMenu } from "@/app_modules/vote/global_state";
import { clientLogger } from "@/util/clientLogger";
import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import { useAtom } from "jotai";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_NOTIFIKASI } from "../model/interface";
import { redirectDonasiPage } from "./path/donasi";
import { notifikasi_eventCheckStatus } from "./path/event";
import { redirectDetailForumPage } from "./path/forum";
import { redirectInvestasiPage } from "./path/investasi";
import { notifikasi_jobCheckStatus } from "./path/job";
import { notifikasi_votingCheckStatus } from "./path/voting";
import { redirectDetailCollaborationPage } from "./path/collaboration";
import { Comp_V3_SetInnerHTMLWithStiker } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { useShallowEffect } from "@mantine/hooks";
import { Comp_SetInnerHTML } from "@/app_modules/_global/component/new/comp_set_inner_html";

export function ComponentNotifiaksi_CardView({
  data,
}: {
  data: MODEL_NOTIFIKASI;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const [jobMenuId, setJobMenuId] = useAtom(gs_job_hot_menu);
  const [eventMenuId, setEventMenuId] = useAtom(gs_event_hotMenu);
  const [votingMenu, setVotingMenu] = useAtom(gs_vote_hotMenu);
  const [donasiMenu, setDonasiMenu] = useAtom(gs_donasi_hot_menu);
  const [investasiMenu, setInvestasiMenu] = useAtom(gs_investas_menu);

  useShallowEffect(() => {
    // Add custom style for stickers inside Quill editor
    const style = document.createElement("style");
    style.textContent = `
        .chat-content img {
        max-width: 70px !important;
        max-height: 70px !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      // Clean up when component unmounts
      document.head.removeChild(style);
    };
  }, []);

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
          try {
            setVisible(true);

            // JOB
            if (data?.kategoriApp === "JOB") {
              await notifikasi_jobCheckStatus({
                appId: data.appId,
                dataId: data.id,
                router: router,
                onSetJobMenuId(val) {
                  setJobMenuId(val);
                },
                onSetVisible(val) {
                  setVisible(val);
                },
              });

              return;
            }

            // EVENT
            if (data?.kategoriApp === "EVENT") {
              await notifikasi_eventCheckStatus({
                appId: data.appId,
                dataId: data.id,
                router: router,
                onSetVisible(val) {
                  setVisible(val);
                },
                onSetEventMenuId(val) {
                  setEventMenuId(val);
                },
              });

              return;
            }

            // VOTING
            if (data?.kategoriApp === "VOTING") {
              await notifikasi_votingCheckStatus({
                appId: data.appId,
                dataId: data.id,
                router: router,
                onSetVisible(val) {
                  setVisible(val);
                },
                onSetMenuId(val) {
                  setVotingMenu(val);
                },
              });

              return;
            }

            // DONASI
            if (data?.kategoriApp === "DONASI") {
              await redirectDonasiPage({
                appId: data.appId,
                dataId: data.id,
                userId: data.userId,
                router: router,
                onSetVisible(val) {
                  setVisible(val);
                },
                onSetMenuId(val) {
                  setDonasiMenu(val);
                },
              });

              return;
            }

            // INVESTASI
            if (data?.kategoriApp === "INVESTASI") {
              await redirectInvestasiPage({
                appId: data.appId,
                dataId: data.id,
                router: router,
                onSetVisible(val) {
                  setVisible(val);
                },
                onSetMenuId(val) {
                  setInvestasiMenu(val);
                },
              });

              return;
            }

            if (data?.kategoriApp === "FORUM") {
              await redirectDetailForumPage({
                data: data,
                router: router,
                onSetVisible(val) {
                  setVisible(val);
                },
              });

              return;
            }

            if (data?.kategoriApp === "COLLABORATION") {
              await redirectDetailCollaborationPage({
                data: data,
                router: router,
                onSetVisible(val) {
                  setVisible(val);
                },
              });

              return;
            }
          } catch (error) {
            setVisible(false);
            clientLogger.error("Error redirect notification page", error);
          }
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
            {/* {data.kategoriApp === "FORUM" ? (
              <Text lineClamp={4}>
                <Comp_V3_SetInnerHTMLWithStiker
                  props={data?.pesan}
                  className="chat-content"
                  style={{ height: 100 }}
                />
              </Text>
            ) : (
              <Text lineClamp={2}>
                <Comp_SetInnerHTML props={data?.pesan} />
              </Text>
            )} */}
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
