import { LayoutPortofolio_EditLogoBisnis } from "@/app_modules/katalog/portofolio";
import React from "react";

export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <LayoutPortofolio_EditLogoBisnis>
        {children}
      </LayoutPortofolio_EditLogoBisnis>
    );
  }
  