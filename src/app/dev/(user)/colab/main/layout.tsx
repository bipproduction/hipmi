import { LayoutColab_Main } from "@/app_modules/colab";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <LayoutColab_Main >{children}</LayoutColab_Main>
    </>
  );
}
