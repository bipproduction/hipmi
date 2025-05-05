import { DetailDonasiSaya } from "@/app_modules/donasi";
import { Donasi_getCountDonatur } from "@/app_modules/donasi/fun/count/get_count_donatur";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";
import { Donasi_getOneInvoiceById } from "@/app_modules/donasi/fun/get/get_one_invoice_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  let invoiceId = params.id;
  const dataDonasi = await Donasi_getOneInvoiceById(invoiceId);
  const countDonatur= await Donasi_getCountDonatur(dataDonasi?.donasiId as any)


  return (
    <>
      <DetailDonasiSaya dataDonasi={dataDonasi as any} countDonatur={countDonatur} />
    </>
  );
}
