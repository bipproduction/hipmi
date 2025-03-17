"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewMetodePembayaran } from "../../_view";

export function Investasi_UiMetodePembayaran({
  listBank,
  investasiId,
}: {
  listBank: any[];
  investasiId: string;
}) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Metode Pembayaran" />}
      >
        <Investasi_ViewMetodePembayaran
          listBank={listBank}
          investasiId={investasiId}
        />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Metode Pembayaran" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewMetodePembayaran
            listBank={listBank}
            investasiId={investasiId}
          />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
