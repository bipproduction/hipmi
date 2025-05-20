import { LayoutCeritaPenggalangDonasi } from "@/app_modules/donasi";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const dataDonasi = await Donasi_getOneById(params.id);
  const statusDonasiId = dataDonasi?.donasiMaster_StatusDonasiId;
  return (
    <>
      <LayoutCeritaPenggalangDonasi statusDonasiId={statusDonasiId as string} donasiId={dataDonasi?.id as string}>
        {children}
      </LayoutCeritaPenggalangDonasi>
    </>
  );
}
