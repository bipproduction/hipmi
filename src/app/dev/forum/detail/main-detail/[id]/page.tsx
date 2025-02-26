import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import Forum_MainDetail from "@/app_modules/forum/detail/main_detail";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Forum_MainDetail userLoginId={userLoginId as string} />
    </>
  );
}
