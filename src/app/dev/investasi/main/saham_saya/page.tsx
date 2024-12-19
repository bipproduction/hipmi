import { Investasi_ViewSahamSayaNew } from "@/app_modules/investasi/_view/main/view_saham_saya_new";

export default async function Page() {
  // const dataSaham = await investasi_funGetSuccessTransactionById({ page: 1 });

  return (
    <>
      {/* <InvestasiSahamTerbeli listTransaksi={listTransaksi as any} /> */}
      {/* <Investasi_UiSahamSaya dataSaham={dataSaham as any} /> */}
      <Investasi_ViewSahamSayaNew />
    </>
  );
}
