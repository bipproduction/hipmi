import LayoutForum_Detail from "@/app_modules/forum/detail/layout";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutForum_Detail>{children}</LayoutForum_Detail>
    </>
  );
}
