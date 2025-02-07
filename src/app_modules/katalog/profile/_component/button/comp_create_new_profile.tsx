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
import { apiCreateProfile } from "../../lib/api_fetch_profile";
import { MODEL_PROFILE } from "../../model/interface";
import funCreateNewProfile from "../../fun/fun_create_profile";

interface CreateProfileData {
  name: string;
  email: string;
  alamat: string;
  jenisKelamin: string;
  imageId: string;
  imageBackgroundId: string;
}

interface ProfileComponentProps {
  value: MODEL_PROFILE;
  filePP: File | null;
  fileBG: File | null;
}

export function Profile_ComponentCreateNewProfile({
  value,
  filePP,
  fileBG,
}: ProfileComponentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validateData = (): string | null => {
    if (_.values(value).some((val) => !val)) {
      return "Lengkapi Data";
    }
    if (!emailRegex.test(value.email)) {
      return "Format email salah";
    }
    if (!filePP) {
      return "Lengkapi foto profile";
    }
    if (!fileBG) {
      return "Lengkapi background profile";
    }
    return null;
  };

  const uploadImages = async (): Promise<{
    photoId: string;
    backgroundId: string;
  } | null> => {
    const uploadPhoto = await funGlobal_UploadToStorage({
      file: filePP!,
      dirId: DIRECTORY_ID.profile_foto,
    });

    if (!uploadPhoto.success) {
      throw new Error("Gagal upload foto profile");
    }

    const uploadBackground = await funGlobal_UploadToStorage({
      file: fileBG!,
      dirId: DIRECTORY_ID.profile_background,
    });

    if (!uploadBackground.success) {
      throw new Error("Gagal upload background profile");
    }

    return {
      photoId: uploadPhoto.data.id,
      backgroundId: uploadBackground.data.id,
    };
  };


  const handleSubmit = async () => {
    try {
      const validationError = validateData();
      if (validationError) {
        ComponentGlobal_NotifikasiPeringatan(validationError);
        return;
      }

      setLoading(true);

      const uploadedImages = await uploadImages();
      if (!uploadedImages) {
        return;
      }

      const profileData: CreateProfileData = {
        name: value.name,
        email: value.email,
        alamat: value.alamat,
        jenisKelamin: value.jenisKelamin,
        imageId: uploadedImages.photoId,
        imageBackgroundId: uploadedImages.backgroundId,
      };

      const response = await apiCreateProfile({ data: profileData as any});

      if (response.success) {
        ComponentGlobal_NotifikasiBerhasil("Berhasil membuat profile", 3000);
        router.replace(RouterHome.main_home, { scroll: false });
      } else {
        ComponentGlobal_NotifikasiPeringatan(response.message);
      }
    } catch (error) {
      clientLogger.error("Error create new profile:", error);
      ComponentGlobal_NotifikasiGagal(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat membuat profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // async function onSubmit() {
  //   if (_.values(value).includes(""))
  //     return ComponentGlobal_NotifikasiPeringatan("Lengkapi Data");
  //   if (!value.email.match(emailRegex))
  //     return ComponentGlobal_NotifikasiPeringatan("Format email salah");

  //   if (filePP == null)
  //     return ComponentGlobal_NotifikasiPeringatan("Lengkapi foto profile");
  //   if (fileBG == null)
  //     return ComponentGlobal_NotifikasiPeringatan(
  //       "Lengkapi background profile"
  //     );

  //   try {
  //     setLoading(true);

  //     const uploadPhoto = await funGlobal_UploadToStorage({
  //       file: filePP,
  //       dirId: DIRECTORY_ID.profile_foto,
  //     });
  //     if (!uploadPhoto.success) {
  //       setLoading(false);
  //       ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
  //       return;
  //     }

  //     const uploadBackground = await funGlobal_UploadToStorage({
  //       file: fileBG,
  //       dirId: DIRECTORY_ID.profile_background,
  //     });
  //     if (!uploadBackground.success) {
  //       setLoading(false);
  //       ComponentGlobal_NotifikasiPeringatan("Gagal upload gambar");
  //       return;
  //     }

  //     const newData: CreateProfileData = {
  //       name: value.name,
  //       email: value.email,
  //       alamat: value.alamat,
  //       jenisKelamin: value.jenisKelamin,
  //       imageId: uploadPhoto.data.id,
  //       imageBackgroundId: uploadBackground.data.id,
  //     };

  //     const respone = await apiCreateProfile({
  //       data: newData as any,
  //     });

  //     if (respone && respone.success) {
  //       console.log(respone.data);
  //       ComponentGlobal_NotifikasiBerhasil("Berhasil membuat profile", 3000);
  //       router.replace(RouterHome.main_home, { scroll: false });
  //     } else {
  //       setLoading(false);
  //       ComponentGlobal_NotifikasiPeringatan(respone.message);
  //     }

  //     // const create = await funCreateNewProfile({
  //     //   data: fixData as any,
  //     //   imageId: uploadPhoto.data.id,
  //     //   imageBackgroundId: uploadBackground.data.id,
  //     // });

  //     // if (create.status === 201) {
  //     //   ComponentGlobal_NotifikasiBerhasil("Berhasil membuat profile", 3000);
  //     //   router.replace(RouterHome.main_home, { scroll: false });
  //     // }

  //     // if (create.status === 400) {
  //     //   setLoading(false);
  //     //   ComponentGlobal_NotifikasiGagal(create.message);
  //     // }

  //     // if (create.status === 500) {
  //     //   setLoading(false);
  //     //   ComponentGlobal_NotifikasiGagal(create.message);
  //     // }
  //   } catch (error) {
  //     setLoading(false);
  //     clientLogger.error("Error create new profile:", error);
  //   }
  // }

  return (
    <>
      <Button
        loading={loading}
        loaderPosition="center"
        mt={"md"}
        radius={50}
        bg={MainColor.yellow}
        color="yellow"
        onClick={() => {
          // onSubmit();
          handleSubmit();
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
