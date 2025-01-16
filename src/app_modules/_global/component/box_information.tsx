import { Center, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { AccentColor, MainColor } from "../color/color_pallet";
import { IconInfoCircle } from "@tabler/icons-react";

export default function ComponentGlobal_BoxInformation({
  informasi,
  isReport,
  fonsize,
}: {
  informasi: string;
  isReport?: boolean;
  fonsize?: number | string;
}) {
  return (
    <>
      <Paper
        bg={"blue.3"}
        p={10}
        style={{
          backgroundColor: AccentColor.blue,
          border: `2px solid ${AccentColor.softblue}`,
          borderRadius: "10px",
        }}
      >
        {isReport ? (
          <Stack spacing={0}>
            <Text
              fz={fonsize ? fonsize : 12}
              fs={"italic"}
              c={"orange"}
              fw={"bold"}
            >
              * Report
            </Text>
            <Text fz={fonsize ? fonsize : 12} c={MainColor.white}>
              {informasi}
            </Text>
          </Stack>
        ) : (
          <Grid>
            <Grid.Col span={1}>
              <IconInfoCircle color={MainColor.white} />
            </Grid.Col>
            <Grid.Col span={10}>
              <Text
                fz={fonsize ? fonsize : 12}
                span
                inherit
                c={MainColor.white}
                fw={"normal"}
              >
                {informasi}
              </Text>
            </Grid.Col>
          </Grid>
        )}
      </Paper>
    </>
  );
}
