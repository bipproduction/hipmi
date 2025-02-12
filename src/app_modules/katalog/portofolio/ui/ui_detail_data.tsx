import { APIs } from "@/lib";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_LoadImage } from "@/app_modules/_global/component";
import {
  Box,
  Divider,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconListDetails,
  IconMapPin,
  IconPhoneCall,
  IconPinned,
} from "@tabler/icons-react";
import { MODEL_PORTOFOLIO } from "../model/interface";

export function Portofolio_UiDetailData({
  dataPorto,
}: {
  dataPorto: MODEL_PORTOFOLIO;
}) {
  return (
    <>
      <Paper
        p={"sm"}
        style={{
          backgroundColor: AccentColor.darkblue,
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px ",
          padding: "15px",
          color: "white",
        }}
      >
        <Stack>
          <Group position="apart">
            <Title order={6}>Data Bisnis</Title>
            <Text color={MainColor.yellow} fw={"bold"}>
              id: {"  "}
              <Text span inherit>
                #{dataPorto.id_Portofolio}
              </Text>
            </Text>
          </Group>
          <Stack>
            <SimpleGrid
              cols={2}
              spacing={"md"}
              breakpoints={[
                { maxWidth: "62rem", cols: 2, spacing: "md" },
                { maxWidth: "48rem", cols: 1, spacing: "sm" },
                { maxWidth: "36rem", cols: 1, spacing: "sm" },
              ]}
            >
              <Box>
                <Paper>
                  <ComponentGlobal_LoadImage fileId={dataPorto.logoId} />
                </Paper>
              </Box>

              <Box>
                <Grid>
                  <Grid.Col span={2}>
                    <IconBuildingSkyscraper />
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text>{dataPorto?.namaBisnis}</Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={2}>
                    <IconListDetails />
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text>{dataPorto?.MasterBidangBisnis.name}</Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={2}>
                    <IconPhoneCall />
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text>+{dataPorto?.tlpn}</Text>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={2}>
                    <IconMapPin />
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text>{dataPorto?.alamatKantor}</Text>
                  </Grid.Col>
                </Grid>
              </Box>
            </SimpleGrid>
          </Stack>

          <Divider color={AccentColor.softblue} />

          <Stack spacing={5}>
            <Group spacing={"xs"}>
              <IconPinned />
              <Text fz={"sm"} fw={"bold"}>
                Tentang Kami
              </Text>
            </Group>
            <Text px={"sm"}>{dataPorto?.deskripsi}</Text>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
