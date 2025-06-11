import { Donasi_UiDaftarKabar } from "@/app_modules/donasi/_ui";

async function Page({ params }: { params: { id: string } }) {
  // const donasiId = params.id;
  // const listKabar = await donasi_funGetListKabarById({
  //   page: 1,
  //   donasiId: donasiId,
  // });

  return (
    <>
      <Donasi_UiDaftarKabar />
    </>
  );
}

export default Page;
