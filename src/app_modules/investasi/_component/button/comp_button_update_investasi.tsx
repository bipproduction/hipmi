import { MainColor } from "@/app_modules/_global/color";
import { Button, Stack } from "@mantine/core";
import { MODEL_INVESTASI } from "../../_lib/interface";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { DIRECTORY_ID } from "@/app/lib";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import _ from "lodash";
import { investasi_funUpdateInvestasi } from "../../_fun";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Investasi_ComponentButtonUpdateDataInvestasi({
  data,
  file,
  totalLembar,
}: {
  data: MODEL_INVESTASI;
  file: File;
  totalLembar: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onUpdate() {
    setIsLoading(true);
    if (totalLembar === "0")
      return ComponentGlobal_NotifikasiPeringatan("Total lembar kosong");

    if (file !== null) {
      if (_.values(data).includes(""))
        return ComponentGlobal_NotifikasiPeringatan("Lengkapi data");

      const uploadImage = await funGlobal_UploadToStorage({
        file: file as any,
        dirId: DIRECTORY_ID.investasi_image,
      });
      if (!uploadImage.success) {
        setIsLoading(false);
        return ComponentGlobal_NotifikasiPeringatan("Gagal upload file gambar");
      }

      const updtWithImage = await investasi_funUpdateInvestasi({
        data: data,
        imageId: uploadImage.data.id,
        totalLembar: totalLembar,
      });

      if (updtWithImage.status === 200) {
        setIsLoading(false);
        router.back();
        return ComponentGlobal_NotifikasiBerhasil(updtWithImage.message);
      } else {
        setIsLoading(false);
        return ComponentGlobal_NotifikasiPeringatan(updtWithImage.message);
      }
    } else {
      const updtNoImage = await investasi_funUpdateInvestasi({
        data: data,
        totalLembar: totalLembar,
      });

      if (updtNoImage.status === 200) {
        setIsLoading(false);
        router.back();
        return ComponentGlobal_NotifikasiBerhasil(updtNoImage.message);
      } else {
        setIsLoading(false);
        return ComponentGlobal_NotifikasiPeringatan(updtNoImage.message);
      }
    }
  }
  return (
    <Stack>
      <Button
        loading={isLoading}
        loaderPosition="center"
        my={50}
        radius={50}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
        onClick={() => {
          onUpdate();
        }}
      >
        Update
      </Button>
    </Stack>
  );
}
