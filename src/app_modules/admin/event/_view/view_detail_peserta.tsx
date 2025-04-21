"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_EVENT_PESERTA } from "@/app_modules/event/_lib/interface";
import { clientLogger } from "@/util/clientLogger";
import {
  Badge,
  Center,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";
import { apiGetAdminDetailEventPesertaById } from "../_lib/api_fecth_admin_event";

export function AdminEvent_ViewDetailPeserta() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_EVENT_PESERTA[] | null>(null);
  const [isNPage, setNPage] = useState<number>(1);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  useShallowEffect(() => {
    loadInitialData();
  }, [isActivePage, isSearch]);

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminDetailEventPesertaById({
        id: params.id,
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

  const onSearch = async (searchTerm: string) => {
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
              <Text color={"gray"}>Tidak ada data</Text>
            </Center>
          </td>
        </tr>
      );
    }

    return data?.map((e, i) => (
      <tr key={i}>
        <td>
          <Center c={AdminColor.white}>{e?.User?.username}</Center>
        </td>
        <td>
          <Center c={AdminColor.white}>{e?.User?.Profile?.name}</Center>
        </td>
        <td>
          <Center c={AdminColor.white}>+{e?.User?.nomor}</Center>
        </td>
        <td>
          <Center c={AdminColor.white}>{e?.User?.Profile?.email}</Center>
        </td>
        <td>
          <Center>
            {e.isPresent ? (
              <Badge color="green">Hadir</Badge>
            ) : (
              <Badge color="red">Tidak Hadir</Badge>
            )}
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Daftar Peserta"
          color={AdminColor.softBlue}
          component={
            <TextInput
              disabled={!data}
              icon={<IconSearch size={20} />}
              radius={"xl"}
              placeholder="Masukan username"
              onChange={(val) => {
                onSearch(val.currentTarget.value);
              }}
            />
          }
        />
        {!data ? (
          <CustomSkeleton height={"80vh"} width="100%" />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"75vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={"100%"}
              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AdminColor.white}>Username</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Name</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Nomor</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Email</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Konfirmasi Kehadiran</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </ScrollArea>

            <Admin_V3_ComponentPaginationBreakpoint
              value={isActivePage}
              total={isNPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Paper>
        )}
      </Stack>
      {/* <pre>{JSON.stringify(dataPeserta, null, 2)}</pre> */}
    </>
  );
}
