"use client";

import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import { Stack } from "@mantine/core";
import { AdminJob_ViewTavleReview } from "../../_view";

export default function AdminJob_TableReview() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy" />
        <AdminJob_ViewTavleReview  />
      </Stack>
    </>
  );
}
