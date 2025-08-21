"use client";

import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Stack, Title, Grid, Text, Center, Skeleton } from "@mantine/core";
import { data } from "autoprefixer";

export function Event_ComponentSkeletonDetailData() {
  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"16px"}>
        <Stack px={"sm"} spacing={"lg"}>
          <Center>
            <Skeleton radius={"xl"} h={20} />
          </Center>
          {Array.from(new Array(4)).map((e, i) => (
            <Grid key={i}>
              <Grid.Col span={4}>
                <Skeleton radius={"xl"} h={20} />
              </Grid.Col>
              <Grid.Col span={1}>:</Grid.Col>
              <Grid.Col span={"auto"}>
                <Skeleton radius={"xl"} h={20} />
              </Grid.Col>
            </Grid>
          ))}

          {/* <Stack spacing={"xs"}>
            <Skeleton radius={"xl"} h={20} w={200} />
            <Skeleton radius={"xl"} h={20} />
          </Stack> */}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
