import { LayoutPortofolio_EditMedsosBisnis } from "@/app_modules/katalog/portofolio";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPortofolio_EditMedsosBisnis>
      {children}
    </LayoutPortofolio_EditMedsosBisnis>
  );
}
