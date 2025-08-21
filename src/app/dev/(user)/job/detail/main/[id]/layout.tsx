import { LayoutJob_MainDetail } from "@/app_modules/job";
import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutJob_MainDetail>{children}</LayoutJob_MainDetail>
    </>
  );
}
