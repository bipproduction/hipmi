"use client";

import { AccentColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import { RouterAdminDonasi_OLD } from "@/lib/router_hipmi/router_admin";
import { clientLogger } from "@/util/clientLogger";
import {
  Box,
  Center,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import Admin_DetailButton from "../../_admin_global/_component/button/detail_button";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { apiGetAdminDonasiByStatus } from "../lib/api_fetch_admin_donasi";

export default function AdminDonasi_TablePublish() {
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

  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetAdminDonasiByStatus({
          name: "Publish",
          page: `${isActivePage}`,
          search: isSearch,
        });

        if (response?.success && response?.data.data) {
          setData(response.data.data);
          setNPage(response.data.nPage || 1);
        } else {
          console.error("Invalid data format recieved:", response);
          setData([]);
        }
      } catch (error) {
        clientLogger.error("Invalid data format recieved:", error);
        setData([]);
      }
    };
    loadInitialData();
  }, [isActivePage, isSearch]);

  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  };

  const onPageClick = (page: number) => {
    setActivePage(page);
  };
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
      );
    }
    return data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center c={AdminColor.white}>
            <Box w={100}>
              <Text lineClamp={1}>{e?.Author?.username}</Text>
            </Box>
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white}>
            <Box w={100}>
              <Text lineClamp={2}>{e.title}</Text>
            </Box>
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white}>
            <ComponentGlobal_TampilanRupiah nominal={+e.target} />
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white}>
            <ComponentGlobal_TampilanRupiah nominal={+e.terkumpul} />
          </Center>
        </td>
        {/* <td>
          <Center c={AccentColor.white}>{e.DonasiMaster_Ketegori.name}</Center>
        </td>
        <td>
          <Center c={AccentColor.white}>{e.DonasiMaster_Durasi.name} hari</Center>
        </td> */}
        <td>
          <Center>
            {/* <Button
              loaderPosition="center"
              loading={isLoading && e?.id === idData ? true : false}
              style={{ backgroundColor: MainColor.green, }}
              c={AccentColor.white}
              leftIcon={<IconEyeCheck />}
              radius={"xl"}
              onClick={() => {
                setLoading(true);
                setIdData(e?.id);
                router.push(RouterAdminDonasi_OLD.detail_publish + `${e.id}`);
              }}
            >
              Tampilkan
            </Button> */}
            <Admin_DetailButton
              path={RouterAdminDonasi_OLD.detail_publish + e.id}
            />
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <ComponentAdminGlobal_TitlePage
          name="Publish"
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
          bg={"green.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Publish</Title>
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
          <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table verticalSpacing={"md"} horizontalSpacing={"md"} p={"md"}>
                <thead>
                  <tr>
                    <th>
                      <Center c={AccentColor.white}>Username</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Judul</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Target</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Terkumpul</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </ScrollArea>
            {/* <ScrollArea>
          </ScrollArea> */}
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
