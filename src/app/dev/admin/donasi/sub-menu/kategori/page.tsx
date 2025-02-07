import { AdminDonasi_TableKategori } from "@/app_modules/admin/donasi";
import adminDonasi_getMasterKategori from "@/app_modules/admin/donasi/fun/master/get_list_kategori";

export default async function Page() {

  return (
    <>
      <AdminDonasi_TableKategori  />
    </>
  );
}
