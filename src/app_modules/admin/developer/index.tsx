"use client";

import {
  Box,
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../_admin_global/header_tamplate";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import _ from "lodash";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import adminDeveloper_funEditUserAksesById from "./fun/edit/fun_edit_user_akses_by_id";
import adminDeveloper_funGetListAllAdmin from "./fun/get/fun_get_list_all_admin";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import adminDeveloper_funGetListAllUser from "./fun/get/fun_get_list_all_user";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminDeveloper({
  listUser,
  listAdmin,
  pUser,
  pAdmin,
}: {
  listUser: MODEL_USER[];
  listAdmin: MODEL_USER[];
  pUser: any;
  pAdmin: any;
}) {
  const [dataUser, setDataUser] = useState(listUser);
  const [dataAdmin, setDataAdmin] = useState(listAdmin);
  const [pageUser, setPageUser] = useState(pUser);
  const [pageAdmin, setPageAdmin] = useState(pAdmin);

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Super Admin" />
        <SimpleGrid cols={2} spacing={50}>
          {/* <TableAdmin
            dataAdmin={dataAdmin}
            setDataAdmin={setDataAdmin}
            setDataUser={setDataUser}
          /> */}
          {/* <TableUser
            dataUser={listUser}
            setDataUser={setDataUser}
            setDataAdmin={setDataAdmin}
          /> */}
          <NewTableAdmin
            data={dataAdmin}
            nPage={pageAdmin}
            onUpdated={(val) => {
              setDataUser(val.data);
              setPageUser(val.nPage);
            }}
          />
          <NewTableUser
            data={dataUser}
            nPage={pageUser}
            onUpdated={(val) => {
              setDataAdmin(val.data);
              setPageAdmin(val.nPage);
            }}
          />
        </SimpleGrid>
      </Stack>
    </>
  );
}

function NewTableUser({
  data,
  nPage,
  onUpdated,
}: {
  data: any;
  nPage: any;
  onUpdated: (val: any) => void;
}) {
  const [isChoosePage, setChoosePage] = useState(1);
  const [dataUser, setDataUser] = useState(data);
  const [isNPage, setNPage] = useState(nPage);
  const [isSearch, setSearch] = useState("");

  async function onPageClick(p: any) {
    setChoosePage(p);
    const loadData = await adminDeveloper_funGetListAllUser({
      search: isSearch,
      page: p,
    });
    setDataUser(loadData.data);
    setNPage(loadData.nPage);
  }

  async function onSearch(s: any) {
    setSearch(s);
    setChoosePage(1);
    const loadData = await adminDeveloper_funGetListAllUser({
      search: s,
      page: 1,
    });
    setDataUser(loadData.data);
    setNPage(loadData.nPage);
  }

  async function onAccess(id: string) {
    const upd = await adminDeveloper_funEditUserAksesById(id, "2");
    if (upd.status == 200) {
      const loadData = await adminDeveloper_funGetListAllUser({
        search: isSearch,
        page: isChoosePage,
      });
      setDataUser(loadData.data);
      setNPage(loadData.nPage);
      const loadDataAdmin = await adminDeveloper_funGetListAllAdmin({
        page: 1,
      });
      onUpdated(loadDataAdmin);
      ComponentGlobal_NotifikasiBerhasil(upd.message);
    } else {
      ComponentGlobal_NotifikasiGagal(upd.message);
    }
  }

  useEffect(() => {
    setDataUser(data);
    setNPage(nPage);
    setSearch("");
    setChoosePage(1);
  }, [data, nPage]);

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          c={AdminColor.white}
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
            <tbody>
              {dataUser.map((v: any, i: any) => (
                <tr key={v.id}>
                  <td>
                    <Center c={AdminColor.white}>{v.username}</Center>
                  </td>
                  <td>
                    <Center c={AdminColor.white}>{v.nomor}</Center>
                  </td>
                  <td>
                    <Center>
                      <Button radius={"xl"} onClick={() => onAccess(v.id)}>
                        Admin Access
                      </Button>
                    </Center>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Group sx={{ justifyContent: "flex-end" }} pt={10}>
            <Pagination
              value={isChoosePage}
              onChange={(val) => {
                onPageClick(val);
              }}
              total={isNPage}
            />
          </Group>
        </Paper>
      </Stack>
    </>
  );
}

function NewTableAdmin({
  data,
  nPage,
  onUpdated,
}: {
  data: any;
  nPage: any;
  onUpdated: (val: any) => void;
}) {
  const [isChoosePage, setChoosePage] = useState(1);
  const [dataAdmin, setDataAdmin] = useState(data);
  const [isNPage, setNPage] = useState(nPage);
  const [isSearch, setSearch] = useState("");

  async function onPageClick(p: any) {
    setChoosePage(p);
    const loadData = await adminDeveloper_funGetListAllAdmin({
      search: isSearch,
      page: p,
    });
    setDataAdmin(loadData.data);
    setNPage(loadData.nPage);
  }

  async function onSearch(s: any) {
    setSearch(s);
    setChoosePage(1);
    const loadData = await adminDeveloper_funGetListAllAdmin({
      search: s,
      page: 1,
    });
    setDataAdmin(loadData.data);
    setNPage(loadData.nPage);
  }

  async function onAccess(id: string) {
    const upd = await adminDeveloper_funEditUserAksesById(id, "1");
    if (upd.status == 200) {
      const loadData = await adminDeveloper_funGetListAllAdmin({
        search: isSearch,
        page: isChoosePage,
      });

      


      setDataAdmin(loadData.data);
      setNPage(loadData.nPage);
      const loadDataUser = await adminDeveloper_funGetListAllUser({ page: 1 });
      onUpdated(loadDataUser);
      ComponentGlobal_NotifikasiBerhasil(upd.message);
    } else {
      ComponentGlobal_NotifikasiGagal(upd.message);
    }
  }

  useEffect(() => {
    setDataAdmin(data);
    setNPage(nPage);
    setSearch("");
    setChoosePage(1);
  }, [data, nPage]);

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          c={AdminColor.white}
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Table Admin</Title>
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
            <tbody>
              {dataAdmin.map((v: any, i: any) => (
                <tr key={v.id}>
                  <td>
                    <Center c={AdminColor.white}>{v.username}</Center>
                  </td>
                  <td>
                    <Center c={AdminColor.white}>{v.nomor}</Center>
                  </td>
                  <td>
                    <Center>
                      <Button
                        radius={"xl"}
                        color="red"
                        onClick={() => onAccess(v.id)}
                      >
                        Delete Access
                      </Button>
                    </Center>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Group sx={{ justifyContent: "flex-end" }} pt={10}>
            <Pagination
              value={isChoosePage}
              onChange={(val) => {
                onPageClick(val);
              }}
              total={isNPage}
            />
          </Group>
        </Paper>
      </Stack>
    </>
  );
}

function TableAdmin({
  dataAdmin,
  setDataAdmin,
  setDataUser,
}: {
  dataAdmin: MODEL_USER[];
  setDataAdmin: any;
  setDataUser: any;
}) {
  async function onAccess(id: string) {
    await adminDeveloper_funEditUserAksesById(id, "1").then(async (res) => {
      if (res.status === 200) {
        await adminDeveloper_funGetListAllUser({ page: 1 }).then((val) => {
          setDataUser(val);
        });
        await adminDeveloper_funGetListAllAdmin({ page: 1 }).then((val) => {
          setDataAdmin(val);
        });
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  const tableBody = dataAdmin.map((e) => (
    <tr key={e.id}>
      <td>
        <Center c={AdminColor.white}>{e.username}</Center>
      </td>
      <td>
        <Center c={AdminColor.white}>{e.nomor}</Center>
      </td>
      <td>
        <Center>
          <Button radius={"xl"} color="red" onClick={() => onAccess(e.id)}>
            Delete Access
          </Button>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title c={AdminColor.white} order={4}>Table Admin</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan username"
          />
        </Group>
        <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
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
        </Paper>
      </Stack>
    </>
  );
}

function TableUser({
  dataUser,
  setDataUser,
  setDataAdmin,
}: {
  dataUser: MODEL_USER[];
  setDataUser: any;
  setDataAdmin: any;
}) {
  async function onAccess(id: string) {
    await adminDeveloper_funEditUserAksesById(id, "2").then(async (res) => {
      if (res.status === 200) {
        await adminDeveloper_funGetListAllUser({ page: 1 }).then((val) => {
          setDataUser(val.data);
        });
        await adminDeveloper_funGetListAllAdmin({ page: 1 }).then((val) => {
          setDataAdmin(val);
        });
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }

  const tableBody = dataUser.map((e) => (
    <tr key={e.id}>
      <td>
        <Center c={AdminColor.white}>{e.username}</Center>
      </td>
      <td>
        <Center c={AdminColor.white}>{e.nomor}</Center>
      </td>
      <td>
        <Center>
          <Button radius={"xl"} onClick={() => onAccess(e.id)}>
            Admin Access
          </Button>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title c={AdminColor.white} order={4}>Table User</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan username"
          />
        </Group>
        <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
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
        </Paper>
      </Stack>
    </>
  );
}
