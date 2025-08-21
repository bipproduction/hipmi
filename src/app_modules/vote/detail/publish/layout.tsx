"use client";

import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import React from "react";
import { Voting_ComponentLayoutHeaderDetailPublish } from "../../component";

export default function LayoutVote_DetailPublish({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Voting_ComponentLayoutHeaderDetailPublish title="Detail Publish" />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
