import { LayoutVote_MainDetail } from "@/app_modules/vote";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutVote_MainDetail>{children}</LayoutVote_MainDetail>
    </>
  );
}
