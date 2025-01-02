"use client";

import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Grid, Skeleton, Stack } from "@mantine/core";

export default function Voting_ComponentSkeletonViewPuh() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Skeleton Maker" />}
      >
        <Stack>
          <ComponentGlobal_CardStyles marginBottom={"0"}>
            <Stack>
              <Skeleton h={20} w={100} />

              {Array.from(new Array(2)).map((e, i) => (
                <Grid align="center" gutter={"md"} key={i}>
                  <Grid.Col span={"content"}>
                    <Skeleton circle height={40} />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Skeleton height={20} w={150} />
                  </Grid.Col>
                </Grid>
              ))}
            </Stack>
          </ComponentGlobal_CardStyles>

          {/* <ComponentGlobal_CardStyles marginBottom={"0"}>
            <Stack spacing={"xl"}>
              <Grid align="center" gutter={"md"}>
                <Grid.Col span={"content"}>
                  <Skeleton circle height={40} />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Skeleton height={20} w={150} />
                </Grid.Col>
              </Grid>
              <Center>
                <Skeleton height={15} w={200} />
              </Center>

              <Grid align="center" gutter={"md"}>
                <Grid.Col span={"content"}>
                  <Skeleton h={15} w={70} />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Skeleton height={15} w={200} />
                </Grid.Col>
              </Grid>

              <Grid align="center" gutter={"md"}>
                <Grid.Col span={"content"}>
                  <Skeleton h={15} w={70} />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Skeleton height={15} w={200} />
                </Grid.Col>
              </Grid>

              <Skeleton height={15} w={100} />
              <Skeleton height={15} w={"100%"} />
              <Skeleton height={15} w={100} />
              <Skeleton height={15} w={"100%"} />
            </Stack>
          </ComponentGlobal_CardStyles> */}

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
