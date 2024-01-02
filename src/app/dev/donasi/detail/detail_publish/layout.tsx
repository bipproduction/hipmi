import { LayoutDetailPublishDonasi } from "@/app_modules/donasi";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutDetailPublishDonasi>{children}</LayoutDetailPublishDonasi>
    </>
  );
}
