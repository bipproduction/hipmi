import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Center, Grid, Skeleton, Stack } from "@mantine/core";

export {
  Collaboration_SkeletonCreate,
  Collaboration_SkeletonBeranda,
  Collaboration_SkeletonGrup,
};

function Collaboration_SkeletonCreate() {
  return (
    <>
      <Stack px={"xl"} spacing={"lg"}>
        <Stack spacing={"xs"}>
          <Skeleton height={10} width={50} />
          <Skeleton height={40} />
        </Stack>
        <Stack spacing={"xs"}>
          <Skeleton height={10} width={50} />
          <Skeleton height={40} />
        </Stack>
        <Stack spacing={"xs"}>
          <Skeleton height={10} width={50} />
          <Skeleton height={130} />
        </Stack>
        <Stack spacing={"xs"}>
          <Skeleton height={10} width={50} />
          <Skeleton height={130} />
        </Stack>

        <Skeleton mt={50} height={40} radius={"xl"} />
      </Stack>
    </>
  );
}

function Collaboration_SkeletonBeranda() {
  return (
    <>
      {Array.from(new Array(2)).map((e, i) => (
        <ComponentGlobal_CardStyles marginBottom={"15px"} key={i}>
          <Stack spacing={"xl"}>
            <Grid align="center" gutter={"md"}>
              <Grid.Col span={"content"}>
                <Skeleton circle height={40} />
              </Grid.Col>
              <Grid.Col span={3}>
                <Skeleton height={20} w={150} />
              </Grid.Col>
              {/* <Grid.Col span={3} offset={3}>
                  <Skeleton height={20} w={150} />
                </Grid.Col> */}
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

            <Stack spacing={"md"}>
              <Skeleton height={15} w={150} />
              <Skeleton height={15} w={"100%"} />
              <Skeleton height={15} w={"100%"} />
            </Stack>

            <Center>
              <Skeleton height={15} w={100} />
            </Center>
          </Stack>
        </ComponentGlobal_CardStyles>
      ))}
    </>
  );
}

function Collaboration_SkeletonGrup() {
  return (
    <>
      {Array.from(new Array(2)).map((e, i) => (
        <ComponentGlobal_CardStyles marginBottom={"15px"} key={i}>
          <Skeleton h={40} />
        </ComponentGlobal_CardStyles>
      ))}
    </>
  );
}
