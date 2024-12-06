'use client'
import { Stack } from "@mantine/core";
import Portofolio_UiDetailDataNew from "./ui_detail_data_new";
import Portofolio_UiMapNew from "./ui_detail_map_new";
import Portofolio_UiSosialMediaNew from "./ui_detail_media_new";
import ComponentPortofolio_ButtonDeleteNew from "../component/button_delete_new";

export default function Portofolio_UiDetailNew({ mapboxToken }: { mapboxToken: string }) {
   return (
      <>
         <Stack mb={"lg"}>
            <Portofolio_UiDetailDataNew />
            <Portofolio_UiMapNew mapboxToken={mapboxToken} />
            <Portofolio_UiSosialMediaNew />
            <ComponentPortofolio_ButtonDeleteNew/>
         </Stack>
      </>
   )
}