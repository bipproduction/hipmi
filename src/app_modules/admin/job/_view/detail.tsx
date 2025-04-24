"use client";

import { MODEL_JOB } from "@/app_modules/job/model/interface";
import { clientLogger } from "@/util/clientLogger";
import { Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { Admin_V3_ComponentSkeletonBreakpoint } from "../../_components_v3/comp_skeleton_breakpoint";
import { AdminJob_DetailPublish } from "../_components/detail/publish";
import { AdminJob_DetailReject } from "../_components/detail/reject";
import { AdminJob_DetailReview } from "../_components/detail/review";
import { apiGetOneJobById } from "../lib/api_fetch_admin_job";

export function AdminJob_ViewDetailPublish() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_JOB>();

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetOneJobById({
        id: param.id,
      });

      if (response) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get data job", error);
    }
  };

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name={`Detail data`} />
        <AdminGlobal_ComponentBackButton />

        {!data ? (
          <Admin_V3_ComponentSkeletonBreakpoint />
        ) : data.MasterStatus.name === "Publish" ? (
          <AdminJob_DetailPublish data={data} />
        ) : data.MasterStatus.name === "Review" ? (
          <AdminJob_DetailReview data={data} />
        ) : data.MasterStatus.name === "Reject" ? (
          <AdminJob_DetailReject data={data} />
        ) : (
          null
        )}
      </Stack>
    </>
  );
}
