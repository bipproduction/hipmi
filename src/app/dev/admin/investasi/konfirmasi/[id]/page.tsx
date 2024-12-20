import { Admin_KonfirmasiInvestasi } from "@/app_modules/admin/investasi";
import { adminInvestasi_getOneById } from "@/app_modules/admin/investasi/fun";

export default async function Page({ params }: { params: { id: string } }) {
  const investasiId = params.id;
  const dataInvestasi = await adminInvestasi_getOneById({investasiId});
  // console.log(dataUser)

  return (
    <>
      <Admin_KonfirmasiInvestasi dataInvestasi={dataInvestasi as any} />
    </>
  );
}
