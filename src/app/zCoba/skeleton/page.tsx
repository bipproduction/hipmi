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
        header={<UIGlobal_LayoutHeaderTamplate title="Skeleton Maker" />}
      >
        <Stack>
          <ComponentGlobal_CardStyles marginBottom={"0"}>
            <Stack spacing={"xl"}>
              <Grid align="center" gutter={"md"}>
                <Grid.Col span={"content"}>
                  <Skeleton circle height={40} />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Skeleton height={20} w={150} />
                </Grid.Col>
                <Grid.Col span={3} offset={3}>
                  <Skeleton height={20} w={150} />
                </Grid.Col>
              </Grid>
            </Stack>
          </ComponentGlobal_CardStyles>

          {/* <ComponentGlobal_CardStyles>
            <Stack>
              <Center>
                <Skeleton h={20} w={"30%"} />
              </Center>

              <Group position="center" spacing={50}>
                <Stack align="center">
                  <Skeleton circle height={70} />
                  <Skeleton height={20} w={50} />
                </Stack>
                <Stack align="center">
                  <Skeleton circle height={70} />
                  <Skeleton height={20} w={50} />
                </Stack>
              </Group>
            </Stack>
          </ComponentGlobal_CardStyles> */}
        </Stack>
      </UIGlobal_LayoutTamplate>
    </>
  );
}
