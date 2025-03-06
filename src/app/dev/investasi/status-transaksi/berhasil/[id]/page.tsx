import { StatusTransaksiInvestasi } from "@/app_modules/investasi";
import { investasi_funGetOneInvoiceById } from "@/app_modules/investasi/_fun/get/fun_get_one_invoice_by_id";
import { Investasi_UiTransaksiBerhasil } from "@/app_modules/investasi/_ui";

export default async function Page({params}: {params: {id: string}}) {
    const invoiceId = params.id;
    // const dataTransaksi = await investasi_funGetOneInvoiceById({ invoiceId });
  return (
    <>
      <Investasi_UiTransaksiBerhasil  />
    </>
  );
}
