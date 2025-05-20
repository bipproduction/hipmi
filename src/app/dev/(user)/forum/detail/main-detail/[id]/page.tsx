import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import Forum_V3_MainDetail from "@/app_modules/forum/detail/v3_main_detail";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();
  return (
    <>
      <Forum_V3_MainDetail userLoginId={userLoginId as string} />
    </>
  );
}
