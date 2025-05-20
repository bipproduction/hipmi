
import { LayoutForum_ReportPosting } from "@/app_modules/forum";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutForum_ReportPosting>{children}</LayoutForum_ReportPosting>
    </>
  );
}
