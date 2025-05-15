"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { APIs } from "@/lib";
import { RouterAdminAppInformation } from "@/lib/router_admin/router_app_information";
import {
  Badge,
  Box,
  Button,
  Center,
  Group,
  Image,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { apiAdminGetSticker } from "../lib/api_fetch_stiker";
import { ISticker } from "@/app_modules/_global/lib/interface/stiker";



export default function AdminAppInformation_ViewSticker() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [dataSticker, setDataSticker] = useState<ISticker[] | null>(null);

  useShallowEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiAdminGetSticker();
        if (response.success) {
          setDataSticker(response.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const rowTable = () => {
    if (!Array.isArray(dataSticker) || dataSticker.length === 0) {
      return (
        <tr>
          <td colSpan={12}>
            <Center>
              <Text color={"gray"}>Tidak ada data</Text>
            </Center>
          </td>
        </tr>
      );
    }
    return dataSticker.map((e, i) => (
      <tr key={i}>
        <td>
          <Center>
            <Button
              radius={"xl"}
              leftIcon={<IconPencil size={20} />}
              onClick={() => {}}
            >
              Detail
            </Button>
          </Center>
        </td>
        <td>
          <Center>
            <Box bg="gray" p={"xs"}>
              <Image
                src={APIs.GET({ fileId: e.fileId, size: "200" })}
                alt="Sticker"
                width={100}
                height={100}
              />
            </Box>
          </Center>
        </td>
        <td>
          <Center>
            <Box maw={300}>
              <Spoiler
                maxHeight={50}
                hideLabel="Sembunyikan"
                showLabel="Tampilkan"
              >
                <Group>
                  {e.MasterEmotions.map((e) => (
                    <Badge key={e.value}>{e.value}</Badge>
                  ))}
                </Group>
              </Spoiler>
            </Box>
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_TitlePage name="Stiker " />

        <Button
          loading={isLoading}
          loaderPosition="center"
          w={120}
          radius={"xl"}
          leftIcon={<IconPlus size={20} />}
          onClick={() => {
            router.push(RouterAdminAppInformation.createSticker);
            setIsLoading(true);
          }}
        >
          Tambah
        </Button>

        {!dataSticker ? (
          <CustomSkeleton height={"65dvh"} />
        ) : (
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
                      <Center c={AdminColor.white}>Stiker</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Kategori</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{rowTable()}</tbody>
              </Table>
            </ScrollArea>
          </Admin_ComponentBoxStyle>
        )}
      </Stack>
    </>
  );
}
