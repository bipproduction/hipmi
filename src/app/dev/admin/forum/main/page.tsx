import { AdminForum_Main } from "@/app_modules/admin/forum";
import { adminForum_countLaporanKomentar } from "@/app_modules/admin/forum/fun/count/fun_count_laporan_komentar";
import { adminForum_countLaporanPosting } from "@/app_modules/admin/forum/fun/count/fun_count_laporan_posting";
import { adminForum_countPublish } from "@/app_modules/admin/forum/fun/count/fun_count_publish";

export default async function Page() {
//   await new Promise((a, b) => {
//     setTimeout(a, 4000);
//   });
  const countPublish = await adminForum_countPublish();
  const countLaporanPosting = await adminForum_countLaporanPosting()
   const countLaporanKomentar = await adminForum_countLaporanKomentar();

  return (
    <>
      <AdminForum_Main
        // countPublish={countPublish}
        // countLaporanPosting={countLaporanPosting}
        // countLaporanKomentar={countLaporanKomentar}
      />
    </>
  );
}
