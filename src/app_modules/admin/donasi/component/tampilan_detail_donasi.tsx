"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import TampilanRupiahDonasi from "@/app_modules/donasi/component/tampilan_rupiah";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import {
  Paper,
  Stack,
  Title,
  Box,
  AspectRatio,
  Group,
  Image,
  Text,
  ScrollArea,
} from "@mantine/core";
import { Admin_ComponentLoadImageLandscape } from "../../_admin_global";
import ComponentAdminGlobal_TampilanRupiahDonasi from "../../_admin_global/tampilan_rupiah";
import { ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function ComponentAdminDonasi_TampilanDetailDonasi({
  donasi,
}: {
  donasi: MODEL_DONASI;
}) {
  return (
    <>
      <Paper radius={"md"} p={"md"} bg={AdminColor.softBlue} mah={500}>
        <ScrollArea h={`${400}dvh`}>
          <Stack>
            <Title c={AdminColor.white} order={5}>
              Detail Data Donasi
            </Title>
            
            <Stack>
              <Box>
                <Admin_ComponentLoadImageLandscape fileId={donasi.imageId} />
              </Box>

              <Stack spacing={0}>
                <Title c={AdminColor.white} order={4}>
                  {donasi.title}
                </Title>
                <Text c={AdminColor.white} fz={"xs"}>
                  Durasi: {donasi.DonasiMaster_Durasi.name} hari
                </Text>
              </Stack>

              <Stack spacing={0}>
                <Group>
                  <Text fz={12} c={AdminColor.white}>
                    Dana dibutuhkan
                  </Text>
                  <Title order={4} c="blue">
                    <ComponentGlobal_TampilanRupiah
                      color={AdminColor.yellow}
                      nominal={+donasi.target}
                    />
                  </Title>
                </Group>
                <Group>
                  <Text c={AdminColor.white} fz={12}>
                    Kategori
                  </Text>
                  <Title order={4} c="blue">
                    {donasi.DonasiMaster_Ketegori.name}
                  </Title>
                </Group>
              </Stack>
            </Stack>
          </Stack>
        </ScrollArea>
      </Paper>
    </>
  );
}
