import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Colab_MainDetail } from "@/app_modules/colab";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Colab_MainDetail
        userLoginId={userLoginId as string}
      />
    </>
  );
}
