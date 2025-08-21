import { LayoutDonasi_CreateKabar } from "@/app_modules/donasi";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutDonasi_CreateKabar>{children}</LayoutDonasi_CreateKabar>
    </>
  );
}
