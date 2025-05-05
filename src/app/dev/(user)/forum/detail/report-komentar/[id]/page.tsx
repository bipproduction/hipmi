import { Forum_DetailReportKomentar } from "@/app_modules/forum";
import forum_funGetOneReportKomentarById from "@/app_modules/forum/fun/get/get_one_report_komentar_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const komentarId = params.id;
  const dataKomentar = await forum_funGetOneReportKomentarById({ komentarId: komentarId });

  return (
    <>
      <Forum_DetailReportKomentar dataKomentar={dataKomentar as any} />
    </>
  );
}
