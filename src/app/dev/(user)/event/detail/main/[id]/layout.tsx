import { LayoutEvent_DetailMain } from "@/app_modules/event";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutEvent_DetailMain>{children}</LayoutEvent_DetailMain>
    </>
  );
}
