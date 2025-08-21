import { LayoutDonasi_EditRekening } from "@/app_modules/donasi";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutDonasi_EditRekening>{children}</LayoutDonasi_EditRekening>
    </>
  );
}
