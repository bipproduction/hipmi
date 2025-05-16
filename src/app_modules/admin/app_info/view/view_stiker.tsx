"use client";

import {
  AdminColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ISticker } from "@/app_modules/_global/lib/interface/stiker";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { APIs, pathAssetImage } from "@/lib";
import { RouterAdminAppInformation } from "@/lib/router_admin/router_app_information";
import {
  Badge,
  Box,
  Button,
  Center,
  Group,
  Image,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { apiAdminGetSticker } from "../lib/api_fetch_stiker";

export default function AdminAppInformation_ViewSticker() {
  const router = useRouter();
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState<string | null>(null);
  const [dataSticker, setDataSticker] = useState<ISticker[] | null>(null);
  const [isActivation, setIsActivation] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({
    id: "",
    active: false,
  });

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

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_TitlePage name="Stiker " />

        <Button
          loading={loadingCreate}
          loaderPosition="center"
          w={120}
          radius={"xl"}
          leftIcon={<IconPlus size={20} />}
          onClick={() => {
            router.push(RouterAdminAppInformation.createSticker);
            setLoadingCreate(true);
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
                    {/* <th>
                      <Center c={AdminColor.white}>Status</Center>
                    </th> */}

                    <th>
                      <Center c={AdminColor.white}>Stiker</Center>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Kategori</Text>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rowTable({
                    dataSticker,
                    router,
                    loadingDetail,
                    setLoadingDetail,
                    isActivation,
                    setIsActivation,
                    updateStatus,
                    setUpdateStatus,
                  })}
                </tbody>
              </Table>
            </ScrollArea>
          </Admin_ComponentBoxStyle>
        )}
      </Stack>
    </>
  );
}

type RowTableProps = {
  dataSticker: ISticker[] | null;
  router: AppRouterInstance;
  loadingDetail: string | null;
  setLoadingDetail: (val: string | null) => void;
  isActivation: boolean;
  setIsActivation: (val: boolean) => void;
  updateStatus: { id: string; active: boolean };
  setUpdateStatus: (val: { id: string; active: boolean }) => void;
};

const rowTable = ({
  dataSticker,
  router,
  loadingDetail,
  setLoadingDetail,
  isActivation,
  setIsActivation,
  updateStatus,
  setUpdateStatus,
}: RowTableProps) => {
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
            loading={loadingDetail === e.id}
            loaderPosition="center"
            bg={MainColor.green}
            color="green"
            radius={"xl"}
            leftIcon={<IconPencil size={20} />}
            onClick={() => {
              setLoadingDetail(e.id);
              setTimeout(() => {
                router.push(
                  RouterAdminAppInformation.detailSticker({ id: e.id })
                );
                setLoadingDetail(null);
              }, 1000);
            }}
          >
            Detail
          </Button>
        </Center>
      </td>
      {/* <td>
        <Center>
          <Switch
            checked={e.isActive}
            color="green"
            onLabel="ON"
            offLabel="OFF"
            onChange={(val) => {
              setIsActivation(true);
              setUpdateStatus({
                id: e?.id,
                active: val.currentTarget.checked as any,
              });
            }}
          />
        </Center>
      </td> */}
      <td>
        <Center>
          <Paper bg="gray" p={"xs"}>
            <Image
              src={
                e.fileId
                  ? APIs.GET({ fileId: e.fileId })
                  : pathAssetImage.no_image
              }
              alt="Sticker"
              width={100}
              height={100}
            />
          </Paper>
        </Center>
      </td>
      <td>
        <Box maw={300}>
          <Spoiler maxHeight={70} hideLabel="Sembunyikan" showLabel="Tampilkan">
            <Group>
              {e.MasterEmotions.map((e) => (
                <Badge key={e.value}>{e.value}</Badge>
              ))}
            </Group>
          </Spoiler>
        </Box>
      </td>
    </tr>
  ));
};
