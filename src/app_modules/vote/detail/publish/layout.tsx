"use client";

import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import React from "react";
import { Voting_ComponentLayoutHeaderDetailPublish } from "../../component";

export default function LayoutVote_DetailPublish({
  children,
  votingId,
  userLoginId,
  dataVoting,
}: {
  children: React.ReactNode;
  votingId: string;
  userLoginId: string;
  dataVoting: any;
}) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={
          <Voting_ComponentLayoutHeaderDetailPublish
            dataVoting={dataVoting}
            title="Detail Publish"
            votingId={votingId}
            userLoginId={userLoginId}
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Voting_ComponentLayoutHeaderDetailPublish
            dataVoting={dataVoting}
            title="Detail Publish"
            votingId={votingId}
            userLoginId={userLoginId}
          />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
