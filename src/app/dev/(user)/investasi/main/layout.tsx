import { Investasi_UiLayoutMain } from "@/app_modules/investasi/_ui";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Investasi_UiLayoutMain>{children}</Investasi_UiLayoutMain>
    </>
  );
}
