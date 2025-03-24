"use client";

import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { Grid, SimpleGrid, Text } from "@mantine/core";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { AdminVoting_ComponentDetail } from "./comp_detail";
import { AdminVoting_ComponentDetailRejectButton } from "./button/comp_button_detail_reject";
import { useState } from "react";

interface Props {
  data: MODEL_VOTING;
}
export function AdminVoting_ComponentDetailReject({ data }: Props) {
  const [newData, setNewData] = useState<MODEL_VOTING>(data);

  return (
    <SimpleGrid cols={2}>
      <Admin_ComponentBoxStyle>
        <AdminVoting_ComponentDetail data={newData} />
        <ReportNote catatan={newData.catatan} />
        <AdminVoting_ComponentDetailRejectButton
          data={newData}
          onUpdateData={(val) => {
            setNewData({
              ...newData,
              catatan: val,
            });
          }}
        />
      </Admin_ComponentBoxStyle>
    </SimpleGrid>
  );
}

function ReportNote({ catatan }: { catatan: string }) {
  return (
    <>
      <Grid mt={"md"}>
        <Grid.Col span={3}>
          <Text>Catatan report</Text>
        </Grid.Col>
        <Grid.Col span={1}>
          <Text>:</Text>
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <Text>{catatan}</Text>
        </Grid.Col>
      </Grid>
    </>
  );
}
