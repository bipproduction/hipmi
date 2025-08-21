import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Center, Grid, Group, Skeleton, Stack } from "@mantine/core";

export {
  Collaboration_SkeletonBeranda,
  Collaboration_SkeletonCreate,
  Collaboration_SkeletonDetail,
  Collaboration_SkeletonDetailInfoGroup,
  Collaboration_SkeletonGrup,
  Collaboration_SkeletonListPartisipan,
  Collaboration_SkeletonListPrtisipanIsUser,
};

function Collaboration_SkeletonCreate() {
  return (
    <>
      <Stack px={"xl"} spacing={"md"}>
        <Stack spacing={"xs"}>
          <CustomSkeleton height={15} width={50} />
          <CustomSkeleton height={40} />
        </Stack>
        <Stack spacing={"xs"}>
          <CustomSkeleton height={15} width={50} />
          <CustomSkeleton height={40} />
        </Stack>
        <Stack spacing={"xs"}>
          <CustomSkeleton height={15} width={50} />
          <CustomSkeleton height={40} />
        </Stack>
        <Stack spacing={"xs"}>
          <CustomSkeleton height={15} width={50} />
          <CustomSkeleton height={130} />
        </Stack>
        <Stack spacing={"xs"}>
          <CustomSkeleton height={15} width={50} />
          <CustomSkeleton height={130} />
        </Stack>

        <CustomSkeleton mt={50} height={40} radius={"xl"} />
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
                <CustomSkeleton circle height={40} />
              </Grid.Col>
              <Grid.Col span={3}>
                <CustomSkeleton height={20} w={150} />
              </Grid.Col>
              {/* <Grid.Col span={3} offset={3}>
                  <CustomSkeleton height={20} w={150} />
                </Grid.Col> */}
            </Grid>
            <Center>
              <CustomSkeleton height={15} w={200} />
            </Center>

            <Grid align="center" gutter={"md"}>
              <Grid.Col span={"content"}>
                <CustomSkeleton h={15} w={70} />
              </Grid.Col>
              <Grid.Col span={3}>
                <CustomSkeleton height={15} w={200} />
              </Grid.Col>
            </Grid>

            <Grid align="center" gutter={"md"}>
              <Grid.Col span={"content"}>
                <CustomSkeleton h={15} w={70} />
              </Grid.Col>
              <Grid.Col span={3}>
                <CustomSkeleton height={15} w={200} />
              </Grid.Col>
            </Grid>

            <Stack spacing={"md"}>
              <CustomSkeleton height={15} w={150} />
              <CustomSkeleton height={15} w={"100%"} />
              <CustomSkeleton height={15} w={"100%"} />
            </Stack>

            <Center>
              <CustomSkeleton height={15} w={100} />
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
          <Group position="apart">
            <Stack>
              <CustomSkeleton h={15} w={100} />
              <CustomSkeleton h={15} w={50} />
            </Stack>

            <CustomSkeleton circle height={20} />
          </Group>
        </ComponentGlobal_CardStyles>
      ))}
    </>
  );
}

function Collaboration_SkeletonDetail() {
  return (
    <>
      <ComponentGlobal_CardStyles marginBottom={"0"}>
        <Stack spacing={"xl"}>
          <Grid align="center" gutter={"md"}>
            <Grid.Col span={"content"}>
              <CustomSkeleton circle height={40} />
            </Grid.Col>
            <Grid.Col span={3}>
              <CustomSkeleton height={20} w={150} />
            </Grid.Col>
          </Grid>
          <Center>
            <CustomSkeleton height={20} w={200} />
          </Center>

          <Grid align="center" gutter={"md"}>
            <Grid.Col span={"content"}>
              <CustomSkeleton h={20} w={70} />
            </Grid.Col>
            <Grid.Col span={3}>
              <CustomSkeleton height={20} w={200} />
            </Grid.Col>
          </Grid>

          <Grid align="center" gutter={"md"}>
            <Grid.Col span={"content"}>
              <CustomSkeleton h={20} w={70} />
            </Grid.Col>
            <Grid.Col span={3}>
              <CustomSkeleton height={20} w={200} />
            </Grid.Col>
          </Grid>

          <CustomSkeleton height={20} w={100} />
          <CustomSkeleton height={20} w={"100%"} />
          <CustomSkeleton height={20} w={100} />
          <CustomSkeleton height={20} w={"100%"} />
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}

function Collaboration_SkeletonListPrtisipanIsUser() {
  return (
    <>
      <Stack>
        <ComponentGlobal_CardStyles marginBottom={"0"}>
          <Stack>
            <Center>
              <CustomSkeleton h={20} w={100} />
            </Center>

            {Array.from(new Array(2)).map((e, i) => (
              <Grid align="center" gutter={"md"} key={i}>
                <Grid.Col span={"content"}>
                  <CustomSkeleton circle height={40} />
                </Grid.Col>
                <Grid.Col span={3}>
                  <CustomSkeleton height={20} w={150} />
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </ComponentGlobal_CardStyles>
      </Stack>
    </>
  );
}

function Collaboration_SkeletonListPartisipan() {
  return (
    <>
      <Stack>
        <Center>
          <CustomSkeleton h={40} w={150} radius={"xl"} />
        </Center>
        <ComponentGlobal_CardStyles marginBottom={"0"}>
          <Stack>
            <Center>
              <CustomSkeleton h={20} w={100} />
            </Center>

            {Array.from(new Array(2)).map((e, i) => (
              <Grid align="center" gutter={"md"} key={i}>
                <Grid.Col span={"content"}>
                  <CustomSkeleton circle height={40} />
                </Grid.Col>
                <Grid.Col span={3}>
                  <CustomSkeleton height={20} w={150} />
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </ComponentGlobal_CardStyles>
      </Stack>
    </>
  );
}

function Collaboration_SkeletonDetailInfoGroup() {
  return (
    <>
      <Stack>
        <ComponentGlobal_CardStyles marginBottom={"0"}>
          <Stack spacing={"xl"}>
            <Center>
              <CustomSkeleton height={20} w={200} />
            </Center>

            <Grid align="center" gutter={"md"}>
              <Grid.Col span={"content"}>
                <CustomSkeleton h={20} w={70} />
              </Grid.Col>
              <Grid.Col span={3}>
                <CustomSkeleton height={20} w={200} />
              </Grid.Col>
            </Grid>

            <Grid align="center" gutter={"md"}>
              <Grid.Col span={"content"}>
                <CustomSkeleton h={20} w={70} />
              </Grid.Col>
              <Grid.Col span={3}>
                <CustomSkeleton height={20} w={200} />
              </Grid.Col>
            </Grid>

            <CustomSkeleton height={20} w={100} />
            <CustomSkeleton height={20} w={"100%"} />
            <CustomSkeleton height={20} w={"100%"} />
            <CustomSkeleton height={20} w={100} />
            <CustomSkeleton height={20} w={"100%"} />
            <CustomSkeleton height={20} w={"100%"} />
          </Stack>
        </ComponentGlobal_CardStyles>

        <ComponentGlobal_CardStyles marginBottom={"0"}>
          <Stack>
            <CustomSkeleton h={20} w={100} />

            {Array.from(new Array(2)).map((e, i) => (
              <Grid align="center" gutter={"md"} key={i}>
                <Grid.Col span={"content"}>
                  <CustomSkeleton circle height={40} />
                </Grid.Col>
                <Grid.Col span={3}>
                  <CustomSkeleton height={20} w={150} />
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </ComponentGlobal_CardStyles>
      </Stack>
    </>
  );
}
