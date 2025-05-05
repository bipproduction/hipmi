import { investasi_funGetOneInvoiceById } from "@/app_modules/investasi/_fun/get/fun_get_one_invoice_by_id";
import { Investasi_UiDetailSahamSaya } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  const invoiceId = params.id;
  // const dataSaham = await investasi_funGetOneInvoiceById({ invoiceId });

  return (
    <>
      <Investasi_UiDetailSahamSaya />
    </>
  );
}
