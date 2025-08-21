
import { LayoutEvent_DetailReview } from "@/app_modules/event";
import React from "react";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutEvent_DetailReview>{children}</LayoutEvent_DetailReview>
}
