import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Investasi_UiDetailBerita } from "@/app_modules/investasi/_ui";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Investasi_UiDetailBerita userLoginId={userLoginId} />
    </>
  );
}
