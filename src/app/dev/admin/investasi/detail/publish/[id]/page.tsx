import { AdminInvestasi_DetailPublish } from "@/app_modules/admin/investasi";

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
