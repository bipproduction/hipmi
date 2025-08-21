import { LayoutVote_DetailReview } from "@/app_modules/vote";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutVote_DetailReview>{children}</LayoutVote_DetailReview>
    </>
  );
}
