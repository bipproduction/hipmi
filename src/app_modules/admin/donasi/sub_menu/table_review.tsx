"use client";

import { gs_adminDonasi_triggerReview } from "@/lib/global_state";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import {
  Affix,
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  rem,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconEyeCheck, IconRefresh, IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import adminDonasi_getListReview from "../fun/get/get_list_review";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { apiGetAdminDonasiByStatus } from "../lib/api_fetch_admin_donasi";
import { error } from "console";
import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function AdminDonasi_TableReview() {
  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />
        <TableStatus />
      </Stack>
    </>
  );
}

function TableStatus() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");
  const [data, setData] = useState<MODEL_DONASI[] | null>(null);
  const [isNPage, setNPage] = useState<number>(1);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  // Realtime
  const [isAdminDonasi_TriggerReview, setIsAdminDonasi_TriggerReview] = useAtom(
    gs_adminDonasi_triggerReview
  );
  const [isShowReload, setIsShowReload] = useState(false);
  const [isLoadingReload, setLoadingReload] = useState(false);

  useShallowEffect(() => {
    loadInitialData();
  }, [isActivePage, isSearch]);

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminDonasiByStatus({
        name: "Review",
        page: `${isActivePage}`,
        search: isSearch
      })


      if (response?.success && response?.data?.data) {
        setData(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        console.error("Invalid data format received:", response);
        setData([]);
      }
    } catch (error) {
      clientLogger.error("Error get data table publish", error);
      setData([]);
    }
  }
  async function onLoadData() {
    loadInitialData();
    setLoadingReload(false);
    setIsShowReload(false);
    setIsAdminDonasi_TriggerReview(false);
  }

  const onSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  }

  const onPageClick = (page: number) => {
    setActivePage(page);
  }

  const renderTableBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <tr>
          <td colSpan={12}>
            <Center>
              <Text color="gray">Tidak ada data</Text>
            </Center>
          </td>
        </tr>
      )
    }

    return data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center c={AdminColor.white}>{e?.Author?.username}</Center>
        </td>
        <td>
          <Center c={AdminColor.white}>{e?.title}</Center>
        </td>
        <td>
          <Center c={AdminColor.white}>
            <ComponentGlobal_TampilanRupiah nominal={+e.target} />
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white}>{e?.DonasiMaster_Ketegori.name}</Center>
        </td>
        <td>
          <Center c={AdminColor.white}>{e?.DonasiMaster_Durasi.name} hari</Center>
        </td>
        <td>
          <Center>
            <Button
              loaderPosition="center"
              loading={isLoading && e?.id == idData ? true : false}
              style={{ backgroundColor: MainColor.green, color: AccentColor.white }}
              leftIcon={<IconEyeCheck />}
              radius={"xl"}
              onClick={() => {
                setLoading(true);
                setIdData(e?.id);
                router.push(RouterAdminDonasi_OLD.detail_review + `${e?.id}`);
              }}
            >
              Tampilkan
            </Button>
          </Center>
        </td>
      </tr>
    ));
  }


  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <ComponentAdminGlobal_TitlePage
          name="Review"
          color={AdminColor.softBlue}
          component={
            <TextInput
              icon={<IconSearch size={20} />}
              radius={"xl"}
              placeholder="Masukan judul"
              onChange={(val) => {
                onSearch(val.currentTarget.value);
              }}
            />
          }
        />
        {/* <Group
          position="apart"
          bg={"orange.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Review</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan judul"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group> */}
        {!data ? (
          <CustomSkeleton height={"80vh"} width={"100%"} />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
            {isShowReload && (
              <Affix position={{ top: rem(200) }} w={"100%"}>
                <Center>
                  <Button
                    style={{
                      transition: "0.5s",
                      border: `1px solid ${AccentColor.skyblue}`,
                    }}
                    bg={AccentColor.blue}
                    loaderPosition="center"
                    loading={isLoadingReload}
                    radius={"xl"}
                    opacity={0.8}
                    onClick={() => onLoadData()}
                    leftIcon={<IconRefresh />}
                  >
                    Update Data
                  </Button>
                </Center>
              </Affix>
            )}
            <ScrollArea w={"100%"} h={"90%"}>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={1500}
                h={"100%"}

              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AdminColor.white}>Username</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Judul</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Target</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Ketegori</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Durasi</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </ScrollArea>
            <Center mt={"xl"}>
              <Pagination
                value={isActivePage}
                total={isNPage}
                onChange={(val) => {
                  onPageClick(val);
                }}
              />
            </Center>
          </Paper>
        )}

      </Stack>
    </>
  );
}
