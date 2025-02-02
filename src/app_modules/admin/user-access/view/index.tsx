"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { MODEL_USER } from "@/app_modules/home/model/interface";
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
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import adminUserAccess_funEditAccess from "../fun/edit/fun_edit_access";
import adminUserAccess_getListUser from "../fun/get/get_list_all_user";
import { WibuRealtime } from "wibu-pkg";
import { gs_access_user, IRealtimeData } from "@/app/lib/global_state";
import { useAtom } from "jotai";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminUserAccess_View({ listUser }: { listUser: any }) {
  const [data, setData] = useState<MODEL_USER[]>(listUser.data);
  const [isActivePage, setActivePage] = useState(1);
  const [isNPage, setNPage] = useState(listUser.nPage);
  const [isSearch, setSearch] = useState("");
  const [isLoadingAccess, setIsLoadingAccess] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [userId, setUserId] = useState("");

  async function onAccess(id: string, nomor: string) {
    try {
      setUserId(id);
      setIsLoadingAccess(true);
      await adminUserAccess_funEditAccess(id, true, nomor).then(async (res) => {
        if (res.status === 200) {
          const value = await adminUserAccess_getListUser({
            page: 1,
            search: isSearch,
          });
          setData(value.data as any);
          setNPage(value.nPage);

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
          const value = await adminUserAccess_getListUser({
            page: 1,
            search: isSearch,
          });
          setData(value.data as any);
          setNPage(value.nPage);
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

  async function onSearch(s: any) {
    setSearch(s);
    setActivePage(1);
    const loadData = await adminUserAccess_getListUser({
      search: s,
      page: 1,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminUserAccess_getListUser({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const tableBody = data.map((e, i) => (
    <tr key={e.id}>
      <td>
        <Center c={AdminColor.white}>{e.username}</Center>
      </td>
      <td>
        <Center c={AdminColor.white}>+{e.nomor}</Center>
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

        <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"xs"}
              horizontalSpacing={"md"}
              p={"md"}
              
            >
              <thead>
                <tr>
                  <th>
                    <Center c={AdminColor.white}>Username</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Nomor</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
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
      </Stack>
    </>
  );
}
