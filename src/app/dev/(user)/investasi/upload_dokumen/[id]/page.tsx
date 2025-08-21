import { UploadDokumenInvestasi } from "@/app_modules/investasi";

export default async function Page({ params }: { params: { id: string } }) {
  return <UploadDokumenInvestasi idInves={params.id} />;
}
