import { LayoutVote_DetailRiwayatSaya } from "@/app_modules/vote";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutVote_DetailRiwayatSaya>{children}</LayoutVote_DetailRiwayatSaya>
    </>
  );
}
