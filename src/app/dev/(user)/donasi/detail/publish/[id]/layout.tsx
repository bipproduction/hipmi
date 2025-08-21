import { LayoutDetailPublishDonasi } from "@/app_modules/donasi";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const donasiId = params.id;
  
  return (
    <>
      <LayoutDetailPublishDonasi donasiId={donasiId}>
        {children}
      </LayoutDetailPublishDonasi>
    </>
  );
}
