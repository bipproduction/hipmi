import { funGlobal_getNomorAdmin } from "@/app_modules/_global/fun/get";
import { investasi_funGetOneInvoiceById } from "@/app_modules/investasi/_fun/get/fun_get_one_invoice_by_id";
import { Investasi_UiTransaksiGagal } from "@/app_modules/investasi/_ui/status_transaksi/ui_transaksi_gagal";

export default async function Page({ params }: { params: { id: string } }) {
  const invoiceId = params.id;
  // const dataTransaksi = await investasi_funGetOneInvoiceById({ invoiceId });
  // const nomorAdmin = await funGlobal_getNomorAdmin();

  return (
    <>
      <Investasi_UiTransaksiGagal
       
      />
    </>
  );
}
