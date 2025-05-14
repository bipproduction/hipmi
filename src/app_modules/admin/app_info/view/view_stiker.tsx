"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { Button, Center, ScrollArea, Stack, Table, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { RouterAdminAppInformation } from "@/lib/router_admin/router_app_information";

export default function AdminAppInformation_ViewSticker() {
  const router = useRouter();
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_TitlePage name="Stiker " />

        <Button
          w={120}
          radius={"xl"}
          leftIcon={<IconPlus size={20} />}
          onClick={() => {
            router.push(RouterAdminAppInformation.createSticker);
          }}
        >
          Tambah
        </Button>

        <Admin_ComponentBoxStyle
          style={{ height: "65dvh", overflow: "hidden" }}
        >
          <ScrollArea w={"100%"} h={"100%"} scrollbarSize={"md"}>
            <Table
              verticalSpacing={"md"}
              horizontalSpacing={"md"}
              p={"md"}
              w={"100%"}
            >
              <thead>
                <tr>
                  <th>
                    <Center c={AdminColor.white}>Aksi</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Status</Center>
                  </th>
                  <th>
                    <Text c={AdminColor.white}>Kategori</Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Stiker 1</td>
                  <td>
                    <Button
                      radius={"xl"}
                      leftIcon={<IconPlus size={20} />}
                      onClick={() => {}}
                    >
                      Tambah
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </ScrollArea>
        </Admin_ComponentBoxStyle>
      </Stack>
    </>
  );
}
