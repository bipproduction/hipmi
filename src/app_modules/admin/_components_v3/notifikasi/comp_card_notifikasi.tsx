import { AccentColor } from "@/app_modules/_global/color";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";
import { MODEL_NOTIFIKASI } from "@/app_modules/notifikasi/model/interface";
import {
  gs_adminDonasi_triggerReview,
  gs_adminEvent_triggerReview,
  gs_adminJob_triggerReview,
  gs_adminVoting_triggerReview,
  ITypeStatusNotifikasi,
} from "@/lib/global_state";
import { clientLogger } from "@/util/clientLogger";
import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { IconCheck, IconChecks, IconSpeakerphone } from "@tabler/icons-react";
import { useAtom } from "jotai";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import adminNotifikasi_findRouterDonasi from "../../notifikasi/route_setting/donasi";
import { adminNotifikasi_findRouterEvent } from "../../notifikasi/route_setting/event";
import adminNotifikasi_findRouterForum from "../../notifikasi/route_setting/forum";
import adminNotifikasi_findRouterInvestasi from "../../notifikasi/route_setting/investasi";
import { adminNotifikasi_findRouterJob } from "../../notifikasi/route_setting/job";
import {
  IAdmin_ActiveChildId,
  IAdmin_ActivePage,
} from "../../notifikasi/route_setting/type_of_select_page";
import { adminNotifikasi_findRouterVoting } from "../../notifikasi/route_setting/voting";

export default function Admin_V3_ComponentCardNotifikasi({
  data,
  activePage,
  onChangeNavbar,
  onToggleNavbar,
  onLoadCountNotif,
  //   onLoadDataNotifikasi,
}: {
  data: MODEL_NOTIFIKASI;
  activePage: number;
  onChangeNavbar: (val: {
    id: IAdmin_ActivePage;
    childId: IAdmin_ActiveChildId;
  }) => void;
  onToggleNavbar: (val: any) => void;
  onLoadCountNotif: (val: boolean) => void;
  //   onLoadDataNotifikasi: (val: any) => void;
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
    try {
      setVisible(true);

      if (data?.kategoriApp === "JOB") {
        setDataId(data.id);

        const checkJob = await adminNotifikasi_findRouterJob({
          appId: data.appId,
          notifikasiId: data.id,
          router: router,
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
          onLoadCountNotif(true);
        }

        return;
      }
      // ========================== JOB ========================== //

      // ========================== FORUM ==============================//

      if (data.kategoriApp === "FORUM") {
        setDataId(data.id);

        const checkForum = await adminNotifikasi_findRouterForum({
          data: data,
          router: router,
          onChangeNavbar(val) {
            onChangeNavbar(val);
          },
        });

        if (checkForum !== "") {
          router.push(checkForum);
          setDataId("");
          setVisible(false);
          onToggleNavbar(false);
          onLoadCountNotif(true);
        } else {
          ComponentAdminGlobal_NotifikasiPeringatan("Gagal memuat forum");
        }
      }
      // ========================== FORUM ==============================//

      // ========================== EVENT ========================== //

      if (data.kategoriApp == "EVENT") {
        setDataId(data.id);

        const checkEvent = await adminNotifikasi_findRouterEvent({
          appId: data.appId,
          notifikasiId: data.id,
          router: router,
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
          onLoadCountNotif(true);
        }

        return;
      }
      // ========================== EVENT ========================== //

      // ========================== VOTING ========================== //

      if (data.kategoriApp == "VOTING") {
        setDataId(data.id);

        const checkVoting = await adminNotifikasi_findRouterVoting({
          router: router,
          appId: data.appId,
          notifikasiId: data.id,
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
          onLoadCountNotif(true);
        }

        return;
      }
      // ========================== VOTING ========================== //

      // ========================== DONASI ========================== //

      if (data.kategoriApp == "DONASI") {
        setDataId(data.id);

        const checkDonasi = await adminNotifikasi_findRouterDonasi({
          appId: data.appId,
          notifikasiId: data.id,
          router: router,
          status: data.status as ITypeStatusNotifikasi,
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
          onLoadCountNotif(true);
        }

        return;
      }

      // ========================== DONASI ========================== //

      // ========================== INVESTASI ========================== //

      if (data.kategoriApp == "INVESTASI") {
        setDataId(data.id);

        const checkInvestasi = await adminNotifikasi_findRouterInvestasi({
          appId: data.appId,
          notifikasiId: data.id,
          status: data.status as ITypeStatusNotifikasi,
          router: router,
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
          onLoadCountNotif(true);
        }

        return;
      }

      // ========================== INVESTASI ========================== //
    } catch (error) {
      clientLogger.error("Error notifikasi function", error);
    } finally {
      setVisible(false);
    }
  }

  return (
    <>
      <Card
        style={{
          transition: "0.5s",
          cursor: "pointer",
        }}
        mb={"15px"}
        c={data.isRead ? "gray" : "white"}
        key={data.id}
        bg={data.isRead ? AccentColor.blackgray : AccentColor.darkblue}
        sx={{
          borderColor: AccentColor.blue,
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "10px",
          ":hover": {
            // backgroundColor: AccentColor.blue,
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
              <Group>
                <IconSpeakerphone size={15} color="white" />
                <Text fw={"bold"} fz={10}>
                  {data.kategoriApp}
                </Text>
              </Group>
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
            <Text lineClamp={2} fw={"bold"}>
              {data.title}
            </Text>
            {/* <Text lineClamp={2} fz={"xs"}>
              {data.pesan}
            </Text> */}
          </Stack>
        </Card.Section>
        <Card.Section p={"sm"}>
          <Group position="apart">
            <Text fz={10} color="gray">
              {moment(data.createdAt).format("LLL")}
            </Text>
            {/* <Text fz={10}>
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "long",
              }).format(data.createdAt)}

              <Text span inherit fz={10}>
                {", "}
                {new Intl.DateTimeFormat("id-ID", {
                  timeStyle: "short",
                }).format(data.createdAt)}
              </Text>
            </Text> */}
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
