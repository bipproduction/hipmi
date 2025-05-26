"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Job_ViewNotUserJobVacany } from "../_view";

export function Job_UiNotUserView() {
  return (
    <>

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Job Vacancy" hideButtonLeft />
        </UI_NewHeader>
        <UI_NewChildren>
          <Job_ViewNotUserJobVacany/>
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
