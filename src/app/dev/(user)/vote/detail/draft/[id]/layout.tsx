import { LayoutVote_DetailDraft } from "@/app_modules/vote";
import React from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  let voteId = params.id;
  return (
    <>
      <LayoutVote_DetailDraft voteId={voteId}>
        {children}
      </LayoutVote_DetailDraft>
    </>
  );
}
