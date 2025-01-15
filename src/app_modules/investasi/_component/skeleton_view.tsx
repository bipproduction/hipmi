import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Box, Center, Stack } from "@mantine/core";

export { Investasi_SkeletonEditProspektus, Investasi_SkeletonListDokumen };

function Investasi_SkeletonEditProspektus() {
  return (
    <>
      <Stack>
        <CustomSkeleton h={70} radius={"md"} />
        <CustomSkeleton h={70} radius={"md"} />
        <Center>
          <CustomSkeleton h={40} w={100} radius={"xl"} />
        </Center>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            style={{
              transition: "all 0.3s ease",
              position: "absolute",
              bottom: 20,
              width: "90%",
            }}
          >
            <CustomSkeleton h={40} width={"100%"} radius={"xl"} />
          </Box>
        </Box>
      </Stack>
    </>
  );
}

function Investasi_SkeletonListDokumen() {
  return (
    <>
      <Stack>
        <CustomSkeleton h={70} radius={"md"} />
        <CustomSkeleton h={70} radius={"md"} />
      </Stack>
    </>
  );
}
