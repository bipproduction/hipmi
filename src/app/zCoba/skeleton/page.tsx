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
          <Grid align="center">
            <Grid.Col span={2}>
              <CustomSkeleton height={40} width={40} circle />
            </Grid.Col>
            <Grid.Col span={4}>
              <CustomSkeleton height={20} width={"100%"} />
            </Grid.Col>
            <Grid.Col span={3} offset={3}>
              <Group position="right">
                <CustomSkeleton height={20} width={"50%"} />
              </Group>
            </Grid.Col>
          </Grid>

          <Stack>
            <CustomSkeleton height={20} width={"100%"} radius={"xl"} />
            <CustomSkeleton height={20} width={"100%"} radius={"xl"} />
          </Stack>
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
