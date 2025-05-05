import { LayoutMainCrowd } from "@/app_modules/crowd";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutMainCrowd>{children}</LayoutMainCrowd>
    </>
  );
}
