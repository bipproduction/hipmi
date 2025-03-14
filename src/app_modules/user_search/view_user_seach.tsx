
import { Component_Header } from "../_global/component/new/component_header";
import UIGlobal_LayoutHeaderTamplate from "../_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "../_global/ui/ui_layout_tamplate";
import UI_NewLayoutTamplate, { UI_NewHeader, UI_NewChildren } from "../_global/ui/V2_layout_tamplate";
import { UserSearch_UiView } from "./component/ui_user_search";

export default function UserSearch_MainView() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Pencarian Pengguna" />}
      >
        <UserSearch_UiView  />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Pencarian Pengguna" />
        </UI_NewHeader>
        <UI_NewChildren>
          <UserSearch_UiView />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
