import { LayoutDonasi_BuktiTransfer } from "@/app_modules/donasi";

export default async function Page({ params }: { params: { id: string } }) {
  let imageId = params.id;

  return (
    <>
      <LayoutDonasi_BuktiTransfer imageId={imageId} />
    </>
  );
}
