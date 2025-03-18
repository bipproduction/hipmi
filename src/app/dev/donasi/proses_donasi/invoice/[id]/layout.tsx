import { LayoutDonasi_InvoiceProses } from "@/app_modules/donasi";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutDonasi_InvoiceProses>{children}</LayoutDonasi_InvoiceProses>
    </>
  );
}
