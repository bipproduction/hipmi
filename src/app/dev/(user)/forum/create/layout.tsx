import { LayoutForum_Create } from "@/app_modules/forum";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutForum_Create>{children}</LayoutForum_Create>
    </>
  );
}
