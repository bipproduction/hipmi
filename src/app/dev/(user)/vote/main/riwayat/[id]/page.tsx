import { Vote_Riwayat } from "@/app_modules/vote";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Vote_Riwayat />
    </>
  );
}
