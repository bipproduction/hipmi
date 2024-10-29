import { MainColor, AccentColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { Modal, Stack, Title, Group, Button } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { job_EditById } from "../../fun/edit/fun_edit_by_id";
import { gs_job_hot_menu, gs_job_status } from "../../global_state";
import { MODEL_JOB } from "../../model/interface";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/app/lib";

export function Job_ComponentButtonUpdateData({
  value,
  file,
}: {
  value: MODEL_JOB;
  file: File;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [hotMenu, setHotMenu] = useAtom(gs_job_hot_menu);
  const [opened, { open, close }] = useDisclosure(false);
  const [scroll, scrollTo] = useWindowScroll();

  async function onUpdate() {
    if (file === null) {
      const update = await job_EditById({
        data: value,
      });
      if (update.status !== 200)
        return ComponentGlobal_NotifikasiGagal(update.message);
    } else {
      const uploadFile = await funGlobal_UploadToStorage({
        file: file,
        dirId: DIRECTORY_ID.job_image,
      });

      if (!uploadFile.success)
         return ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");

      const delFile = await funGlobal_DeleteFileById({
        fileId: value.imageId,
      });
      if (!delFile.success)
        ComponentGlobal_NotifikasiPeringatan("Gagal hapus gambar lama");

      const updateWithFile = await job_EditById({
        data: value,
        fileId: uploadFile.data.id,
      });
      if (updateWithFile.status !== 200)
        return ComponentGlobal_NotifikasiGagal(updateWithFile.message);
    }

    setHotMenu(2);
    setIsLoading(true);
    router.back();
    return ComponentGlobal_NotifikasiBerhasil("Berhasil Update");
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        styles={{
          content: {
            backgroundColor: MainColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
          },
        }}
      >
        <Stack>
          <Title order={6} c={"white"}>
            Anda yakin menyimpan data ini ?
          </Title>
          <Group position="center">
            <Button radius={"xl"} onClick={() => close()}>
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={isLoading ? true : false}
              color="teal"
              radius={"xl"}
              onClick={() => onUpdate()}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Button
        mt={"xs"}
        mb={"lg"}
        style={{
          transition: "0.5s",
        }}
        disabled={
          value.title === "" ||
          value.content === "" ||
          value.content === "<p><br></p>" ||
          value.content.length > 500 ||
          value.deskripsi === "" ||
          value.deskripsi === "<p><br></p>" ||
          value.deskripsi.length > 500
            ? true
            : false
        }
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        radius={"xl"}
        onClick={() => {
          open();
          scrollTo({ y: 0 });
        }}
      >
        Update
      </Button>
    </>
  );
}
