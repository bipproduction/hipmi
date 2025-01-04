import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import WaitingRoom_View from "@/app_modules/waiting_room/view";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <WaitingRoom_View userLoginId={userLoginId as string} />
    </>
  );
}
