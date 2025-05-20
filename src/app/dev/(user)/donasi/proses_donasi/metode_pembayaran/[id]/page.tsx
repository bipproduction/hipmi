import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Donasi_MetodePembayaran } from "@/app_modules/donasi";
import { Donasi_getMasterBank } from "@/app_modules/donasi/fun/master/get_bank";

export default async function Page({ params }: { params: { id: string } }) {
  let donasiId = params.id;
  const listBank = await Donasi_getMasterBank();
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <Donasi_MetodePembayaran
        listBank={listBank}
        donasiId={donasiId}
        authorId={userLoginId as string}
      />
    </>
  );
}
