"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { IRealtimeData } from "@/lib/global_state";
import { clientLogger } from "@/util/clientLogger";
import {
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  TextInput,
  Title,
  Text,
  Box
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { apiGetUserAccess } from "../_lib/api_fetch_user_access";
import adminUserAccess_funEditAccess from "../fun/edit/fun_edit_access";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";

export default function AdminUserAccess_View() {
  const [data, setData] = useState<MODEL_USER[]>([]);
  const [nPage, setNPage] = useState(1);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  const [isLoadingAccess, setIsLoadingAccess] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [userId, setUserId] = useState("");

  useShallowEffect(() => {
    handleLoadData();
  }, [isActivePage, isSearch]);

  const handleLoadData = async () => {
    try {
      const response = await apiGetUserAccess({
        page: `${isActivePage}`,
        search: isSearch,
      });

      if (response.success) {
        setData(response.data.data);
        setNPage(response.data.nPage);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error get user access", error);
      setData([]);
    }
  };

  async function onSearch(s: any) {
    setSearch(s);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
  }

  async function onAccess(id: string, nomor: string) {
    try {
      setUserId(id);
      setIsLoadingAccess(true);
      await adminUserAccess_funEditAccess(id, true, nomor).then(async (res) => {
        if (res.status === 200) {
          handleLoadData();

          const dataNotifikasi: IRealtimeData = {
            status: true as any,
            userId: id,
            kategoriApp: "ACCESS",
          };

          WibuRealtime.setData({
            type: "trigger",
            pushNotificationTo: "USER",
            dataMessage: dataNotifikasi,
          });

          ComponentGlobal_NotifikasiBerhasil(res.message);
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      });
    } catch (error) {
      clientLogger.error("Error grand access", error);
    } finally {
      setIsLoadingAccess(false);
      setUserId("");
    }
  }

  async function onDelete(id: string) {
    try {
      setUserId(id);
      setIsLoadingDelete(true);
      await adminUserAccess_funEditAccess(id, false).then(async (res) => {
        if (res.status === 200) {
          handleLoadData();

          ComponentGlobal_NotifikasiBerhasil(res.message);
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      });
    } catch (error) {
      clientLogger.error("Error delete access", error);
    } finally {
      setIsLoadingDelete(false);
      setUserId("");
    }
  }

  const tableBody = data.map((e, i) => (
    <tr key={e.id}>
      <td>
        <Box w={200}>
          <Text c={AdminColor.white}>{e.username}</Text>
        </Box>
      </td>
      <td>
        <Box w={200}>
          <Text c={AdminColor.white}>+{e.nomor}</Text>
        </Box>
      </td>
      <td>
        {e.active === false ? (
          <Center>
            <Button
              loaderPosition="center"
              loading={isLoadingAccess && userId === e.id}
              radius={"xl"}
              color="Green"
              onClick={() => {
                onAccess(e.id, e.nomor);
              }}
            >
              Grand Access
            </Button>
          </Center>
        ) : (
          <Center>
            <Button
              loaderPosition="center"
              loading={isLoadingDelete && userId === e.id}
              radius={"xl"}
              color="red"
              onClick={() => {
                onDelete(e.id);
              }}
            >
              Delete Access
            </Button>
          </Center>
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"90vh"}>
        <Group
          c={AdminColor.white}
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Table User</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan username"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group>

        {!data.length ? (
          <CustomSkeleton height={"80vh"} width="100%" />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table verticalSpacing={"xs"} horizontalSpacing={"md"} p={"md"}>
                <thead>
                  <tr>
                    <th>
                      <Text c={AdminColor.white}>Username</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Nomor</Text>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{tableBody}</tbody>
              </Table>
            </ScrollArea>
            <Admin_V3_ComponentPaginationBreakpoint
              value={isActivePage}
              total={nPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Paper>
        )}
      </Stack>
    </>
  );
}
