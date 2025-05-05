import { LayoutDetailDraftDonasi } from "@/app_modules/donasi";
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
      <LayoutDetailDraftDonasi donasiId={params.id} >{children}</LayoutDetailDraftDonasi>
    </>
  );
}
