"use client";

import { SimpleGrid, Stack, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { clientLogger } from "@/util/clientLogger";
import { apiGetOneJobById } from "../lib/api_fetch_admin_job";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { AdminJob_DetailPublish } from "../_components/detail_status";

export function AdminJob_ViewDetailPublish() {
  const param = useParams<{ id: string; status: string }>();
  const [data, setData] = useState();

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetOneJobById({
        id: param.id,
      });

      if (response) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get data job", error);
    }
  };

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name={`Detail ${param.status} `} />
        <AdminGlobal_ComponentBackButton />

        {!data ? (
          <SimpleGrid cols={2}>
            <CustomSkeleton height={500} width={"100%"} />
            <CustomSkeleton height={500} width={"100%"} />
          </SimpleGrid>
        ) : (
          <AdminJob_DetailPublish data={data} />
        )}
      </Stack>
    </>
  );
}
