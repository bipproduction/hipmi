import { LayoutCreateCeritaDonasi } from "@/app_modules/donasi/create";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutCreateCeritaDonasi>{children}</LayoutCreateCeritaDonasi>
    </>
  );
}
