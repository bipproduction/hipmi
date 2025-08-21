
import {  LayoutEvent_DetailReject } from "@/app_modules/event";
import React from "react";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutEvent_DetailReject>{children}</LayoutEvent_DetailReject>;
}
