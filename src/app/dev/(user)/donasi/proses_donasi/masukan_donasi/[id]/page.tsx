import { MasukanDonasi } from "@/app_modules/donasi";

export default async function Page({ params }: { params: { id: string } }) {
  let donasiId = params.id;
  return <MasukanDonasi donasiId={donasiId} />;
}
