import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { funGlobal_checkActivationUseById } from "@/app_modules/_global/fun/get/fun_check_activation_use_by_id";
import WaitingRoom_View from "@/app_modules/waiting_room/view";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();
  const activationUser = await funGlobal_checkActivationUseById({
    userId: userLoginId as string,
  });

  return (
    <>
      <WaitingRoom_View
        activationUser={activationUser as boolean}
        userLoginId={userLoginId as string}
      />
    </>
  );
}
