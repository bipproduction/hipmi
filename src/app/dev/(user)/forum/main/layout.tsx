import { LayoutForum_Main } from "@/app_modules/forum";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutForum_Main>{children}</LayoutForum_Main>
    </>
  );
}
