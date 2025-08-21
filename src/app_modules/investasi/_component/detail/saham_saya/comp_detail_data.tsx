import {
  ComponentGlobal_AvatarAndUsername,
  ComponentGlobal_CardStyles,
  ComponentGlobal_LoadImageLandscape,
} from "@/app_modules/_global/component";
import { MODEL_INVOICE_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { Box, Grid, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { Investasi_ComponentBoxDaftarBerita } from "../comp_box_daftar_berita";
import { Investasi_ComponentBoxDaftarDokumen } from "../comp_box_daftar_dokumen";
import { Investasi_ComponentBoxProspektus } from "../comp_box_prospektus";
import { MainColor } from "@/app_modules/_global/color";
import { Investasi_ComponentBoxInvestor } from "../comp_box_investor";

export function Investasi_ComponentBoxDetailData({
  data,
}: {
  data: MODEL_INVOICE_INVESTASI;
}) {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <ComponentGlobal_AvatarAndUsername
            profile={data?.Author.Profile as any}
          />

          <ComponentGlobal_LoadImageLandscape fileId={data.Investasi.imageId} />

          <Title c={MainColor.white} order={3} mb={"xs"} align="center">
            {data?.Investasi.title}
          </Title>

          {/* Rincian Data */}
          <Grid mb={"md"}>
            <Grid.Col span={6}>
              <Stack>
                <Box>
                  <Text>Dana Dibutuhkan</Text>
                  <Text fw={"bold"}>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumSignificantDigits: 10,
                    }).format(+data?.Investasi.targetDana)}
                  </Text>
                </Box>
                <Box>
                  <Text>Harga Per Lembar</Text>
                  <Text fw={"bold"}>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumSignificantDigits: 10,
                    }).format(+data?.Investasi.hargaLembar)}
                  </Text>
                </Box>
                <Box>
                  <Text>Jadwal Pembagian</Text>
                  <Text fw={"bold"}>
                    {data?.Investasi?.MasterPembagianDeviden?.name} bulan{" "}
                  </Text>
                </Box>
                <Box>
                  <Text>Pembagian Deviden</Text>
                  <Text fw={"bold"}>
                    {data?.Investasi?.MasterPeriodeDeviden?.name}
                  </Text>
                </Box>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack>
                <Box>
                  <Text>Investor</Text>
                  <Text fw={"bold"}>
                    {new Intl.NumberFormat("id-ID", {
                      maximumSignificantDigits: 10,
                    }).format(data?.Investor?.length)}
                  </Text>
                </Box>
                <Box>
                  <Text>ROI</Text>
                  <Text fw={"bold"}>{data?.Investasi.roi}%</Text>
                </Box>
                <Box>
                  <Text>Total Lembar</Text>
                  <Text fw={"bold"}>
                    {new Intl.NumberFormat("id-ID", {
                      maximumSignificantDigits: 10,
                    }).format(+data?.Investasi.totalLembar)}{" "}
                    lembar
                  </Text>
                </Box>
                <Box>
                  <Text>Sisa Lembar</Text>
                  <Text fw={"bold"}>
                    {new Intl.NumberFormat("id-ID", {
                      maximumSignificantDigits: 10,
                    }).format(+data?.Investasi.sisaLembar)}{" "}
                    lembar
                  </Text>
                </Box>
              </Stack>
            </Grid.Col>
          </Grid>

          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: "62rem", cols: 3, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <Investasi_ComponentBoxInvestor id={data.Investasi.id} />

            <Investasi_ComponentBoxProspektus
              prospektusFileId={data.Investasi.prospektusFileId}
            />
            <Investasi_ComponentBoxDaftarDokumen
              investasiId={data?.Investasi?.id}
            />
            <Investasi_ComponentBoxDaftarBerita
              investasiId={data?.Investasi?.id}
            />
          </SimpleGrid>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
