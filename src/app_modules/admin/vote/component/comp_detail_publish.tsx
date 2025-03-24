"use client";

import { SimpleGrid, Title } from "@mantine/core";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { AdminVoting_ComponentDetail } from "./comp_detail";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { AdminVoting_ComponentKontributorList } from "./comp_kontributor";

interface Props {
  data: MODEL_VOTING;
}
export function AdminVoting_ComponentDetailPublish({ data }: Props) {

  return (
    <SimpleGrid cols={2}>
      <Admin_ComponentBoxStyle >
        <AdminVoting_ComponentDetail data={data} />
      </Admin_ComponentBoxStyle>
      <AdminVoting_ComponentKontributorList dataHasil={data.Voting_DaftarNamaVote}/>
    </SimpleGrid>
  );
}
