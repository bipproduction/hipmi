import { RouterMap } from "@/lib/router_hipmi/router_map";
import { MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { MODEL_PORTOFOLIO_OLD } from "@/app_modules/model_global/portofolio";
import { Button } from "@mantine/core";
import _ from "lodash";

import { DIRECTORY_ID } from "@/lib";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { clientLogger } from "@/util/clientLogger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiCreatePortofolio } from "../api_fetch_portofolio";

interface ICreatePortofolio {
  namaBisnis: string;
  masterBidangBisnisId: string;
  alamatKantor: string;
  tlpn: string;
  deskripsi: string;
  fileId: string;
  facebook: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

export function Portofolio_ComponentButtonSelanjutnya({
  profileId,
  dataPortofolio,
  dataMedsos,
  file,
}: {
  profileId: string;
  dataPortofolio: MODEL_PORTOFOLIO_OLD;
  dataMedsos: any;
  file: File;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validateData = () => {
    if (_.includes(_.values(dataPortofolio), "")) {
      ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
      return false;
    }

    if (dataPortofolio.tlpn.length < 10) {
      ComponentGlobal_NotifikasiPeringatan("Nomor telepon minimal 10 angka");
      return false;
    }

    return true;
  };

  const handleCreatePortofolio = async (fileId: string) => {
    const newData: ICreatePortofolio = {
      namaBisnis: dataPortofolio.namaBisnis,
      masterBidangBisnisId: dataPortofolio.masterBidangBisnisId,
      alamatKantor: dataPortofolio.alamatKantor,
      tlpn: dataPortofolio.tlpn,
      deskripsi: dataPortofolio.deskripsi,
      facebook: dataMedsos.facebook,
      twitter: dataMedsos.twitter,
      instagram: dataMedsos.instagram,
      tiktok: dataMedsos.tiktok,
      youtube: dataMedsos.youtube,
      fileId: fileId,
    };

    const response = await apiCreatePortofolio({
      profileId: profileId,
      data: newData,
    });

    if (response.success) {
      ComponentGlobal_NotifikasiBerhasil("Berhasil disimpan");
      router.replace(RouterMap.create + response.data.id, { scroll: false });
    } else {
      setLoading(false);
      throw new Error("Failed to create portfolio");
    }
  };

  const onSubmit = async () => {
    if (!validateData()) return;

    try {
      setLoading(true);

      const uploadFile = await funGlobal_UploadToStorage({
        file: file,
        dirId: DIRECTORY_ID.portofolio_logo,
      });

      if (!uploadFile.success) {
        ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
        return;
      }

      await handleCreatePortofolio(uploadFile.data.id);
    } catch (error) {
      setLoading(false);
      ComponentGlobal_NotifikasiGagal("Gagal disimpan");
      clientLogger.error("Error create portofolio", error);
    }
  };

  return (
    <>
      <Button
        disabled={_.values(dataPortofolio).includes("") || !file}
        mt={"md"}
        radius={50}
        loading={loading}
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
