import { LayoutForum_Forumku } from "@/app_modules/forum";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutForum_Forumku>{children}</LayoutForum_Forumku>
    </>
  );
}
