"use client";

import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { Box, Center, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import {
  IconBrandGmail,
  IconGenderFemale,
  IconGenderMale,
  IconHome,
  IconPhone,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Profile_ComponentAvatarProfile,
  Profile_ComponentLoadBackgroundImage,
} from "../profile/_component";
import { MODEL_PROFILE } from "../profile/model/interface";

export function Profile_UiView({
  profile,
  userLoginId,
}: {
  profile: MODEL_PROFILE;
  userLoginId: string;
}) {
  const router = useRouter();
  const [loadingPP, setLoadingPP] = useState(false);
  const [loadingBG, setLoadingBG] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const listInformation = [
    {
      icon: <IconPhone />,
      value: profile?.User.nomor,
    },
    {
      icon: <IconBrandGmail />,
      value: profile?.email,
    },
    {
      icon: <IconHome />,
      value: profile?.alamat,
    },
    {
      icon:
        profile.jenisKelamin === "Laki-laki" ? (
          <IconGenderMale />
        ) : (
          <IconGenderFemale />
        ),
      value: profile?.jenisKelamin,
    },
  ];

  return (
    <>
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
        <Box>
          <Profile_ComponentLoadBackgroundImage
            fileId={profile.imageBackgroundId as any}
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
                fileId={profile.imageId as any}
                style={{
                  borderStyle: "solid",
                  borderColor: AccentColor.darkblue,
                  borderWidth: "2px",
                }}
              />
            </Center>
            <Stack align="center" c={"white"} mt={"xs"} spacing={0}>
              <Text fw={"bold"} lineClamp={1}>
                {profile?.name}
              </Text>
              <Text fs={"italic"} fz={"sm"} lineClamp={1}>
                @{profile?.User?.username}
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
      </Stack>
    </>
  );
}
