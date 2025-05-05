import { Donasi_ProsesTransaksi } from "@/app_modules/donasi";
import { Donasi_getOneInvoiceById } from "@/app_modules/donasi/fun/get/get_one_invoice_by_id";
import { donasi_getOneStatusInvoiceById } from "@/app_modules/donasi/fun/get/get_one_status_invoice_by_id";
import donasi_getMasterNomorAdmin from "@/app_modules/donasi/fun/master/get_nomor_admin";

export default async function Page({ params }: { params: { id: string } }) {
  let invoiceId = params.id;
  const nomorAdmin = await donasi_getMasterNomorAdmin();
  const statusInvoice = await donasi_getOneStatusInvoiceById({invoiceId: invoiceId})
  // console.log(statusInvoice)

  return (
    <>
      <Donasi_ProsesTransaksi
        statusInvoice={statusInvoice as any}
        nomorAdmin={nomorAdmin}
      />
    </>
  );
}
