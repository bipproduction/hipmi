import { Grid, Stack, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { MainColor } from "../color/color_pallet";
import { ComponentGlobal_CardStyles } from "./comp_card_box_and_background";

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
      <ComponentGlobal_CardStyles>
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
      </ComponentGlobal_CardStyles>
    </>
  );
}
