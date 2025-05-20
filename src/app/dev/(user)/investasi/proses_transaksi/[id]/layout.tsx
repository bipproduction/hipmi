import { LayoutProsesTransaksiInvestasi } from "@/app_modules/investasi";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {id: string}
}) {
  const investasiId = params.id;
  return (
    <LayoutProsesTransaksiInvestasi investasiId={investasiId}>
      {children}
    </LayoutProsesTransaksiInvestasi>
  );
}
