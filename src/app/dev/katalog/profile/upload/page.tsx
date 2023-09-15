import { UploadFoto } from "@/app_modules/katalog";
import { getFotoProfile } from "@/app_modules/katalog/profile/fun/get-foto";
import { getDataProfile } from "@/app_modules/katalog/profile/fun/get-profile";
import { gs_Profile } from "@/app_modules/katalog/profile/state/s_profile";
import { Image } from "@mantine/core";
import { unsealData } from "iron-session";
import { atom } from "jotai";
import { cookies } from "next/headers";

export default async function Page() {
  return (
    <>
      {/* {JSON.stringify(imgUrl)} */}
      <UploadFoto />
    </>
  );
}
