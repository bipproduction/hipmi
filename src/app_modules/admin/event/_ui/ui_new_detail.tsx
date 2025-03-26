"use client";

import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { clientLogger } from "@/util/clientLogger";
import { SimpleGrid, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { apiGetAdminDetailEventById } from "../_lib/api_fecth_admin_event";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import { AdminEvent_ViewDetailPublish } from "../_view/view_detail_publish";
import { AdminEvent_ViewDetailReview } from "../_view/view_detail_review";
import { AdminEvent_ViewDetailReject } from "../_view/view_detail_reject";

export function AdminEvent_UiNewDetail() {
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MODEL_EVENT | null>();

  useShallowEffect(() => {
    getDetailData();
  }, []);
  async function getDetailData() {
    try {
      setLoading(true);
      const response = await apiGetAdminDetailEventById({
        id: params.id,
      });

      if (response?.success && response?.data) {
        setData(response.data);
      } else {
        console.error("Invalid data format received:", response);
        setData(null);
      }
    } catch (error) {
      clientLogger.error("Error get data table detail publish", error);
      setData(null);
    }
  }

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Detail event" />
        <AdminGlobal_ComponentBackButton />

        {data === undefined ? (
          <SimpleGrid cols={2}>
            <CustomSkeleton h={500} />
          </SimpleGrid>
        ) : !data ? (
          <ComponentAdminGlobal_IsEmptyData />
        ) : data.EventMaster_Status.name === "Publish" ? (
          <AdminEvent_ViewDetailPublish data={data} />
        ) : data.EventMaster_Status.name === "Review" ? (
          <AdminEvent_ViewDetailReview data={data} />
        ) : data.EventMaster_Status.name === "Reject" ? (
          <AdminEvent_ViewDetailReject data={data} />
        ) : (
          ""
        )}
      </Stack>
    </>
  );
}
