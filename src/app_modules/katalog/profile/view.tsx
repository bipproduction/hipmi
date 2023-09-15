"use client";

import {
  ActionIcon,
  Box,
  Button,
  Center,
  FileInput,
  Flex,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { valueCookies } from "../../auth/state/s_token";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import { getDataProfile } from "./fun/get-profile";
import {
  IconAddressBook,
  IconCamera,
  IconEditCircle,
  IconFile,
  IconGenderFemale,
  IconGenderMale,
  IconHome,
  IconMail,
  IconNumber,
  IconUpload,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Warna } from "@/app/lib/warna";
import { MyConsole } from "@/app_modules/fun";
import { gs_Profile, gs_User } from "./state/s_profile";
import { loadDataProfile } from "./load/load_profile";
import { getFotoProfile } from "./fun/get-foto";

export default function ViewProfile({
  dataUser,
  dataProfile,
}: {
  dataUser: any;
  dataProfile: any;
}) {
  const router = useRouter();
  const [valUser, setUser] = useAtom(gs_User);
  const [valProfile, setProfile] = useAtom(gs_Profile);
  const [foto, setFoto] = useState<any | null>(null);

  useShallowEffect(() => {
    loadDataProfile(dataUser.id, setUser, setProfile);
  }, []);


  useShallowEffect(() => {
    if (valProfile?.imagesId != null)
      getFotoProfile(valProfile.imagesId).then((res) => setFoto(res?.url));
  }, [valProfile?.imagesId]);

  return (
    <>
      {/* {JSON.stringify(valUser,null,2)}
      <pre/> */}
      {/* {JSON.stringify(valProfile?.imagesId, null, 2)} */}

      <Center>
        {foto && (
          <Image
            radius={50}
            height={100}
            width={100}
            alt="foto"
            src={foto ? `/api/profile/foto/${foto}` : "/aset/avatar.png"}
          />
        )}
      </Center>

      <Center bg={"blue"}>
        <ActionIcon
          mr={-70}
          mt={-30}
          variant="transparent"
          bg={"gray"}
          radius={50}
          onClick={() => router.push("/dev/katalog/profile/upload")}
          // sx={{ zIndex: 2 }}
        >
          <IconCamera color="black" size={20} />
        </ActionIcon>
      </Center>

      {/* Username dan name */}
      <Group position="apart">
        <Flex direction={"column"} mt={"lg"}>
          <Text fz={"lg"} fw={"bold"}>
            {valProfile?.name}
          </Text>
          <Text fz={"xs"}>@{valUser?.username}</Text>
        </Flex>
        <ActionIcon
          variant="transparent"
          onClick={() => {
            router.push("/dev/katalog/profile/edit");
          }}
        >
          <IconEditCircle color={Warna.hijau_muda} size={20} />
        </ActionIcon>
      </Group>

      {/* Data Profile */}
      <Flex direction={"column"} pt={"lg"}>
        <Grid>
          <Grid.Col span={"content"}>
            <IconAddressBook />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Text>
              {" "}
              <Text> {valUser?.nomor}</Text>
            </Text>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={"content"}>
            <IconMail />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Text>
              {" "}
              <Text> {valProfile?.email}</Text>
            </Text>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={"content"}>
            <IconHome />
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Text> {valProfile?.alamat}</Text>
          </Grid.Col>
        </Grid>

        {(() => {
          if (valProfile?.jenisKelamin === "Laki - laki") {
            return (
              <>
                <Grid>
                  <Grid.Col span={"content"}>
                    <IconGenderMale />
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text> {valProfile?.jenisKelamin}</Text>
                  </Grid.Col>
                </Grid>
              </>
            );
          } else {
            return (
              <>
                <Grid>
                  <Grid.Col span={"content"}>
                    <IconGenderFemale />
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Text> {valProfile?.jenisKelamin}</Text>
                  </Grid.Col>
                </Grid>
              </>
            );
          }
        })()}
      </Flex>
    </>
  );
}
