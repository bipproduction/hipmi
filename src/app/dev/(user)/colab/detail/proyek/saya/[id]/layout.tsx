import { LayoutColab_DetailProyekSaya } from "@/app_modules/colab";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutColab_DetailProyekSaya>{children}</LayoutColab_DetailProyekSaya>
    </>
  );
}
