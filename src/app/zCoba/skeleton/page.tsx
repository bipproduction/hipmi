"use client";

import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Center, Grid, Group, Skeleton, Stack } from "@mantine/core";

export default function Voting_ComponentSkeletonViewPuh() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Publish" />}
      >
        <ComponentGlobal_CardStyles marginBottom={"0"}>
          <Stack spacing={"lg"}>
            <Grid align="center">
              <Grid.Col span={"content"}>
                <Skeleton circle height={40} />
              </Grid.Col>
              <Grid.Col span={4}>
                <Skeleton height={20} w={150} />
              </Grid.Col>
            </Grid>

            <Stack align="center">
              <Skeleton height={20} w={150} />
              <Skeleton height={20} w={300} />
            </Stack>

            <Group position="center" spacing={100}>
              <Stack align="center">
                <Skeleton circle height={70} />
                <Skeleton height={20} w={50} />
              </Stack>
              <Stack align="center">
                <Skeleton circle height={70} />
                <Skeleton height={20} w={50} />
              </Stack>
            </Group>

            <Stack align="center">
              <Skeleton height={15} w={50} /> <Skeleton height={20} w={50} />
            </Stack>
          </Stack>
        </ComponentGlobal_CardStyles>
      </UIGlobal_LayoutTamplate>
    </>
  );
}
