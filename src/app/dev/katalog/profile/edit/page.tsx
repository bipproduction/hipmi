import prisma from "@/app/lib/prisma";
import { EditProfile } from "@/app_modules/katalog";
import { getDataProfile } from "@/app_modules/katalog/profile/fun/get-profile";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";

export default async function Page() {
  const c = cookies().get("session");
  const token = !c
    ? null
    : JSON.parse(
        await unsealData(c.value as string, {
          password: process.env.PWD as string,
        })
      );

  // console.log(token.id)

  const data = await getDataProfile(token.id);

  const dataUser = data.dataUser
  const dataProfile = data.dataProfile
 
  return (
    <>
      {/* {JSON.stringify(data)}  */}
      <EditProfile dataUser={dataUser} dataProfile={dataProfile} />
    </>
  );
}
