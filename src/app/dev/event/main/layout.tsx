import { LayoutEvent_Main } from "@/app_modules/event";
import NewLayout_Event from "@/app_modules/event/main/new_layout_event";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NewLayout_Event>{children}</NewLayout_Event>
    </>
  );
}
