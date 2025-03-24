"use client";

import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { Button, Group, SimpleGrid } from "@mantine/core";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { AdminVoting_ComponentDetail } from "./comp_detail";
import { AdminVoting_ComponentDetailReviewButton } from "./button/comp_button_detail_review";

interface Props {
  data: MODEL_VOTING;
}
export function AdminVoting_ComponentDetailReview({ data }: Props) {
  return (
    <SimpleGrid cols={2}>
      <Admin_ComponentBoxStyle>
        <AdminVoting_ComponentDetail data={data} />
        <AdminVoting_ComponentDetailReviewButton data={data}/>
      </Admin_ComponentBoxStyle>
    </SimpleGrid>
  );
}
