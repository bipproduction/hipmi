import { AdminForum_LihatSemuaKomentar } from "@/app_modules/admin/forum";
import adminForum_countKomentarByPostingId from "@/app_modules/admin/forum/fun/count/fun_count_komentar_by_id";
import { adminForum_getListKomentarById } from "@/app_modules/admin/forum/fun/get/get_list_komentar_by_id";
import { adminForum_getOnePostingById } from "@/app_modules/admin/forum/fun/get/get_one_posting_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let postingId = params.id;

  // const listKomentar = await adminForum_getListKomentarById({
  //   postingId: postingId,
  //   page: 1,
  // });
  const dataPosting = await adminForum_getOnePostingById(postingId);
  // const countKomentar = await adminForum_countKomentarByPostingId({
  //   postingId: postingId,
  // });

  return (
    <>
      <AdminForum_LihatSemuaKomentar

        dataPosting={dataPosting as any}
      />
    </>
  );
}
