import { LayoutEvent_DetailKontribusi } from "@/app_modules/event";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutEvent_DetailKontribusi>{children}</LayoutEvent_DetailKontribusi>
    </>
  );
}
