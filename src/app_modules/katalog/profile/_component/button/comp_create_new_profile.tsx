"use client";

import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import { gmailRegex } from "@/app_modules/katalog/component/regular_expressions";
import { Button } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import funCreateNewProfile from "../../fun/fun_create_profile";
import { MODEL_PROFILE } from "../../model/interface";

export function Profile_ComponentCreateNewProfile({
  value,
  fotoProfileId,
  backgroundProfileId,
}: {
  value: MODEL_PROFILE;
  fotoProfileId: string;
  backgroundProfileId: string;
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
    if (!newData.email.match(gmailRegex))
      return ComponentGlobal_NotifikasiPeringatan("Format email salah");

    if (fotoProfileId == "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi foto profile");
    if (backgroundProfileId == null)
      return ComponentGlobal_NotifikasiPeringatan(
        "Lengkapi background profile"
      );

    try {
      setLoading(true);

      const create = await funCreateNewProfile({
        data: newData as any,
        imageId: fotoProfileId,
        imageBackgroundId: backgroundProfileId,
      });

      if (create.status === 201) {
        ComponentGlobal_NotifikasiBerhasil("Berhasil membuat profile", 3000);
        router.push(RouterHome.main_home, { scroll: false });
      }

      if (create.status === 400) {
        ComponentGlobal_NotifikasiGagal(create.message);
      }

      if (create.status === 500) {
        ComponentGlobal_NotifikasiGagal(create.message);
      }
    } catch (error) {
      console.log("Terjadi kesalahan", error);
    } finally {
      setLoading(false);
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
