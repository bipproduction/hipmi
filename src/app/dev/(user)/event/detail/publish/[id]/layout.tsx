
import { LayoutEvent_DetailPublish } from "@/app_modules/event";
import React from "react";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutEvent_DetailPublish>{children}</LayoutEvent_DetailPublish>;
}
