import { Map_CreateNewPin } from "@/app_modules/map/view";

export default async function Page({ params }: { params: { id: string } }) {
  let portofolioId = params.id;
  return (
    <>
      <Map_CreateNewPin portofolioId={portofolioId} />
    </>
  );
}
