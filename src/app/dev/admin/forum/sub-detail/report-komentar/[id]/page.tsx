import { AdminForum_HasilReportKomentar } from "@/app_modules/admin/forum";

export default async function Page({ params }: { params: { id: string } }) {
  // let komentarId = params.id;
  // const listReport = await adminForum_getListReportKomentarbyId({
  //   komentarId: komentarId,
  //   page: 1,
  // });
  // const dataKomentar = await adminForum_funGetOneKomentarById({
  //   komentarId: komentarId,
  // });

  return (
    <>
      <AdminForum_HasilReportKomentar
        // listReport={listReport}
        // komentarId={komentarId}
        // dataKomentar={dataKomentar as any}
      />
    </>
  );
}
