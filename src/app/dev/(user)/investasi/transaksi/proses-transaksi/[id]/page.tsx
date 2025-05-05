import { funGlobal_getNomorAdmin } from "@/app_modules/_global/fun/get";
import { Investasi_UiProsesTransaksi } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const invoiceId = params.id;
  const nomorAdmin = await funGlobal_getNomorAdmin();

  return (
    <>
      <Investasi_UiProsesTransaksi nomorAdmin={nomorAdmin} />
    </>
  );
}
