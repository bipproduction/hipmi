import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Investasi_UiDetailMain } from "@/app_modules/investasi/_ui";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Investasi_UiDetailMain userLoginId={userLoginId as string} />
    </>
  );
}
