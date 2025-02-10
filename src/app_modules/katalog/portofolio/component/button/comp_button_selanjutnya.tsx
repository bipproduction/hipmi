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

import { DIRECTORY_ID } from "@/app/lib";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import { clientLogger } from "@/util/clientLogger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import funCreatePortofolio from "../../fun/fun_create_portofolio";
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

  async function onSubmit() {
    if (_.values(dataPortofolio).includes("")) {
      ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
      return;
    }

    if (dataPortofolio.tlpn.length < 10) {
      ComponentGlobal_NotifikasiPeringatan("Nomor telepon minimal 10 angka");
      return;
    }

    try {
      setLoading(true);

      const uploadFile = await funGlobal_UploadToStorage({
        file: file,
        dirId: DIRECTORY_ID.portofolio_logo,
      });

      if (!uploadFile.success) {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
        return;
      }

      const fileId = uploadFile.data.id;

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

      // const responeCreated = await apiCreatePortofolio({
      //   data: newData,
      // });

      // if (responeCreated.success) {
      //   ComponentGlobal_NotifikasiBerhasil("Berhasil disimpan");
      //   router.replace(RouterMap.create + responeCreated.id, { scroll: false });
      // }

      const res = await funCreatePortofolio({
        profileId: profileId,
        data: dataPortofolio as any,
        medsos: dataMedsos,
        fileId: fileId,
      });
      if (res.status === 201) {
        ComponentGlobal_NotifikasiBerhasil("Berhasil disimpan");
        router.replace(RouterMap.create + res.id, { scroll: false });
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal("Gagal disimpan");
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error create portofolio", error);
    }
  }
  return (
    <>
      <Button
        disabled={_.values(dataPortofolio).includes("") || file === null}
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
