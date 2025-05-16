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
  Switch,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconFilter, IconPencil, IconPlus } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_ComponentBoxStyle } from "../../_admin_global/_component/comp_admin_boxstyle";
import { Admin_ComponentModal } from "../../_admin_global/_component/comp_admin_modal";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import {
  apiAdminGetSticker,
  apiAdminUpdateStatusStickerById,
} from "../lib/api_fetch_stiker";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";

export default function AdminAppInformation_ViewSticker() {
  const router = useRouter();
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState<string | null>(null);
  const [dataSticker, setDataSticker] = useState<ISticker[] | null>(null);
  const [dataUpdate, setDataUpdate] = useState({
    id: "",
    isActive: false,
  });
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [opened, setOpened] = useState(false);
  const [nPage, setNPage] = useState(1);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    handleLoadData();
  }, [activePage]);

  const handleLoadData = async () => {
    try {
      const response = await apiAdminGetSticker({ page: activePage });
      if (response.success) {
        setDataSticker(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        setDataSticker([]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setDataSticker([]);
    }
  };

  const onPageClick = (page: number) => {
    setActivePage(page);
  };

  const handleUpdateActivation = async ({
    id,
    value,
  }: {
    id: string;
    value: boolean;
  }) => {
    const data = {
      id: id,
      isActive: value,
    };

    try {
      setLoadingUpdate(true);
      const updt = await apiAdminUpdateStatusStickerById({
        data: data as any,
      });

      if (updt.success) {
        const cloneData = [...(dataSticker || [])];
        const index = cloneData.findIndex((e) => e.id === id);
        if (index !== -1) {
          cloneData[index].isActive = value;
          setDataSticker([...cloneData]);
        }

        ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
      } else {
        ComponentAdminGlobal_NotifikasiGagal(updt.message);
      }
    } catch (error) {
      console.log("Error update status sticker", error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_TitlePage name="Stiker " />

        <Group position="right">
          {/* <Button radius={"xl"} leftIcon={<IconFilter size={20} />}> Filter</Button> */}
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
        </Group>

        {!dataSticker ? (
          <CustomSkeleton height={"65dvh"} />
        ) : (
          <Admin_ComponentBoxStyle
          // style={{ height: "65dvh", overflow: "hidden" }}
          >
            <Stack>
              <ScrollArea w={"100%"} scrollbarSize={"md"} h={"65dvh"}>
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
                      setOpened,
                      dataUpdate,
                      setDataUpdate,
                    })}
                  </tbody>
                </Table>
              </ScrollArea>
              <Admin_V3_ComponentPaginationBreakpoint
                value={activePage}
                total={nPage}
                onChange={onPageClick}
              />
            </Stack>
          </Admin_ComponentBoxStyle>
        )}
      </Stack>

      <Admin_ComponentModal opened={opened} onClose={() => setOpened(false)}>
        <Stack>
          <Text fw={500} c={AdminColor.white}>
            Apakah anda yakin ingin mengubah status stiker ini ?
          </Text>
          <Group position="center">
            <Button
              radius={"xl"}
              onClick={() => {
                setOpened(false);
                setLoadingUpdate(false);
              }}
            >
              Tidak
            </Button>
            <Button
              loading={loadingUpdate}
              loaderPosition="center"
              radius={"xl"}
              bg={MainColor.green}
              color="green"
              onClick={() => {
                handleUpdateActivation({
                  id: dataUpdate.id,
                  value: dataUpdate.isActive,
                });
                setOpened(false);
              }}
            >
              Ya
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentModal>
    </>
  );
}

type RowTableProps = {
  dataSticker: ISticker[] | null;
  router: AppRouterInstance;
  loadingDetail: string | null;
  setLoadingDetail: (val: string | null) => void;
  setOpened: (val: boolean) => void;
  dataUpdate: {
    id: string;
    isActive: boolean;
  };
  setDataUpdate: (val: { id: string; isActive: boolean }) => void;
};

const rowTable = ({
  dataSticker,
  router,
  loadingDetail,
  setLoadingDetail,
  setOpened,
  dataUpdate,
  setDataUpdate,
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
      <td>
        <Center>
          <Switch
            checked={e.isActive}
            color="yellow"
            onLabel="ON"
            offLabel="OFF"
            onChange={(val) => {
              setDataUpdate({ id: e.id, isActive: val.currentTarget.checked });
              setOpened(true);
            }}
          />
        </Center>
      </td>
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
        <Box maw={300} miw={200}>
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
