"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { MODEL_CERITA_DONASI } from "@/app_modules/donasi/model/interface";
import {
  Paper,
  Stack,
  Title,
  Box,
  AspectRatio,
  Image,
  Text,
} from "@mantine/core";
import { Admin_ComponentLoadImageLandscape } from "../../_admin_global";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Comp_SetInnerHTML } from "@/app_modules/_global/component/new/comp_set_inner_html";

export default function ComponentAdminDonasi_CeritaPenggalangDana({
  cerita,
}: {
  cerita: MODEL_CERITA_DONASI;
}) {
  return (
    <>
      {/* <pre>{JSON.stringify(cerita, null, 2)}</pre> */}
      <Paper radius={"md"} p={"md"} bg={AdminColor.softBlue}>
        <Stack>
          <Title c={AdminColor.white} order={5}>
            Cerita Penggalang Dana
          </Title>
          <Comp_SetInnerHTML props={cerita.pembukaan} />

          <Box>
            <Admin_ComponentLoadImageLandscape fileId={cerita.imageId} />
          </Box>

          <Comp_SetInnerHTML props={cerita.cerita} />
        </Stack>
      </Paper>
    </>
  );
}
