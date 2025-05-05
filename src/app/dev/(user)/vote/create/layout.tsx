import { LayoutVote_Create } from "@/app_modules/vote";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutVote_Create>{children}</LayoutVote_Create>
    </>
  );
}
