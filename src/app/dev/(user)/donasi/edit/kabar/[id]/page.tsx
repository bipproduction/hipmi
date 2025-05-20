import { Donasi_UiEditKabar } from "@/app_modules/donasi/_ui";
import { Donasi_getOneKabar } from "@/app_modules/donasi/fun/get/get_one_kabar";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const kabarId = params.id;
  const dataKabar = await Donasi_getOneKabar(kabarId);

  return (
    <>
      <Donasi_UiEditKabar dataKabar={dataKabar} />
    </>
  );
}

export default Page;
