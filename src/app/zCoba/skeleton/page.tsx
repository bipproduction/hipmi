"use client";

import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Button, Center, Grid, Group, Skeleton, Stack } from "@mantine/core";
import Link from "next/link";

export default function Voting_ComponentSkeletonViewPuh() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Skeleton Maker" />}
      >
        <Stack>
          <Center>
            <CustomSkeleton height={100} width={100} circle />
          </Center>

          <Grid grow>
            <Grid.Col span={6}>
              <Stack spacing={"xs"}>
                <CustomSkeleton height={20} width={"80%"} />
                <CustomSkeleton height={20} width={"80%"} />
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Group position="right">
                <CustomSkeleton height={50} width={"80%"} radius={"xl"} />
              </Group>
            </Grid.Col>
          </Grid>
        </Stack>

        {/* <Stack spacing={"xl"} p={"sm"}>
          {Array.from({ length: 4 }).map((_, i) => (
            <CustomSkeleton key={i} height={50} width={"100%"} />
          ))}
          <CustomSkeleton height={100} width={"100%"} />
          <CustomSkeleton radius="xl" height={50} width={"100%"} />
        </Stack> */}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
