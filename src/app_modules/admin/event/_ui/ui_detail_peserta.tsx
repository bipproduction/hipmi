"use client";

import { Stack } from "@mantine/core";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import { AdminEvent_ViewDetailPeserta } from "../_view";
import { MODEL_EVENT_PESERTA } from "@/app_modules/event/_lib/interface";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";

export function AdminEvent_UiDetailPeserta() {
  return (
    <>
      <Stack>
        <AdminGlobal_ComponentBackButton />
        <ComponentAdminGlobal_TitlePage name="Detail Peserta" />
        <AdminEvent_ViewDetailPeserta
        />
      </Stack>
    </>
  );
}
