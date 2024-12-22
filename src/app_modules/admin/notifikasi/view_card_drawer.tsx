import {
  gs_adminDonasi_triggerReview,
  gs_adminEvent_triggerReview,
  gs_adminJob_triggerReview,
  gs_adminVoting_triggerReview,
  ITypeStatusNotifikasi,
} from "@/app/lib/global_state";
import { AccentColor } from "@/app_modules/_global/color";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { IconCheck, IconChecks } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../_admin_global/admin_notifikasi/notifikasi_peringatan";
import adminNotifikasi_countNotifikasi from "./fun/count/count_is_read";
import adminNotifikasi_getByUserId from "./fun/get/get_notifikasi_by_user_id";
import { adminNotifikasi_findRouterEvent } from "./route_setting/event";
import { adminNotifikasi_findRouterJob } from "./route_setting/job";
import {
  IAdmin_ActiveChildId,
  IAdmin_ActivePage,
} from "./route_setting/type_of_select_page";
import { adminNotifikasi_findRouterVoting } from "./route_setting/voting";
import adminNotifikasi_findRouterDonasi from "./route_setting/donasi";
import adminNotifikasi_findRouterInvestasi from "./route_setting/investasi";

export default function AdminNotifikasi_ViewCardDrawer({
  data,
  activePage,
  onChangeNavbar,
  onToggleNavbar,
  onLoadCountNotif,
  onLoadDataNotifikasi,
}: {
  data: MODEL_NOTIFIKASI;
  activePage: number;
  onChangeNavbar: (val: {
    id: IAdmin_ActivePage;
    childId: IAdmin_ActiveChildId;
  }) => void;
  onToggleNavbar: (val: any) => void;
  onLoadCountNotif: (val: any) => void;
  onLoadDataNotifikasi: (val: any) => void;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [dataId, setDataId] = useState<string>("");

  // Realtime
  const [isAdminJob_TriggerReview, setIsAdminJob_TriggerReview] = useAtom(
    gs_adminJob_triggerReview
  );
  const [isAdminEvent_TriggerReview, setIsAdminEvent_TriggerReview] = useAtom(
    gs_adminEvent_triggerReview
  );
  const [isAdminVoting_TriggerReview, setIsAdminVoting_TriggerReview] = useAtom(
    gs_adminVoting_triggerReview
  );
  const [isAdminDonasi_TriggerReview, setIsAdminDonasi_TriggerReview] = useAtom(
    gs_adminDonasi_triggerReview
  );

  async function onRead() {
    // ========================== JOB ========================== //
    if (data?.kategoriApp === "JOB") {
      setVisible(true);
      setDataId(data.id);

      const checkJob = await adminNotifikasi_findRouterJob({
        appId: data.appId,
        notifikasiId: data.id,
        router: router,
        activePage: activePage,
        onLoadCountNotif(val) {
          onLoadCountNotif(val);
        },
        onLoadDataNotifikasi(val) {
          onLoadDataNotifikasi(val);
        },
        onChangeNavbar(val) {
          onChangeNavbar({
            id: val.id,
            childId: val.childId,
          });
        },
      });

      if (checkJob) {
        setIsAdminJob_TriggerReview(false);
        setVisible(false);
        setDataId("");
        onToggleNavbar(false);
      }
    }
    // ========================== JOB ========================== //

    // ========================== EVENT ========================== //

    if (data.kategoriApp == "EVENT") {
      setVisible(true);
      setDataId(data.id);

      const checkEvent = await adminNotifikasi_findRouterEvent({
        appId: data.appId,
        notifikasiId: data.id,
        router: router,
        activePage: activePage,
        onLoadCountNotif(val) {
          onLoadCountNotif(val);
        },
        onLoadDataNotifikasi(val) {
          onLoadDataNotifikasi(val);
        },
        onChangeNavbar(val) {
          onChangeNavbar({
            id: val.id,
            childId: val.childId,
          });
        },
      });

      if (checkEvent) {
        setIsAdminEvent_TriggerReview(false);
        setVisible(false);
        setDataId("");
        onToggleNavbar(false);
      }
    }
    // ========================== EVENT ========================== //

    // ========================== VOTING ========================== //

    if (data.kategoriApp == "VOTING") {
      setVisible(true);
      setDataId(data.id);

      const checkVoting = await adminNotifikasi_findRouterVoting({
        router: router,
        appId: data.appId,
        notifikasiId: data.id,
        activePage: activePage,
        onLoadCountNotif(val) {
          onLoadCountNotif(val);
        },
        onLoadDataNotifikasi(val) {
          onLoadDataNotifikasi(val);
        },
        onChangeNavbar(val) {
          onChangeNavbar({
            id: val.id,
            childId: val.childId,
          });
        },
      });

      if (checkVoting) {
        setIsAdminVoting_TriggerReview(false);
        setVisible(false);
        setDataId("");
        onToggleNavbar(false);
      }
    }
    // ========================== VOTING ========================== //

    // ========================== DONASI ========================== //

    if (data.kategoriApp == "DONASI") {
      setVisible(true);
      setDataId(data.id);

      const checkDonasi = await adminNotifikasi_findRouterDonasi({
        appId: data.appId,
        notifikasiId: data.id,
        router: router,
        status: data.status as ITypeStatusNotifikasi,
        onLoadCountNotif(val) {
          onLoadCountNotif(val);
        },
        onLoadDataNotifikasi(val) {
          onLoadDataNotifikasi(val);
        },
        onChangeNavbar(val) {
          onChangeNavbar({
            id: val.id,
            childId: val.childId,
          });
        },
      });

      if (checkDonasi) {
        setIsAdminDonasi_TriggerReview(false);
        setVisible(false);
        setDataId("");
        onToggleNavbar(false);
      }
    }

    // ========================== DONASI ========================== //

    // ========================== INVESTASI ========================== //

    if (data.kategoriApp == "INVESTASI") {
      setVisible(true);
      setDataId(data.id);

      const checkInvestasi = await adminNotifikasi_findRouterInvestasi({
        appId: data.appId,
        notifikasiId: data.id,
        status: data.status as ITypeStatusNotifikasi,
        router: router,
        onLoadCountNotif(val) {
          onLoadCountNotif(val);
        },
        onLoadDataNotifikasi(val) {
          onLoadDataNotifikasi(val);
        },
        onChangeNavbar(val) {
          onChangeNavbar({
            id: val.id,
            childId: val.childId,
          });
        },
      });

      if (checkInvestasi) {
        setIsAdminDonasi_TriggerReview(false);
        setVisible(false);
        setDataId("");
        onToggleNavbar(false);
      }
    }

    // // FORUM
    // e?.kategoriApp === "FORUM" &&
    //   adminNotifikasi_findRouterForum({
    //     data: e,
    //     router: router,
    //     onChangeNavbar(val) {
    //       onChangeNavbar(val);
    //     },
    //     onToggleNavbar(val) {
    //       onToggleNavbar(val);
    //     },
    //   });

    // // VOTE
    // e?.kategoriApp === "VOTING" &&
    //   adminNotifikasi_findRouterVoting({
    //     data: e,
    //     router: router,
    //     onChangeNavbar(val) {
    //       onChangeNavbar(val);
    //     },
    //     onToggleNavbar(val) {
    //       onToggleNavbar(val);
    //     },
    //   });
  }

  return (
    <>
      <Card
        style={{
          transition: "0.5s",
        }}
        mb={"15px"}
        c={"white"}
        key={data.id}
        bg={data.isRead ? "gray" : AccentColor.darkblue}
        sx={{
          borderColor: AccentColor.blue,
          borderStyle: "solid",
          borderWidth: "2px",
          ":hover": {
            backgroundColor: AccentColor.blue,
            borderColor: AccentColor.softblue,
            borderStyle: "solid",
            borderWidth: "2px",
          },
        }}
        onClick={() => {
          onRead();
        }}
      >
        <Card.Section p={"sm"}>
          <Stack spacing={"xs"}>
            <Group position="apart">
              <Text fw={"bold"} fz={10}>
                # {data.kategoriApp}
              </Text>
              {data.status ? (
                <Badge fz={10} size="sm">
                  {data.status}
                </Badge>
              ) : (
                ""
              )}
            </Group>
            <Divider color="gray.3" />
          </Stack>
        </Card.Section>
        <Card.Section px={"sm"} pb={"sm"}>
          <Stack spacing={0}>
            <Text lineClamp={2} fw={"bold"} fz={"xs"}>
              {data.title}
            </Text>
            <Text lineClamp={2} fz={"xs"}>
              {data.pesan}
            </Text>
          </Stack>
        </Card.Section>
        <Card.Section p={"sm"}>
          <Group position="apart">
            <Text fz={10}>
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "long",
              }).format(data.createdAt)}

              <Text span inherit fz={10}>
                {", "}
                {new Intl.DateTimeFormat("id-ID", {
                  timeStyle: "short",
                }).format(data.createdAt)}
              </Text>
            </Text>
            {data.isRead ? (
              <Group spacing={5}>
                <IconChecks size={10} />
                <Text fz={10}>Sudah dilihat</Text>
              </Group>
            ) : (
              <Group spacing={5}>
                <IconCheck size={10} />
                <Text fz={10}>Belum dilihat</Text>
              </Group>
            )}
          </Group>
          {visible && dataId === data.id && (
            <ComponentGlobal_CardLoadingOverlay />
          )}
        </Card.Section>
      </Card>
    </>
  );
}
