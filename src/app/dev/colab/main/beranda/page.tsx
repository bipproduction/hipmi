import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Colab_Beranda } from "@/app_modules/colab";

export default async function Page() {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Colab_Beranda userLoginId={userLoginId as string} />
    </>
  );
}
