"use client";
import { Stack } from "@mantine/core";
import Portofolio_UiDetailDataNew from "./ui_detail_data_new";
import Portofolio_UiMapNew from "./ui_detail_map_new";
import Portofolio_UiSosialMediaNew from "./ui_detail_media_new";
import ComponentPortofolio_ButtonDeleteNew from "../component/button_delete_new";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";

export default function Portofolio_UiDetailNew({
  mapboxToken,
}: {
  mapboxToken: string;
}) {
  const [userLoginId, setUserLoginId] = useState("");

  useShallowEffect(() => {
    onLoadDataUser();
  }, []);

  async function onLoadDataUser() {
    try {
      const response = await apiNewGetUserIdByToken();
      if (response.success) {
        setUserLoginId(response.userId);
      } else {
        console.error("Error get user id", response.message);
        setUserLoginId("");
      }
    } catch (error) {
      console.error("Error get user id", error);
      setUserLoginId("");
    }
  }
  return (
    <>
      <Stack mb={"lg"}>
        <Portofolio_UiDetailDataNew />
        <Portofolio_UiMapNew mapboxToken={mapboxToken} />
        <Portofolio_UiSosialMediaNew />
        <ComponentPortofolio_ButtonDeleteNew userLoginId={userLoginId} />
      </Stack>
    </>
  );
}
