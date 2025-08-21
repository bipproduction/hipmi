import { LayoutColab_Edit } from "@/app_modules/colab";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutColab_Edit>{children}</LayoutColab_Edit>
    </>
  );
}
