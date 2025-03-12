import { AdminInvestasi_DetailPublish } from "@/app_modules/admin/investasi";
import { apiGetAdminInvestasiById } from "@/app_modules/admin/investasi/_lib/api_fetch_admin_investasi";
import {
  adminInvestasi_funGetAllTransaksiById,
  adminInvestasi_getStatusInvestasi,
} from "@/app_modules/admin/investasi/fun";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";

export default async function Page() {

  // export default async function Page({ params }: { params: { id: string } }) {
  //   const investasiId = params.id;
  //   const dataInvestasi = await getOneInvestasiById(investasiId);
  //   const statusTransaksi = await adminInvestasi_getStatusInvestasi();
  //   const dataTransaksi = await adminInvestasi_funGetAllTransaksiById({
  //     investasiId,
  //     page: 1,
  //   });

  return (
    <>
      <AdminInvestasi_DetailPublish 
      />
    </>
  );
}
