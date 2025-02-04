import { APIs } from "@/app/lib";
import { RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import {
  ActionIcon,
  Box,
  Center,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { Home_ComponentAvatarProfile } from "./comp_avatar_profile";
import { listMenuHomeFooter } from "./list_menu_home";
import { IconUser } from "@tabler/icons-react";
import { IconUserCircle } from "@tabler/icons-react";

export default function FooterHome({ dataUser }: { dataUser: any | null }) {
  const router = useRouter();

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
                if (!dataUser) {
                  return null;
                } else if (dataUser.profile === undefined) {
                  router.push(RouterProfile.create, { scroll: false });
                } else if (e.link == "") {
                  ComponentGlobal_NotifikasiPeringatan("Cooming Soon");
                } else {
                  router.push(e.link, { scroll: false });
                }
              }}
            >
              <ActionIcon
                radius={"xl"}
                c={e.link === "" ? "gray" : MainColor.white}
                variant="transparent"
              >
                {e.icon}
              </ActionIcon>
              <Text
                lineClamp={1}
                c={e.link === "" ? "gray" : MainColor.white}
                fz={12}
              >
                {e.name}
              </Text>
            </Stack>
          </Center>
        ))}

        <Center h={"9vh"}>
          <Stack align="center" spacing={2}>
            {!dataUser ? (
              <CustomSkeleton height={25} width={25} radius={"xl"} />
            ) : dataUser.profile === undefined ? (
              <ActionIcon
                variant={"transparent"}
                onClick={() =>
                  router.push(RouterProfile.create, { scroll: false })
                }
              >
                <IconUserCircle color="white" />
              </ActionIcon>
            ) : (
              <ActionIcon
                variant={"transparent"}
                onClick={() => {
                  router.push(
                    RouterProfile.katalogOLD + `${dataUser?.profile}`,
                    {
                      scroll: false,
                    }
                  );
                }}
              >
                <Home_ComponentAvatarProfile
                  url={APIs.GET({
                    fileId: dataUser?.imageId as string,
                    size: "50",
                  })}
                />
              </ActionIcon>
            )}
            <Text fz={10} c={MainColor.white}>
              Profile
            </Text>
          </Stack>
        </Center>
      </SimpleGrid>
    </Box>
  );
}
