import { LayoutColab_Create } from "@/app_modules/colab";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutColab_Create>{children}</LayoutColab_Create>
    </>
  );
}
