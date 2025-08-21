import { LayoutVote_Main } from "@/app_modules/vote";
import NewLayout_Voting from "@/app_modules/vote/main/new_layout_voting";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <LayoutVote_Main>{children}</LayoutVote_Main> */}
      <NewLayout_Voting>{children}</NewLayout_Voting>
    </>
  );
}
