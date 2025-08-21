import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, { UI_NewChildren, UI_NewHeader } from "@/app_modules/_global/ui/V2_layout_tamplate";
import { UIChildrenNotifikasi } from "@/app_modules/notifikasi/_ui/ui_new_layout_notifikasi";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Notifikasi_UiNewLayout
        header={<UIGlobal_LayoutHeaderTamplate title="Notifikasi" />}
      >
        {children}
      </Notifikasi_UiNewLayout> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Notifikasi" />
        </UI_NewHeader>
        <UI_NewChildren>
          <UIChildrenNotifikasi>
            {children}
          </UIChildrenNotifikasi>
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
