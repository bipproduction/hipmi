import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { MODEL_PORTOFOLIO_OLD } from "@/app_modules/model_global/portofolio";
import { Button } from "@mantine/core";
import _ from "lodash";

import { useRouter } from "next/navigation";
import { useState } from "react";
import funCreatePortofolio from "../../fun/fun_create_portofolio";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { DIRECTORY_ID } from "@/app/lib";

export function Portofolio_ComponentButtonSelanjutnya({
  profileId,
  dataPortofolio,
  file,
  dataMedsos,
}: {
  profileId: string;
  dataPortofolio: MODEL_PORTOFOLIO_OLD;
  file: File;
  dataMedsos: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    const porto = {
      namaBisnis: dataPortofolio.namaBisnis,
      masterBidangBisnisId: dataPortofolio.masterBidangBisnisId,
      alamatKantor: dataPortofolio.alamatKantor,
      tlpn: dataPortofolio.tlpn,
      deskripsi: dataPortofolio.deskripsi,
    };

    if (_.values(porto).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");

    const uploadFileToStorage = await funGlobal_UploadToStorage({
      file: file,
      dirId: DIRECTORY_ID.portofolio_logo,
    });

    if (!uploadFileToStorage.success)
      return ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");

    const res = await funCreatePortofolio({
      profileId: profileId,
      data: dataPortofolio as any,
      medsos: dataMedsos,
      fileId: uploadFileToStorage.data.id,
    });
    if (res.status === 201) {
      ComponentGlobal_NotifikasiBerhasil("Berhasil disimpan");
      router.replace(RouterMap.create + res.id, { scroll: false });
    } else {
      ComponentGlobal_NotifikasiGagal("Gagal disimpan");
    }
  }
  return (
    <>
      <Button
        disabled={_.values(dataPortofolio).includes("") || file === null}
        mt={"md"}
        radius={50}
        loading={loading ? true : false}
        loaderPosition="center"
        onClick={() => {
          onSubmit();
        }}
        bg={MainColor.yellow}
        color="yellow"
        c={"black"}
      >
        Selanjutnya
      </Button>
    </>
  );
}
