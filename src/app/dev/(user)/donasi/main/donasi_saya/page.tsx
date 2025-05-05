import DonasiSayaNew from "@/app_modules/donasi/main/donasi_saya_new";

export default async function Page() {
  // const listInvoice = await donasi_funGetAllInvoiceByAuthorId({ page: 1 });

  return (
    <>
      {/* <DonasiSayaDonasi listInvoice={listInvoice as any} />; */}
      <DonasiSayaNew />
    </>
  )
}
