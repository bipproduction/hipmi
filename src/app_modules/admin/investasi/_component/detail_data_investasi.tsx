import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Paper, Stack, Title, Grid, Box, Text } from "@mantine/core";

export function ComponentAdminInvestasi_DetailData({ data }: { data: any }) {
  return (
    <>
      <Paper bg={AdminColor.softBlue} p={"lg"}>
        <Stack c={AdminColor.white}>
          <Title order={3}>Rincian Data Investasi</Title>
          <Grid justify="center">
            <Grid.Col span={6}>
              <Stack>
                <Box>
                  <Text>Judul</Text>
                  <Text fw={"bold"}>{data?.title}</Text>
                </Box>

                <Box>
                  <Text>Dana Dibutuhkan</Text>
                  <Text fw={"bold"}>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumFractionDigits: 10,
                    }).format(+data.targetDana)}
                  </Text>
                </Box>

                <Box>
                  <Text>Harga Per Lembar</Text>
                  <Text fw={"bold"}>
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumFractionDigits: 10,
                    }).format(+data.hargaLembar)}{" "}
                  </Text>
                </Box>

                <Box>
                  <Text>Total Lembar</Text>
                  <Text fw={"bold"}>
                    {" "}
                    {new Intl.NumberFormat("id-ID", {
                      maximumFractionDigits: 10,
                    }).format(+data.totalLembar)}{" "}
                    lembar
                  </Text>
                </Box>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack>
                <Box>
                  <Text>ROI</Text>
                  <Text fw={"bold"}>{data.roi} %</Text>
                </Box>

                <Box>
                  <Text>Pembagian Deviden</Text>
                  <Text fw={"bold"}>{data.MasterPeriodeDeviden.name}</Text>
                </Box>

                <Box>
                  <Text>Jadwal Pembagian</Text>
                  <Text fw={"bold"}>
                    {data.MasterPembagianDeviden.name} bulan{" "}
                  </Text>
                </Box>

                <Box>
                  <Text>Pencarian Investor</Text>
                  <Text fw={"bold"}>
                    {data.MasterPencarianInvestor.name} hari{" "}
                  </Text>
                </Box>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </>
  );
}
