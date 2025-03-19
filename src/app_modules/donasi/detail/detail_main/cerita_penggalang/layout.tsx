"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewFooter,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import ButtonDonasi from "@/app_modules/donasi/component/footer_button_donasi";
import React from "react";

export default function LayoutCeritaPenggalangDonasi({
  children,
  statusDonasiId,
  donasiId,
}: {
  children: React.ReactNode;
  statusDonasiId: string;
  donasiId: string;
}) {
  if (statusDonasiId !== "1") {
    return (
      <>
        {/* <UIGlobal_LayoutTamplate
          header={
            <UIGlobal_LayoutHeaderTamplate title="Cerita Penggalang Dana" />
          }
        >
          {children}
        </UIGlobal_LayoutTamplate> */}

        <UI_NewLayoutTamplate>
          <UI_NewHeader>
            <Component_Header title="Cerita Penggalang Dana" />
          </UI_NewHeader>
          <UI_NewChildren>{children}</UI_NewChildren>
        </UI_NewLayoutTamplate>
      </>
    );
  }

  return (
    // <UIGlobal_LayoutTamplate
    //   header={<UIGlobal_LayoutHeaderTamplate title="Cerita Penggalang Dana" />}
    //   footer={<ButtonDonasi donasiId={donasiId} />}
    // >
    //   {children}
    // </UIGlobal_LayoutTamplate>

    <UI_NewLayoutTamplate>
      <UI_NewHeader>
        <Component_Header title="Cerita Penggalang Dana" />
      </UI_NewHeader>
      <UI_NewChildren>{children}</UI_NewChildren>
      <UI_NewFooter>
        <ButtonDonasi donasiId={donasiId} />
      </UI_NewFooter>
    </UI_NewLayoutTamplate>
  );
}
