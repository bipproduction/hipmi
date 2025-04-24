"use client";

import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { Grid, SimpleGrid, Stack, Text } from "@mantine/core";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { AdminVoting_ComponentDetail } from "./comp_detail";
import { AdminVoting_ComponentDetailRejectButton } from "./button/comp_button_detail_reject";
import { useState } from "react";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { MainColor } from "@/app_modules/_global/color";
import { Admin_V3_ComponentDetail } from "../../_components_v3/comp_detail_data";

interface Props {
  data: MODEL_VOTING;
}
export function AdminVoting_ComponentDetailReject({ data }: Props) {
  const [newData, setNewData] = useState<MODEL_VOTING>(data);

  return (
    <Admin_V3_ComponentBreakpoint>
      <Admin_ComponentBoxStyle>
        <Stack>
          <AdminVoting_ComponentDetail data={newData} />
          <ReportNote catatan={newData.catatan} />
        </Stack>
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
    </Admin_V3_ComponentBreakpoint>
  );
}

function ReportNote({ catatan }: { catatan: string }) {
  return (
    <>
      <Admin_V3_ComponentDetail
        item={{
          label: <Text>Catatan report</Text>,
          value: <Text>{catatan}</Text>,
        }}
      />
    </>
  );
}
