import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { CreateCeritaPenggalangDonasi } from "@/app_modules/donasi";
import { Donasi_getTemporaryCreate } from "@/app_modules/donasi/fun/get/get_temporary_create";

export default async function Page({ params }: { params: { id: string } }) {
  const getTemporaryCreate = await Donasi_getTemporaryCreate(params.id);
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <CreateCeritaPenggalangDonasi
        dataTemporary={getTemporaryCreate as any}
        userId={userLoginId as string}
      />
    </>
  );
}
