import { Colab_Proyek } from "@/app_modules/colab";

export default async function Page() {
  // const listPartisipasiProyek  = await colab_getListPartisipasiProyekByAuthorId({page: 1})
  // const listProyekSaya = await colab_getListAllProyekSayaByAuthorId({page: 1})

  return (
    <>
      <Colab_Proyek />
    </>
  );
}
