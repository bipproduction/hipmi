import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";

export default function LayoutProfile_UpdateFotoBackground({
  children,
}: {
  children: any;
}) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Update Background" />}
      >
        {children}
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Update Background" />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
