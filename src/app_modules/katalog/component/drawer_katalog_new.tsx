import { RouterAdminDashboard } from "@/app/lib/router_hipmi/router_admin";
import { RouterPortofolio, RouterProfile } from "@/app/lib/router_hipmi/router_katalog";
import { AccentColor } from "@/app_modules/_global/color";
import Component_ButtonLogout from "@/app_modules/auth/logout/view";
import { ActionIcon, Drawer, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconDashboard } from "@tabler/icons-react";
import { IconEdit, IconPencilPlus, IconPhotoEdit, IconPolaroid, IconX } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

export default function DrawerKatalogNew({ opened, close, userRoleId, userId }: { opened: boolean, close: () => void, userRoleId: string, userId: string }) {
   const param = useParams<{ id: string }>()
   const router = useRouter()

   const listPage = [
      {
         id: "1",
         name: "Edit profile",
         icon: <IconEdit />,
         path: RouterProfile.edit + param.id,
      },
      {
         id: "2",
         name: "Ubah foto profile",
         icon: <IconPhotoEdit />,
         path: RouterProfile.update_foto_profile + param.id,
      },
      {
         id: "3",
         name: "Ubah latar belakang",
         icon: <IconPolaroid />,
         path: RouterProfile.update_foto_background + param.id,
      },
      {
         id: "4",
         name: "Tambah portofolio",
         icon: <IconPencilPlus />,
         path: RouterPortofolio.create + param.id,
      },
   ];

   return <>
      <Drawer
         opened={opened}
         onClose={() => close()}
         position={"bottom"}
         size={"auto"}
         withCloseButton={false}
         styles={{
            content: {
               padding: 0,
               position: "absolute",
               margin: "auto",
               backgroundColor: "transparent",
               left: 0,
               right: 0,
               width: 500,
            },
            body: {
               backgroundColor: AccentColor.darkblue,
               borderTop: `2px solid ${AccentColor.blue}`,
               borderRight: `1px solid ${AccentColor.blue}`,
               borderLeft: `1px solid ${AccentColor.blue}`,
               borderRadius: "20px 20px 0px 0px",
               color: "white",
               paddingBottom: "5%",
            },
         }}
      >
         <Stack spacing={"xs"}>
            <Group position="right">
               <ActionIcon onClick={close} variant="transparent">
                  <IconX color="white" />
               </ActionIcon>
            </Group>
            <SimpleGrid cols={4}>
               {listPage.map((e, i) => (
                  <Stack key={i} align="center" spacing={"xs"}>
                     <ActionIcon
                        variant="transparent"
                        c="white"
                        onClick={() => { router.push(e.path, { scroll: false }); }}
                     >
                        {e.icon}
                     </ActionIcon>
                     <Text align="center" color="white">
                        {e.name}
                     </Text>
                  </Stack>
               ))}

               <Component_ButtonLogout userId={userId} />
               {userRoleId != "1" && userRoleId != "" && (
                  <Stack align="center" spacing={"xs"}>
                     <ActionIcon
                        variant="transparent"
                        c="white"
                        onClick={() => { router.push(RouterAdminDashboard.main_admin, { scroll: false }); }}
                     >
                        <IconDashboard />
                     </ActionIcon>
                     <Text align="center" color="white">
                        Dashboard Admin
                     </Text>
                  </Stack>
               )}
            </SimpleGrid>
         </Stack>
      </Drawer>
   </>;
}