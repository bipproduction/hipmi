import { LayoutEvent_DetailDraft } from "@/app_modules/event";
import React from "react";

export default async function Page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  let eventId = params.id;

  return (
    <>
      <LayoutEvent_DetailDraft eventId={eventId}>
        {children}
      </LayoutEvent_DetailDraft>
    </>
  );
}
