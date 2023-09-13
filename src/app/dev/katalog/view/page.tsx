import prisma from "@/app/lib/prisma";
import { ViewProfile } from "@/app_modules/katalog";
import { getDataProfile } from "@/app_modules/katalog/profile/fun/get-profile";
import { unsealData } from "iron-session";
import { atom } from "jotai";
import { cookies } from "next/headers";
import toast from "react-simple-toasts";

export default async function Page() {
  const c = cookies().get("session");
  const token = !c
    ? null
    : JSON.parse(
        await unsealData(c.value as string, {
          password: process.env.PWD as string,
        })
      );

  const data = await getDataProfile(token.id);

  const dataUser = data.dataUser
  const dataProfile = data.dataProfile

  return (
    <>
      {/* {JSON.stringify(data, null,2)} */}
      <ViewProfile dataUser={dataUser} dataProfile={dataProfile} />
    </>
  );
}
