import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Forum_Beranda } from "@/app_modules/forum";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Forum_Beranda userLoginId={userLoginId as string} />
    </>
  );
}
