import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Notifikasi_UiMain } from "@/app_modules/notifikasi/_ui";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();
  return (
    <>
      <Notifikasi_UiMain userLoginId={userLoginId} />
    </>
  );
}
