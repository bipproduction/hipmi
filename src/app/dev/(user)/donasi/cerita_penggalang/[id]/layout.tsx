import { LayoutCeritaPenggalangDonasi } from "@/app_modules/donasi";
import { Donasi_getOneById } from "@/app_modules/donasi/fun/get/get_one_donasi_by_id";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutCeritaPenggalangDonasi>{children}</LayoutCeritaPenggalangDonasi>
    </>
  );
}
