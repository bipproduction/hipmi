import { LayoutUpdateKabarDonasi } from "@/app_modules/donasi";
import React from "react";

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {id: string}
}) {
  return (
    <>
      <LayoutUpdateKabarDonasi kabarId={params.id}>{children}</LayoutUpdateKabarDonasi>
    </>
  );
}
