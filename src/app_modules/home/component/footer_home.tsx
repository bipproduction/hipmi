import { APIs } from "@/app/lib";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import {
  ActionIcon,
  Box,
  Center,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconUserCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetDataHome } from "../fun/get/api_home";
import { Home_ComponentAvatarProfile } from "./comp_avatar_profile";
import { listMenuHomeFooter } from "./list_menu_home";

export default function FooterHome() {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<any>({});

  useShallowEffect(() => {
    cekUserLogin();
  }, []);

  async function cekUserLogin() {
    try {
      const response = await apiGetDataHome("?cat=cek_profile");
      if (response.success) {
        setDataUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box
      style={{
        zIndex: 99,
        borderRadius: "20px 20px 0px 0px",
      }}
      w={"100%"}
      bottom={0}
      h={"9vh"}
    >
      <SimpleGrid cols={listMenuHomeFooter.length + 1}>
        {listMenuHomeFooter.map((e) => (
          <Center h={"9vh"} key={e.id}>
            <Stack
              align="center"
              spacing={0}
              onClick={() => {
                if (
                  dataUser.profile === undefined ||
                  dataUser?.profile === null
                ) {
                  return null;
                } else if (
                  dataUser.profile === undefined ||
                  dataUser?.profile === null
                ) {
                  router.push(RouterProfile.create, { scroll: false });
                } else {
                  if (e.link == "") {
                    ComponentGlobal_NotifikasiPeringatan("Cooming Soon");
                  } else {
                    router.push(e.link, { scroll: false });
                  }
                }
              }}
            >
              <ActionIcon
                radius={"xl"}
                c={e.link === "" ? "gray" : "white"}
                variant="transparent"
              >
                {e.icon}
              </ActionIcon>
              <Text lineClamp={1} c={e.link === "" ? "gray" : "white"} fz={12}>
                {e.name}
              </Text>
            </Stack>
          </Center>
        ))}

        <Center h={"9vh"}>
          <Stack
            align="center"
            spacing={2}
            onClick={() => {
              if (
                dataUser.profile === undefined ||
                dataUser?.profile === null
              ) {
                router.push(RouterProfile.create, { scroll: false });
              } else {
                router.push(RouterProfile.katalogOLD + `${dataUser?.profile}`, {
                  scroll: false,
                });
              }
            }}
          >
            <ActionIcon variant={"transparent"}>
              {dataUser.profile === undefined || dataUser?.profile === null ? (
                <IconUserCircle color="white" />
              ) : (
                <Home_ComponentAvatarProfile
                  url={APIs.GET({
                    fileId: dataUser?.imageId as string,
                    size: "50",
                  })}
                />
              )}
            </ActionIcon>
            <Text fz={10} c={"white"}>
              Profile
            </Text>
          </Stack>
        </Center>
      </SimpleGrid>
    </Box>
  );
}
