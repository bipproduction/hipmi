import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Event_DetailMain } from "@/app_modules/event";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Event_DetailMain
        userLoginId={userLoginId as string}
      />
    </>
  );
}
