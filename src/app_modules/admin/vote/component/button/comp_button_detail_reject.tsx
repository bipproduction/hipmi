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
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import { AdminVote_funEditCatatanRejectById } from "../../fun/edit/fun_edit_catatan_reject_by_id";

interface Props {
  data: MODEL_VOTING;
  onUpdateData: (value: string) => void;
}

export function AdminVoting_ComponentDetailRejectButton({
  data,
  onUpdateData,
}: Props) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [catatan, setCatatan] = useState(data.catatan);
  const [isLoading, setLoading] = useState(false);
  const [newData, setNewData] = useState<MODEL_VOTING>(data);

  async function handleAddReportNote() {
    try {
      setLoading(true);
      const res = await AdminVote_funEditCatatanRejectById(data.id, catatan);
      if (res.status === 200) {

        onUpdateData(catatan);
        ComponentAdminGlobal_NotifikasiBerhasil(res.message);
        close();
      } else {
        ComponentAdminGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      console.log("Error get data voting review", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Group position="center" mt={70}>
        <Button
          color="red"
          leftIcon={<IconBan />}
          radius={"xl"}
          onClick={() => {
            open();
          }}
        >
          Tambah Catatan Report
        </Button>
      </Group>

      <Modal
        styles={{ body: { backgroundColor: AdminColor.softBlue } }}
        opened={opened}
        onClose={close}
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
            value={catatan}
            onChange={(val) => {
              setCatatan(val.target.value);
            }}
          />
          <Group position="right">
            <Button radius={"xl"} onClick={() => close()}>
              Batal
            </Button>
            <Button
              color="green"
              loading={isLoading}
              loaderPosition="center"
              radius={"xl"}
              onClick={() => {
                handleAddReportNote();
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
