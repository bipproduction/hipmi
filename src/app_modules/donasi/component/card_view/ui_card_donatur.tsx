import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Paper, Grid, Center, Stack, Title, Group, Text } from "@mantine/core";
import { IconMoodSmileBeam } from "@tabler/icons-react";
import { MODEL_DONASI_INVOICE } from "../../model/interface";
import TampilanRupiahDonasi from "../tampilan_rupiah";
import moment from "moment";
import "moment/locale/id";

export function ComponentDonasi_CardDonatur({ data }: { data: MODEL_DONASI_INVOICE }){
    return (
      <>
        <Paper
          style={{
            backgroundColor: AccentColor.blue,
            border: `2px solid ${AccentColor.darkblue}`,
            padding: "15px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "white",
            marginBottom: "10px",
          }}
        >
          <Grid>
            <Grid.Col span={3}>
              <Center h={"100%"}>
                {/* <Avatar variant="filled" radius={"xl"} size={"md"} /> */}
                <IconMoodSmileBeam size={50} />
              </Center>
            </Grid.Col>
            <Grid.Col span={9}>
              <Stack spacing={0}>
                <Title order={5}>{data.Author.username}</Title>
                <Group spacing={"xs"}>
                  <Text fz={"xs"}>Berdonasi sebesar</Text>
                  <Text truncate fw={"bold"}>
                    <TampilanRupiahDonasi nominal={+data.nominal} />
                  </Text>
                </Group>
                <Text fz={"xs"}>
                  {moment(data.createdAt).format("DD MMM YYYY")}
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>
      </>
    );
}