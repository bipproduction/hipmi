import { LayoutJob_DetailDraft } from "@/app_modules/job";
import React from "react";

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {id: string}
}) {
  let jobId = params.id
  return (
    <>
      <LayoutJob_DetailDraft jobId={jobId}>{children}</LayoutJob_DetailDraft>
    </>
  );
}
