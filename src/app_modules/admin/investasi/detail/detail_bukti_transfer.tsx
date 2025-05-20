"use client";

import { Stack } from "@mantine/core";
import Admin_ComponentBackButton from "../../_admin_global/back_button";
import { AdminInvestasi_ViewBuktiTransfer } from "../_view";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";

export function AdminInvestasi_DetailBuktiTransfer({ imageId }: { imageId: string }) {
  return (
    <Stack>
      <Admin_ComponentBackButton />
      <ComponentAdminGlobal_TitlePage name="Bukti Transfer" />
      <AdminInvestasi_ViewBuktiTransfer imageId={imageId} />
    </Stack>
  );
}
