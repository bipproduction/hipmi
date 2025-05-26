import { LayoutJob_DetailReject } from "@/app_modules/job";
import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutJob_DetailReject>{children}</LayoutJob_DetailReject>
    </>
  );
}
