import { clientLogger } from "@/util/clientLogger";
import { MAX_SIZE } from "../../lib";
import { PemberitahuanMaksimalFile } from "../../lib/maximal_setting";
import { ComponentGlobal_NotifikasiPeringatan } from "../../notif_global";
import { funDeteleteFileById } from "../delete/fun_delete_file_by_id";
import { funUploadFileToStorage } from "./fun_upload_to_storage";

export async function funValidasiUploadCreatedFile({
  files,
  dirId,
  fileId,
  onSetFileId,
  onSetImageBuffer,
}: {
  files: any | null;
  dirId: string;
  fileId: string;
  onSetFileId: (val: string) => void;
  onSetImageBuffer: (val: any | null) => void;
}) {
  try {
    const buffer = URL.createObjectURL(
      new Blob([new Uint8Array(await files.arrayBuffer())])
    );

    if (files.size > MAX_SIZE) {
      ComponentGlobal_NotifikasiPeringatan(PemberitahuanMaksimalFile);
      onSetImageBuffer(null);

      return false;
    }

    if (fileId != "") {
      const deleteFotoProfile = await funDeteleteFileById({
        fileId: fileId,
        dirId: dirId,
      });

      if (!deleteFotoProfile.success) {
        console.log(
          `Client failed delete ${dirId}:` + deleteFotoProfile.message
        );
        onSetImageBuffer(null);

        return false;
      }

      if (deleteFotoProfile.success) {
        onSetFileId("");
        onSetImageBuffer(null);

        const uploadPhoto = await funUploadFileToStorage({
          file: files,
          dirId: dirId,
        });

        if (!uploadPhoto.success) {
          clientLogger.error(
            `Client failed upload ${dirId}:` + uploadPhoto.message
          );
          return false;
        }

        if (uploadPhoto.success) {
          clientLogger.info(`Client success upload ${dirId}`);
          onSetFileId("");
          onSetImageBuffer(buffer);

          return true;
        } else {
          clientLogger.error("Client failed upload foto:", uploadPhoto.message);
          ComponentGlobal_NotifikasiPeringatan(`Gagal upload ${dirId}`);
        }
      }
    } else {
      const uploadPhoto = await funUploadFileToStorage({
        file: files,
        dirId: dirId,
      });

      if (!uploadPhoto.success) {
        clientLogger.error(
          `Client failed upload ${dirId}:` + uploadPhoto.message
        );
        return false;
      }

      if (uploadPhoto.success) {
        clientLogger.info(`Client success upload ${dirId}`);
        onSetFileId("");
        onSetImageBuffer(buffer);

        return true;
      } else {
        clientLogger.error("Client failed upload foto:", uploadPhoto.message);
        ComponentGlobal_NotifikasiPeringatan(`Gagal upload ${dirId}`);

        return false;
      }
    }
  } catch (error) {
    console.log(error);

    return false;
  }
}
