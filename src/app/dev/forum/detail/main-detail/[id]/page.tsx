import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import Forum_MainDetail from "@/app_modules/forum/detail/main_detail";
import { forum_countTotalKomenById } from "@/app_modules/forum/fun/count/count_total_komentar_by_id";
import { forum_funGetAllKomentarById } from "@/app_modules/forum/fun/get/get_all_komentar_by_id";
import { forum_getOnePostingById } from "@/app_modules/forum/fun/get/get_one_posting_by_id";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;
  const userLoginId = await funGetUserIdByToken();

  const dataPosting = await forum_getOnePostingById(postingId);
  const listKomentar = await forum_funGetAllKomentarById({
    postingId: postingId,
    page: 1,
  });

  // dataPosting?.isActive === false && redirect(RouterForum.beranda);

  const countKomentar = await forum_countTotalKomenById(postingId);

  return (
    <>
      <Forum_MainDetail
        dataPosting={dataPosting as any}
        listKomentar={listKomentar as any}
        userLoginId={userLoginId as string}
        countKomentar={countKomentar}
      />
    </>
  );
}
