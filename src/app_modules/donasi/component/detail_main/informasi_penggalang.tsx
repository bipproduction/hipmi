"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  Stack,
  Title,
  Paper,
  Group,
  ActionIcon,
  Avatar,
  Text,
} from "@mantine/core";
import { IconCircleChevronRight } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import ComponentDonasi_NotedBox from "../noted_box";
import { useState } from "react";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";

export default function ComponentDonasi_InformasiPenggalangMain({
  author,
}: {
  author: MODEL_USER;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      {/* <pre>{JSON.stringify(author, null, 2)}</pre> */}
      <Stack
        spacing={"xs"}
        style={{
          color: "white",
        }}
      >
        <Title order={4}>Informasi Penggalang Dana</Title>
        <Paper
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Stack>
            <Group position="apart">
              <Title order={5}>Penggalang Dana</Title>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  setLoading(true);
                  router.push(RouterDonasi.penggalang_dana + `${author.id}`);
                }}
              >
                {isLoading ? (
                  <ComponentGlobal_Loader />
                ) : (
                  <IconCircleChevronRight
                    style={{
                      color: MainColor.yellow,
                    }}
                  />
                )}
              </ActionIcon>
            </Group>
            <Group>
              <Avatar radius={"xl"} variant="filled" bg={"blue"}>
                {(() => {
                  // return null
                  const usr = author?.username;
                  const splt = usr?.split("");
                  const Up = _.upperCase(splt[0]);

                  return Up;
                })()}
              </Avatar>
              <Text>{author?.username}</Text>
            </Group>
            <ComponentGlobal_BoxInformation
              informasi="Semua dana yang terkumpul akan disalurkan ke penggalang dana,
                  kabar penyaluran dapat dilihat di halaman kabar terbaru."
            />
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
