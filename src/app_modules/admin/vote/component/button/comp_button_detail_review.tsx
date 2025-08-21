import { MainColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { IRealtimeData } from "@/lib/global_state";
import { Button, Group, Modal, Stack, Textarea, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBan, IconCheck } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { AdminVote_funEditStatusPublishById } from "../../fun/edit/fun_edit_status_publish_by_id";
import { AdminEvent_funEditCatatanById } from "../../fun/edit/fun_edit_status_reject_by_id";

interface Props {
  data: MODEL_VOTING;
}

export function AdminVoting_ComponentDetailReviewButton({ data }: Props) {
  const router = useRouter();
  const [openedReject, { open: openReject, close: closeReject }] =
    useDisclosure(false);
  const [openedPublish, { open: openPublish, close: closePublish }] =
    useDisclosure(false);
  const [catatan, setCatatan] = useState("");
  const [isLoadingPublish, setLoadingPublish] = useState(false);
  const [isLoadingReject, setLoadingReject] = useState(false);

  async function handlePublish() {
    const hariIni = new Date();
    const cekHari = moment(data.awalVote).diff(hariIni, "days");

    if (cekHari < 0)
      return ComponentGlobal_NotifikasiPeringatan("Tanggal Voting Lewat");

    try {
      setLoadingPublish(true);
      const res = await AdminVote_funEditStatusPublishById(data.id);
      if (res.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as string,
          status: res.data?.Voting_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "VOTING",
          title: "Voting publish",
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

        ComponentGlobal_NotifikasiBerhasil(res.message);
        closePublish();
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      console.log("Error get data voting", error);
      setLoadingPublish(false);
    }
  }

  async function handleReject() {
    const fixData = {
      id: data.id,
      catatan: catatan,
    };

    try {
      setLoadingReject(true);
      const res = await AdminEvent_funEditCatatanById(fixData as any);
      if (res.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as string,
          status: res.data?.Voting_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "VOTING",
          title: "Voting anda di tolak !",
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
      setLoadingReject(false);
      console.error("Error update voting admin", error);
    }
  }

  return (
    <>
      <Group position="center" mt={100}>
        <Button
          color="green"
          leftIcon={<IconCheck />}
          radius={"xl"}
          onClick={() => {
            openPublish();
          }}
        >
          Publish
        </Button>
        <Button
          color="red"
          leftIcon={<IconBan />}
          radius={"xl"}
          onClick={() => {
            openReject();
          }}
        >
          Reject
        </Button>
      </Group>

      {/* MODEL PUBLISH */}
      <Modal
        styles={{ body: { backgroundColor: AdminColor.softBlue } }}
        opened={openedPublish}
        onClose={closePublish}
        centered
        withCloseButton={false}
        size={"md"}
      >
        <Stack align="center">
          <Title c={AdminColor.white} order={5}>
            Apakah anda yakin ingin mempublish vote ini?
          </Title>
          <Group position="center">
            <Button radius={"xl"} onClick={() => closePublish()}>
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={isLoadingPublish}
              radius={"xl"}
              onClick={() => {
                handlePublish();
              }}
              style={{
                backgroundColor: MainColor.green,
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* MODEL REJECT */}
      <Modal
        styles={{ body: { backgroundColor: AdminColor.softBlue } }}
        opened={openedReject}
        onClose={closeReject}
        centered
        withCloseButton={false}
        size={"md"}
      >
        <Stack>
          <Textarea
            styles={{ label: { color: AdminColor.white } }}
            minRows={2}
            maxRows={5}
            maxLength={300}
            autosize
            label="Masukan Alasan Penolakan"
            placeholder="Contoh: Karena deskripsi kurang lengkap, dll"
            onChange={(val) => {
              setCatatan(val.target.value);
            }}
          />
          <Group position="right">
            <Button radius={"xl"} onClick={() => closeReject()}>
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={isLoadingReject}
              radius={"xl"}
              onClick={() => {
                handleReject();
              }}
              style={{
                backgroundColor: MainColor.green,
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
