import { LayoutVote_Edit } from "@/app_modules/vote";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutVote_Edit>{children}</LayoutVote_Edit>
    </>
  );
}
