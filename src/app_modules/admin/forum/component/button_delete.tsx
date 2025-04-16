"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { Modal, Stack, Title, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { adminForum_funDeletePostingById } from "../fun/delete/fun_delete_posting_by_id";
import { Admin_ComponentModal } from "../../_admin_global/_component/comp_admin_modal";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";

export default function ComponentAdminForum_ButtonDeletePosting({
  postingId,
  onSuccesDelete,
}: {
  postingId: string;
  onSuccesDelete: (val: any) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [loadingDel2, setLoadingDel2] = useState(false);

  async function onDelete() {
    try {
      setLoadingDel2(true);

      await adminForum_funDeletePostingById(postingId).then((res) => {
        if (res.status === 200) {
          setLoadingDel2(false);
          ComponentAdminGlobal_NotifikasiBerhasil(res.message);
          onSuccesDelete(true);
        } else {
          ComponentAdminGlobal_NotifikasiPeringatan(res.message);
        }
      });
    } catch (error) {
      console.log("error delete", error);
      ComponentAdminGlobal_NotifikasiGagal(
        "Terjadi kesalahan, silahkan coba lagi"
      );
    } finally {
      close();
      setLoadingDel2(false);
    }
  }
  return (
    <>
      <Admin_ComponentModal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack>
          <Title order={5} c={AdminColor.white}>
            Anda yakin menghapus posting ini ?
          </Title>
          <Group position="center">
            <Button
              radius={"xl"}
              onClick={() => {
                close();
              }}
            >
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={loadingDel2}
              radius={"xl"}
              color="red"
              onClick={() => {
                onDelete();
              }}
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentModal>
      <Button
        fz={"xs"}
        loaderPosition="center"
        radius={"xl"}
        w={170}
        color="red"
        leftIcon={<IconTrash size={15} />}
        onClick={() => {
          // onDelete();
          open();
        }}
      >
        Hapus Posting
      </Button>
    </>
  );
}
