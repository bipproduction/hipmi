"use client";

import { Stack } from "@mantine/core";
import { useState } from "react";
import ComponentDonasi_CeritaPenggalangMain from "../../component/detail_main/cerita_penggalang";
import { ComponentDonasi_DetailDataMain } from "../../component/detail_main/detail_data_donasi";
import ComponentDonasi_InformasiPenggalangMain from "../../component/detail_main/informasi_penggalang";
import { MODEL_DONASI } from "../../model/interface";
import { apiGetOneDonasiById } from "../../lib/api_donasi";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";

export default function DetailPublishDonasi() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_DONASI | null>(null);
  const [countDonatur, setCountDonatur] = useState<number | null>(null);
  const [userLoginId, setUserLoginId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useShallowEffect(() => {
    handleGetUserId();
    onLoadData();
  }, []);

  async function handleGetUserId() {
    try {
      const response = await apiNewGetUserIdByToken();
      if (response) {
        setUserLoginId(response.userId);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onLoadData() {
    try {
      setLoading(true);
      const response = await apiGetOneDonasiById(param.id, "semua");
      const responseCountDonatur = await apiGetOneDonasiById(param.id, "count");

      if (response.success) {
        setData(response.data);
      }
      if (responseCountDonatur.success) {
        setCountDonatur(responseCountDonatur.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !userLoginId || !data || countDonatur === null) {
    return <CustomSkeleton height={400} />;
  }
  return (
    <>
      {/* <pre>{JSON.stringify(donasi,null,2)}</pre> */}
      <Stack spacing={"xl"} pb={"lg"}>
        <ComponentDonasi_DetailDataMain
          donasi={data as any}
          countDonatur={countDonatur as any}
          userLoginId={userLoginId}
        />
        <ComponentDonasi_InformasiPenggalangMain author={data?.Author as any} />
        <ComponentDonasi_CeritaPenggalangMain donasi={data as any} />
      </Stack>
    </>
  );
}
