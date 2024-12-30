import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Colab_MainDetail } from "@/app_modules/colab";
import colab_funCekPartisipasiById from "@/app_modules/colab/fun/get/cek_partisipasi_by_user_id";
import colab_getListPartisipanByColabId from "@/app_modules/colab/fun/get/get_list_partisipan_by_id";
import colab_getOneCollaborationById from "@/app_modules/colab/fun/get/get_one_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let colabId = params.id;
  const userLoginId = await funGetUserIdByToken();

  const dataColab = await colab_getOneCollaborationById(colabId);
  const listPartisipan = await colab_getListPartisipanByColabId(colabId);
  const cekPartisipan = await colab_funCekPartisipasiById(colabId);

  return (
    <>
      <Colab_MainDetail
        dataColab={{} as any}
        userLoginId={userLoginId as string}
        listPartisipan={listPartisipan as any}
        cekPartisipan={cekPartisipan}
      />
    </>
  );
}
