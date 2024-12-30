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

export function Portofolio_ComponentButtonSelanjutnya({
  profileId,
  dataPortofolio,
  dataMedsos,
  imageId,
}: {
  profileId: string;
  dataPortofolio: MODEL_PORTOFOLIO_OLD;
  dataMedsos: any;
  imageId: string
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    const porto = {
      namaBisnis: dataPortofolio.namaBisnis,
      masterBidangBisnisId: dataPortofolio.masterBidangBisnisId,
      alamatKantor: dataPortofolio.alamatKantor,
      tlpn: dataPortofolio.tlpn,
      deskripsi: dataPortofolio.deskripsi,
    };

    try {
      setLoading(true);
      if (_.values(porto).includes("")) {
        return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
      }
      const res = await funCreatePortofolio({
        profileId: profileId,
        data: dataPortofolio as any,
        medsos: dataMedsos,
        fileId: imageId,
      });
      if (res.status === 201) {
        ComponentGlobal_NotifikasiBerhasil("Berhasil disimpan");
        router.replace(RouterMap.create + res.id, { scroll: false });
      } else {
        ComponentGlobal_NotifikasiGagal("Gagal disimpan");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Button
        disabled={_.values(dataPortofolio).includes("") || imageId == ""}
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
