import { MainDonasiNew } from "@/app_modules/donasi";

export default async function Page() {
  // const listDonasi = await donasi_funGetAllPublish({ page: 1 });

  // return <MainDonasi listDonasi={listDonasi as any} />;
  return <MainDonasiNew />
}
