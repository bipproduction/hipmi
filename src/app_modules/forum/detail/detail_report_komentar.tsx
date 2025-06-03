import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentForum_UiDetailReportKomentar } from "../component/detail_component/ui_report_komentar";


export default function Forum_DetailReportKomentar() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Report Komentar" />}
      >
        {<ComponentForum_UiDetailReportKomentar  />}
      </UIGlobal_LayoutTamplate>
    </>
  );
}


