"use client";

import { DIRECTORY_ID } from "@/app/lib";
import { MainColor } from "@/app_modules/_global/color";
import {
  funGlobal_DeleteFileById,
  funGlobal_UploadToStorage,
} from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { clientLogger } from "@/util/clientLogger";
import { Box, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { profile_funUpdatePhoto } from "../../fun";

export function Profile_ComponentButtonUpdatePhotoProfile({
  file,
  profileId,
  fileId,
}: {
  file: File;
  profileId: string;
  fileId: string;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  async function onUpdate() {
    try {
      setLoading(true);

      // Upload foto baru
      const uploadPhoto = await funGlobal_UploadToStorage({
        file: file,
        dirId: DIRECTORY_ID.profile_foto,
      });

      if (!uploadPhoto.success) {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload foto profile");
        return;
      }

      // Hapus gambar lama
      const deletePhoto = await funGlobal_DeleteFileById({
        fileId: fileId,
        dirId: DIRECTORY_ID.profile_foto,
      });

      if (!deletePhoto.success) {
        setLoading(false);
        clientLogger.error("Error delete logo", deletePhoto.message);
      }

      const res = await profile_funUpdatePhoto({
        fileId: uploadPhoto.data.id,
        profileId: profileId,
      });

      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.back();
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error update photo profile", error);
    }
  }
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          style={{
            transition: "all 0.3s ease",
            position: "absolute",
            bottom: 20,
            width: 300,
          }}
          disabled={file ? false : true}
          loading={isLoading ? true : false}
          loaderPosition="center"
          radius={"xl"}
          onClick={() => {
            onUpdate();
          }}
          bg={MainColor.yellow}
          color="yellow"
          c={"black"}
        >
          Update
        </Button>
      </Box>
    </>
  );
}
