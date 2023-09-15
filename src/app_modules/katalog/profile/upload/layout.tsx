"use client";
import {
  Header,
  Group,
  ActionIcon,
  Title,
  AppShell,
  Footer,
  Flex,
  Box,
  Text,
  Center,
  Stack,
  FileButton,
  Image,
} from "@mantine/core";
import { IconChevronLeft, IconUpload } from "@tabler/icons-react";
import _ from "lodash";

import { useState } from "react";
import toast from "react-simple-toasts";
import { funUploadFoto } from "../fun/upload_foto";
import { MyConsole } from "@/app_modules/fun";
import { redirect, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { gs_Profile, gs_User } from "../state/s_profile";
import { loadDataProfile } from "../load/load_profile";
import { getFotoProfile } from "../fun/get-foto";

export default function UploadFotoLayout({ children }: { children: any }) {
  const router = useRouter();
  const [valProfile, setProfile] = useAtom(gs_Profile);
  const [valUser, setUser] = useAtom(gs_User);

  return (
    <>
      <AppShell
        header={
          <Header height={50} px={"sm"}>
            <Group position="apart" align="center" h={50}>
              <ActionIcon onClick={() => router.push("/dev/katalog/view")}>
                <IconChevronLeft size={20} />
              </ActionIcon>
              <Title order={4}>Upload Foto</Title>
              &nbsp; &nbsp; &nbsp; &nbsp;
            </Group>
          </Header>
        }
        footer={
          <Footer height={70}>
            <Flex align={"center"} justify={"center"} h={70} gap={"xl"}>
              <Flex align={"center"} justify={"center"} h={70}>
                <Flex direction={"column"} align={"center"}>
                  <FileButton
                    onChange={async (files) => {
                      const idProfile = valProfile?.id;

                      if (!files) return toast("File Kosong");
                      const fd = new FormData();
                      fd.append("file", files);

                      // const upFoto = await fetch("/api/profile/")

                      const upFoto = await funUploadFoto(fd, idProfile);
                      if (upFoto.success) {
                        toast("Upload berhasil");
                        loadDataProfile(valUser.id, setUser, setProfile);
                      }
                    }}
                    accept="image/png,image/jpeg,image/webp"
                  >
                    {(props) => (
                      <ActionIcon {...props}>
                        <IconUpload />
                      </ActionIcon>
                    )}
                  </FileButton>
                  <Text fz={"sm"} fw={"bold"}>
                    Upload
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            {/*  */}
          </Footer>
        }
      >
        {/* {JSON.stringify(valUser.id)} */}
        {children}
      </AppShell>
    </>
  );
}
