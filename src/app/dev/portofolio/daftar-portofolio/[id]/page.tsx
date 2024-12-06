import { ListDetailPortofolioNew } from "@/app_modules/katalog/portofolio";

export default async function Page({ params }: { params: { id: string } }) {
  // const profileId = params.id;
  // const dataPortofolio = await portofolio_funGetAllDaftarByid({
  //   profileId,
  //   page: 1,
  // });


  return (
    <>
      {/* <Portofolio_ViewListDetail dataPortofolio={dataPortofolio as any} profileId={profileId} /> */}
      <ListDetailPortofolioNew />
    </>
  );
}
