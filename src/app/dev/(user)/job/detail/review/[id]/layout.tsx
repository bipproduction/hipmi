import { LayoutJob_DetailReview } from "@/app_modules/job";
import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutJob_DetailReview>{children}</LayoutJob_DetailReview>
    </>
  );
}
