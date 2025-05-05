import { LayoutForum_ReportKomentar } from "@/app_modules/forum";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutForum_ReportKomentar>{children}</LayoutForum_ReportKomentar>
    </>
  );
}
