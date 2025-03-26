import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { IRealtimeData } from "@/lib/global_state";
import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBan, IconCircleCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { Admin_ComponentModal } from "../../_admin_global/_component/comp_admin_modal";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import AdminEvent_ComponentDetailData from "../_component/comp_detail_data";
import { AdminEvent_funEditCatatanById } from "../fun/edit/fun_edit_status_reject_by_id";
import { event_checkStatus } from "@/app_modules/event/fun/get/fun_check_status_by_id";
import moment from "moment";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { AdminEvent_funEditStatusPublishById } from "../fun/edit/fun_edit_status_publish_by_id";

export function AdminEvent_ViewDetailReview({ data }: { data: MODEL_EVENT }) {
  const router = useRouter();
  const [openedReject, { open: openReject, close: closeReject }] =
    useDisclosure();
  const [openedPublish, { open: openPublish, close: closePublish }] =
    useDisclosure();
  const [catatan, setCatatan] = useState("");
  const [isLoadingReject, setLoadingReject] = useState(false);
  const [isLoadingPublish, setLoadingPublish] = useState(false);

  async function handleReject() {
    if (catatan === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Catatan");

    try {
      const body = {
        id: data.id,
        catatan: catatan,
      };

      setLoadingReject(true);
      const res = await AdminEvent_funEditCatatanById(body as any, "4");
      if (res.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as any,
          status: res.data?.EventMaster_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "EVENT",
          title: "Event reject",
        };

        const notif = await adminNotifikasi_funCreateToUser({
          data: dataNotifikasi as any,
        });

        if (notif.status === 201) {
          WibuRealtime.setData({
            type: "notification",
            pushNotificationTo: "USER",
            dataMessage: dataNotifikasi,
          });
        }

        ComponentGlobal_NotifikasiBerhasil(res.message);
        closeReject();
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      console.log("Error reject event", error);
    } finally {
      setLoadingReject(false);
    }
  }

  async function handlePublish() {
    try {
      setLoadingPublish(true);
      const checkStatus = await event_checkStatus({ id: data.id });

      if (checkStatus) {
        if (moment(data.tanggal).diff(Date.now(), "minutes") < 0)
          return ComponentGlobal_NotifikasiPeringatan(
            "Waktu acara telah lewat, Report untuk memberitahu user !"
          );

        const res = await AdminEvent_funEditStatusPublishById(data.id, "1");
        if (res.status === 200) {
          const dataNotifikasi: IRealtimeData = {
            appId: res.data?.id as any,
            status: res.data?.EventMaster_Status?.name as any,
            userId: res.data?.authorId as any,
            pesan: res.data?.title as any,
            kategoriApp: "EVENT",
            title: "Event publish",
          };

          const notif = await adminNotifikasi_funCreateToUser({
            data: dataNotifikasi as any,
          });

          if (notif.status === 201) {
            WibuRealtime.setData({
              type: "notification",
              pushNotificationTo: "USER",
              dataMessage: dataNotifikasi,
            });

            WibuRealtime.setData({
              type: "trigger",
              pushNotificationTo: "USER",
              dataMessage: dataNotifikasi,
            });
          }
          closePublish();
          ComponentAdminGlobal_NotifikasiBerhasil("Berhasil update status");
          router.back();
        } else {
          closePublish();
          ComponentAdminGlobal_NotifikasiGagal(res.message);
        }
      } else {
        closePublish();
        ComponentAdminGlobal_NotifikasiPeringatan(
          "Review di batalkan oleh user, reload halaman review !"
        );
      }
    } catch (error) {
      console.log("Error publish event", error);
    } finally {
      setLoadingPublish(false);
    }
  }

  return (
    <>
      <Admin_ComponentBoxStyle>
        <Stack>
          <AdminEvent_ComponentDetailData data={data} />

          <Group mt={100} spacing={"xl"} position="center">
            <Button
              color={"green"}
              leftIcon={<IconCircleCheck />}
              radius={"xl"}
              onClick={openPublish}
            >
              Publish
            </Button>

            <Button
              color={"red"}
              leftIcon={<IconBan />}
              radius={"xl"}
              onClick={openReject}
            >
              Reject
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentBoxStyle>

      {/* MODAL REJECT */}
      <Admin_ComponentModal
        title="Masukan Alasan Penolakan"
        opened={openedReject}
        onClose={closeReject}
      >
        <Stack>
          <Textarea
            minRows={2}
            maxRows={5}
            maxLength={300}
            autosize
            placeholder="Contoh: Karena deskripsi kurang lengkap, dll"
            onChange={(val) => {
              setCatatan(val.target.value);
            }}
          />
          <Group position="right">
            <Button radius={"xl"} onClick={closeReject}>
              Batal
            </Button>
            <Button
              loading={isLoadingReject}
              loaderPosition="center"
              color="green"
              radius={"xl"}
              onClick={() => {
                handleReject();
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentModal>

      {/* MODAL PUBLISH */}
      <Admin_ComponentModal
        title="Anda Yakin Ingin Mempublish Event Ini ?"
        opened={openedPublish}
        onClose={closePublish}
      >
        <Stack>
          <Group position="center">
            <Button radius={"xl"} onClick={closePublish}>
              Batal
            </Button>
            <Button
              loading={isLoadingPublish}
              loaderPosition="center"
              color="green"
              radius={"xl"}
              onClick={() => {
                handlePublish();
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentModal>
    </>
  );
}
