"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Voting_ViewDetailKontributorVoting } from "../../_view";

export function Voting_UiDetailKontributorVoting() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Daftar Kontributor" />}
      >
        <Voting_ViewDetailKontributorVoting />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Daftar Kontributor" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Voting_ViewDetailKontributorVoting />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
