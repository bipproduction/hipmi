import { LayoutPortofolio_EditDataBisnis } from "@/app_modules/katalog/portofolio";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPortofolio_EditDataBisnis>
      {children}
    </LayoutPortofolio_EditDataBisnis>
  );
}
