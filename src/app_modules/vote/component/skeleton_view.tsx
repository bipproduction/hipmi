import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Center, Grid, Group, Stack } from "@mantine/core";

export {
  Voting_ComponentSkeletonDetail,
  Voting_ComponentSkeletonViewKontribusi,
  Voting_ComponentSkeletonViewPublish,
  Voting_ComponentSkeletonViewStatus,
  Voting_ComponentSkeletonDaftarKontributor,
};

function Voting_ComponentSkeletonViewPublish() {
  return (
    <>
      {Array.from({ length: 2 }).map((e, i) => (
        <ComponentGlobal_CardStyles key={i} marginBottom={"0"}>
          <Stack spacing={"lg"}>
            <Grid align="center">
              <Grid.Col span={"content"}>
                <CustomSkeleton circle height={40} />
              </Grid.Col>
              <Grid.Col span={4}>
                <CustomSkeleton height={20} w={150} />
              </Grid.Col>
            </Grid>

            <Stack align="center">
              <CustomSkeleton height={20} w={150} />
              <CustomSkeleton height={20} w={300} />
              {/* <CustomSkeleton height={20} w={70} /> */}
            </Stack>

            <Grid grow>
              {Array.from({ length: 2 }).map((e, i) => (
                <Grid.Col span={4} key={i}>
                  <Stack align="center">
                    <CustomSkeleton circle height={70} />
                    <CustomSkeleton height={20} w={50} />
                  </Stack>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </ComponentGlobal_CardStyles>
      ))}
    </>
  );
}

function Voting_ComponentSkeletonViewStatus() {
  return (
    <>
      {Array.from({ length: 2 }).map((e, i) => (
        <ComponentGlobal_CardStyles key={i}>
          <Stack align="center" spacing="lg">
            <CustomSkeleton height={20} w={150} />
            <CustomSkeleton height={20} w={300} />
          </Stack>
        </ComponentGlobal_CardStyles>
      ))}
    </>
  );
}

function Voting_ComponentSkeletonViewKontribusi() {
  return (
    <>
      {Array.from({ length: 2 }).map((e, i) => (
        <ComponentGlobal_CardStyles key={i} marginBottom={"0"}>
          <Stack spacing={"lg"}>
            <Grid align="center">
              <Grid.Col span={"content"}>
                <CustomSkeleton circle height={40} />
              </Grid.Col>
              <Grid.Col span={4}>
                <CustomSkeleton height={20} w={150} />
              </Grid.Col>
            </Grid>

            <Stack align="center">
              <CustomSkeleton height={20} w={150} />
              <CustomSkeleton height={20} w={300} />
            </Stack>

            <Group position="center" spacing={100}>
              <Stack align="center">
                <CustomSkeleton circle height={70} />
                <CustomSkeleton height={20} w={50} />
              </Stack>
              <Stack align="center">
                <CustomSkeleton circle height={70} />
                <CustomSkeleton height={20} w={50} />
              </Stack>
            </Group>

            <Stack align="center">
              <CustomSkeleton height={15} w={50} /> <CustomSkeleton height={20} w={50} />
            </Stack>
          </Stack>
        </ComponentGlobal_CardStyles>
      ))}
    </>
  );
}

function Voting_ComponentSkeletonDetail() {
  return (
    <>
      <Stack>
        <ComponentGlobal_CardStyles marginBottom={"0"}>
          <Stack spacing={"xl"}>
            <Grid align="center">
              <Grid.Col span={"content"}>
                <CustomSkeleton circle height={40} />
              </Grid.Col>
              <Grid.Col span={4}>
                <CustomSkeleton height={20} w={150} />
              </Grid.Col>
            </Grid>

            <Stack align="center">
              <CustomSkeleton height={20} w={150} />
              <CustomSkeleton height={20} w={"100%"} />
              <CustomSkeleton height={20} w={"100%"} />
              <CustomSkeleton height={20} w={"100%"} />
              <CustomSkeleton height={20} w={50} />
              <CustomSkeleton height={20} w={200} />
            </Stack>

            {/* <Stack>
              <CustomSkeleton height={20} w={70} />
              <CustomSkeleton height={20} w={150} />
              <CustomSkeleton height={20} w={150} />
            </Stack> */}

            <Stack align="center">
              <CustomSkeleton height={20} w={70} />
            </Stack>
          </Stack>
        </ComponentGlobal_CardStyles>

        <ComponentGlobal_CardStyles>
          <Stack>
            <Center>
              <CustomSkeleton h={20} w={"30%"} />
            </Center>

            <Group position="center" spacing={50}>
              <Stack align="center">
                <CustomSkeleton circle height={70} />
                <CustomSkeleton height={20} w={50} />
              </Stack>
              <Stack align="center">
                <CustomSkeleton circle height={70} />
                <CustomSkeleton height={20} w={50} />
              </Stack>
            </Group>
          </Stack>
        </ComponentGlobal_CardStyles>
      </Stack>
    </>
  );
}

function  Voting_ComponentSkeletonDaftarKontributor(){
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
            <Grid.Col span={3} offset={3}>
              <CustomSkeleton height={20} w={150} />
            </Grid.Col>
          </Grid>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}