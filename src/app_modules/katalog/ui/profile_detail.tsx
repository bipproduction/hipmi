import { AccentColor } from "@/app_modules/_global/color";
import { apiGetUserProfile, IUserProfile } from "@/app_modules/user";
import { Box, Center, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconBrandGmail, IconGenderFemale, IconGenderMale, IconHome, IconPhone } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Profile_ComponentAvatarProfile, Profile_ComponentLoadBackgroundImage } from "../profile/_component";
import SkeletonProfile from "./skeleton_profile";

export default function ProfileDetail() {
   const param = useParams<{ id: string }>()
   const [loading, setLoading] = useState(true)
   const [dataProfile, setDataProfile] = useState<IUserProfile>()
   const listInformation = [
      {
         icon: <IconPhone />,
         value: "+" + dataProfile?.nomor,
      },
      {
         icon: <IconBrandGmail />,
         value: dataProfile?.email,
      },
      {
         icon: <IconHome />,
         value: dataProfile?.alamat,
      },
      {
         icon:
            dataProfile?.jenisKelamin === "Laki-laki" ? (
               <IconGenderMale />
            ) : (
               <IconGenderFemale />
            ),
         value: dataProfile?.jenisKelamin,
      },
   ];


   async function getProfile() {
      try {
         setLoading(true)
         const response = await apiGetUserProfile(`?profile=${param.id}`)
         if (response.success) {
            setDataProfile(response.data);
         }
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }


   useShallowEffect(() => {
      getProfile()
   }, []);

   return <>
      <Stack
         spacing={0}
         style={{
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px ",
            padding: "15px",
            color: "white",
         }}
      >
         {
            loading ?
               <SkeletonProfile /> :
               <>
                  <Box>
                     <Profile_ComponentLoadBackgroundImage
                        fileId={dataProfile?.imageBackgroundId as any}
                        size={500}
                     />

                     <Box
                        sx={{
                           position: "relative",
                           bottom: 60,
                           margin: "auto",
                           width: "100%",
                           marginBottom: -30,
                        }}
                     >
                        <Center>
                           <Profile_ComponentAvatarProfile
                              fileId={dataProfile?.imageId as any}
                              style={{
                                 borderStyle: "solid",
                                 borderColor: AccentColor.darkblue,
                                 borderWidth: "2px",
                              }}
                           />
                        </Center>
                        <Stack align="center" c={"white"} mt={"xs"} spacing={0}>
                           <Text fw={"bold"} lineClamp={1}>
                              {dataProfile?.name}
                           </Text>
                           <Text fs={"italic"} fz={"sm"} lineClamp={1}>
                              @{dataProfile?.username}
                           </Text>
                        </Stack>
                     </Box>
                  </Box>
                  <Box>
                     <Stack spacing={"xs"}>
                        {listInformation.map((e, i) => (
                           <Group key={i} align="flex-start">
                              <ThemeIcon
                                 style={{
                                    backgroundColor: "transparent",
                                 }}
                              >
                                 {e.icon}
                              </ThemeIcon>
                              <Box w={"85%"}>
                                 <Text fw={"bold"}>{e?.value}</Text>
                              </Box>
                           </Group>
                        ))}
                     </Stack>
                  </Box>
               </>
         }
      </Stack>
   </>;
}