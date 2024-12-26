import { Avatar, Box, Center, Grid, Skeleton, Stack } from "@mantine/core";

export default function SkeletonProfile() {
   return (
      <>
         <Box mb={"lg"}>
            <Skeleton height={200} radius={"md"} />
            <Box
               sx={{
                  position: "relative",
                  bottom: 60,
                  width: "100%",
                  marginBottom: -30,
               }}
            >
               <Center>
                  <Avatar radius={"50%"} size={100}  />
               </Center>
            </Box>
            <Stack align="center" justify="center" spacing={"xs"}>
               <Skeleton height={15} radius={"md"} width={"50%"} />
               <Skeleton height={15} radius={"md"} width={"50%"} />
            </Stack>

            <Box mt={"lg"}>
               <Stack spacing={"xs"}>
                  {[...Array(4)].map((_, index) => (
                     <Box key={index} py={5}>
                        <Grid align="center">
                           <Grid.Col span={1}>
                              <Skeleton w={25} h={25} />
                           </Grid.Col>
                           <Grid.Col span={11}>
                              <Skeleton w={"50%"} h={15} />
                           </Grid.Col>
                        </Grid>
                     </Box>
                  ))}
               </Stack>
            </Box>
         </Box>
      </>
   )
}