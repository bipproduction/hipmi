import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import UiEvent_V2_Konfirmasi from "@/app_modules/event/_ui/V2_konfirmasi";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      {/* <Ui_Konfirmasi userLoginId={userLoginId as string} /> */}
      <UiEvent_V2_Konfirmasi userLoginId={userLoginId as string} />
    </>
  );
}
