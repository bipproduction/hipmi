
import { LayoutForum_EditPosting } from "@/app_modules/forum";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutForum_EditPosting>{children}</LayoutForum_EditPosting>
    </>
  );
}
