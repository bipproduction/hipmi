
import UIGlobal_LayoutHeaderTamplate from "../_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "../_global/ui/ui_layout_tamplate";
import { UserSearch_UiView } from "./component/ui_user_search";

export default function UserSearch_MainView() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Pencarian Pengguna" />}
      >
        <UserSearch_UiView  />
      </UIGlobal_LayoutTamplate>

    </>
  );
}
