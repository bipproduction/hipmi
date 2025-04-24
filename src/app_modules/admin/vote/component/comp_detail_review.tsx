"use client";

import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { AdminVoting_ComponentDetailReviewButton } from "./button/comp_button_detail_review";
import { AdminVoting_ComponentDetail } from "./comp_detail";

interface Props {
  data: MODEL_VOTING;
}
export function AdminVoting_ComponentDetailReview({ data }: Props) {
  return (
    <Admin_V3_ComponentBreakpoint>
      <Admin_ComponentBoxStyle>
        <AdminVoting_ComponentDetail data={data} />
        <AdminVoting_ComponentDetailReviewButton data={data} />
      </Admin_ComponentBoxStyle>
    </Admin_V3_ComponentBreakpoint>
  );
}
