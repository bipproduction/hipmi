"use client";

import { DIRECTORY_ID } from "@/app/lib";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { funGlobal_UploadToStorage } from "@/app_modules/_global/fun";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { emailRegex } from "@/app_modules/katalog/component/regular_expressions";
import { clientLogger } from "@/util/clientLogger";
import { Button } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import funCreateNewProfile from "../../fun/fun_create_profile";
import { MODEL_PROFILE } from "../../model/interface";

export function Profile_ComponentCreateNewProfile({
  value,
  filePP,
  fileBG,
}: {
  value: MODEL_PROFILE;
  filePP: File;
  fileBG: File;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    const newData = {
      name: value.name,
      email: value.email,
      alamat: value.alamat,
      jenisKelamin: value.jenisKelamin,
    };
    if (_.values(newData).includes(""))
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
    if (!newData.email.match(emailRegex))
      return ComponentGlobal_NotifikasiPeringatan("Format email salah");

    if (filePP == null)
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi foto profile");
    if (fileBG == null)
      return ComponentGlobal_NotifikasiPeringatan(
        "Lengkapi background profile"
      );

    try {
      setLoading(true);

      const uploadPhoto = await funGlobal_UploadToStorage({
        file: filePP,
        dirId: DIRECTORY_ID.profile_foto,
      });

      if (!uploadPhoto.success) {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
        return;
      }

      const uploadBackground = await funGlobal_UploadToStorage({
        file: fileBG,
        dirId: DIRECTORY_ID.profile_background,
      });

      if (!uploadBackground.success) {
        setLoading(false);
        ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
        return;
      }

      const create = await funCreateNewProfile({
        data: newData as any,
        imageId: uploadPhoto.data.id,
        imageBackgroundId: uploadBackground.data.id,
      });

      if (create.status === 201) {
        ComponentGlobal_NotifikasiBerhasil("Berhasil membuat profile", 3000);
        router.replace(RouterHome.main_home, { scroll: false });
      }

      if (create.status === 400) {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(create.message);
      }

      if (create.status === 500) {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(create.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error create new profile:", error);
    }
  }

  return (
    <>
      <Button
        loading={loading ? true : false}
        loaderPosition="center"
        mt={"md"}
        radius={50}
        bg={MainColor.yellow}
        color="yellow"
        onClick={() => {
          onSubmit();
        }}
        style={{
          border: `2px solid ${AccentColor.yellow}`,
          color: "black",
        }}
      >
        Simpan
      </Button>
    </>
  );
}
