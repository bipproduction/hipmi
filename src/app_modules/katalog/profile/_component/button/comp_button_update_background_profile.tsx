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
import { profile_funUpdateBackground } from "../../fun/update/fun_update_background";

export function Profile_ComponentButtonUpdateBackgroundProfile({
  file,
  profileId,
  fileId,
}: {
  file: File;
  profileId: string;
  fileId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onUpdate() {
    try {
      setLoading(true);
      const deletePhoto = await funGlobal_DeleteFileById({
        fileId: fileId,
        dirId: DIRECTORY_ID.profile_background,
      });

      if (!deletePhoto.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal update background");
        return;
      }

      const uploadFile = await funGlobal_UploadToStorage({
        file: file,
        dirId: DIRECTORY_ID.profile_background,
      });

      if (!uploadFile.success) {
        setLoading(false);
        return ComponentGlobal_NotifikasiPeringatan(
          "Gagal upload background"
        );
      }

      const res = await profile_funUpdateBackground({
        profileId: profileId,
        fileId: uploadFile.data.id,
      });

      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(res.message);
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      clientLogger.error("Error upload background", error);
    } finally {
      setLoading(false);
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
          loading={loading ? true : false}
          loaderPosition="center"
          radius={"xl"}
          onClick={() => onUpdate()}
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
