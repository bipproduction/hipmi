import { MainColor } from "@/app_modules/_global/color";
import { Grid, Text } from "@mantine/core";
import { data } from "autoprefixer";
import React from "react";

export function Investasi_ComponentTitleAndValueInDetail({
  title,
  value,
}: {
  title: string | React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <>
      <Grid>
        <Grid.Col span={5}>
          <Text c={MainColor.white} fw={"bold"}>{title} </Text>
        </Grid.Col>
        <Grid.Col span={1}>: </Grid.Col>
        <Grid.Col span={6}>{value}</Grid.Col>
      </Grid>
    </>
  );
}
