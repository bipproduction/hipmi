"use client";

import { ScrollArea, SimpleGrid, Title } from "@mantine/core";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { AdminVoting_ComponentDetail } from "./comp_detail";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { AdminVoting_ComponentKontributorList } from "./comp_kontributor";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";

interface Props {
  data: MODEL_VOTING;
}
export function AdminVoting_ComponentDetailPublish({ data }: Props) {
  return (
    <Admin_V3_ComponentBreakpoint>
      <Admin_ComponentBoxStyle style={{ maxHeight: 700 }}>
        <ScrollArea h={650}>
          <AdminVoting_ComponentDetail data={data} />
        </ScrollArea>
      </Admin_ComponentBoxStyle>
      <AdminVoting_ComponentKontributorList
        dataHasil={data.Voting_DaftarNamaVote}
      />
    </Admin_V3_ComponentBreakpoint>
  );
}
