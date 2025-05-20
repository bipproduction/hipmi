import { LaoyoutForum_EditKomentar } from "@/app_modules/forum";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LaoyoutForum_EditKomentar>{children}</LaoyoutForum_EditKomentar>
    </>
  );
}
