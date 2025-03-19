import { PenggalangDanaDonasi } from "@/app_modules/donasi";
import { Donasi_getAuthorById } from "@/app_modules/donasi/fun/get/get_author_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let authorId = params.id;
  const dataPenggalang = await Donasi_getAuthorById(authorId);

  return (
    <>
      <PenggalangDanaDonasi dataPenggalang={dataPenggalang as any} />
    </>
  );
}
