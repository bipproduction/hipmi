"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import {
  Button,
  Center,
  Paper,
  ScrollArea,
  Stack,
  Table,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../_admin_global/_component";
import ComponentAdminGlobal_HeaderTamplate from "../_admin_global/header_tamplate";
import { Admin_V3_ComponentPaginationBreakpoint } from "../_components_v3/comp_pagination_breakpoint";
import { Admin_V3_ComponentBreakpoint } from "../_components_v3/comp_simple_grid_breakpoint";
import { apiGetUserAccess } from "../user-access/_lib/api_fetch_user_access";
import { apiAdminGetListAdmin } from "./_lib/api_fetch_developer";
import adminDeveloper_funEditUserAksesById from "./fun/edit/fun_edit_user_akses_by_id";

export default function AdminDeveloper() {
  // USER
  const [data, setData] = useState<MODEL_USER[] | null>(null);
  const [nPage, setNPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [reloadUser, setReloadUser] = useState(false);

  useShallowEffect(() => {
    handleLoad_DataUser();
  }, [activePage, isSearch, reloadUser]);

  const handleLoad_DataUser = async () => {
    try {
      const response = await apiGetUserAccess({
        page: `${activePage}`,
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

  // ADMIN
  const [dataAdmin, setDataAdmin] = useState<MODEL_USER[] | null>(null);
  const [nPageAdmin, setNPageAdmin] = useState(1);
  const [activePageAdmin, setActivePageAdmin] = useState(1);
  const [isSearchAdmin, setSearchAdmin] = useState("");
  const [reloadAdmin, setReloadAdmin] = useState(false);

  useShallowEffect(() => {
    handleLoad_DataAdmin();
  }, [activePageAdmin, isSearchAdmin, reloadAdmin]);

  const handleLoad_DataAdmin = async () => {
    try {
      const response = await apiAdminGetListAdmin({
        page: `${activePageAdmin}`,
        search: isSearchAdmin,
      });

      if (response.success) {
        setDataAdmin(response.data.data);
        setNPageAdmin(response.data.nPage);
      } else {
        setDataAdmin([]);
      }
    } catch (error) {
      console.error("Error get user access", error);
      setDataAdmin([]);
    }
  };

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Super Admin" />
        <Admin_V3_ComponentBreakpoint>
          <NewTableUser
            data={data}
            nPage={nPage}
            activePage={activePage}
            isSearch={isSearch}
            setData={setData}
            setNPage={setNPage}
            setActivePage={setActivePage}
            setSearch={setSearch}
            handleLoad_DataUser={handleLoad_DataUser}
            handleLoad_DataAdmin={handleLoad_DataAdmin}
          />
          <NewTableAdmin
            data={dataAdmin}
            nPage={nPageAdmin}
            activePage={activePageAdmin}
            isSearch={isSearchAdmin}
            setData={setDataAdmin}
            setNPage={setNPageAdmin}
            setActivePage={setActivePageAdmin}
            setSearch={setSearchAdmin}
            handleLoad_DataAdmin={handleLoad_DataAdmin}
            handleLoad_DataUser={handleLoad_DataUser}
          />
        </Admin_V3_ComponentBreakpoint>
      </Stack>
    </>
  );
}

function NewTableUser({
  data,
  nPage,
  activePage,
  isSearch,
  setData,
  setNPage,
  setActivePage,
  setSearch,
  handleLoad_DataUser,
  handleLoad_DataAdmin,
}: {
  data: MODEL_USER[] | null;
  nPage: number;
  activePage: number;
  isSearch: string;
  setData: (data: MODEL_USER[] | null) => void;
  setNPage: (nPage: number) => void;
  setActivePage: (activePage: number) => void;
  setSearch: (isSearch: string) => void;
  handleLoad_DataUser: () => void;
  handleLoad_DataAdmin: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  async function onSearch(s: any) {
    setSearch(s);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
  }

  async function onAccess(id: string) {
    try {
      setSelectedId(id);
      const upd = await adminDeveloper_funEditUserAksesById(id, "2");
      if (upd.status == 200) {
        handleLoad_DataUser();
        handleLoad_DataAdmin();
        ComponentGlobal_NotifikasiBerhasil(upd.message);
        setSelectedId(null);
      } else {
        ComponentGlobal_NotifikasiGagal(upd.message);
        setSelectedId(null);
      }
    } catch (error) {
      console.error("Error get data admin", error);
      setSelectedId(null);
    }
  }

  const tableBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <tr>
          <td colSpan={3}>
            <Center c={AdminColor.white}>No data available</Center>
          </td>
        </tr>
      );
    }

    return data.map((v: any, i: any) => (
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
              loaderPosition="center"
              loading={selectedId === v.id}
              radius={"xl"}
              onClick={() => onAccess(v.id)}
            >
              Admin Access
            </Button>
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"}>
        <ComponentAdminGlobal_TitlePage
          name="Table User"
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
          <CustomSkeleton h={"80vh"} />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table verticalSpacing={"xs"} horizontalSpacing={"md"} p={"md"}>
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
                <tbody>{tableBody()}</tbody>
              </Table>
            </ScrollArea>
            <Admin_V3_ComponentPaginationBreakpoint
              value={activePage}
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

function NewTableAdmin({
  data,
  nPage,
  activePage,
  isSearch,
  setData,
  setNPage,
  setActivePage,
  setSearch,
  handleLoad_DataUser,
  handleLoad_DataAdmin,
}: {
  data: MODEL_USER[] | null;
  nPage: number;
  activePage: number;
  isSearch: string;
  setData: (data: MODEL_USER[] | null) => void;
  setNPage: (nPage: number) => void;
  setActivePage: (activePage: number) => void;
  setSearch: (isSearch: string) => void;
  handleLoad_DataUser: () => void;
  handleLoad_DataAdmin: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  async function onSearch(s: any) {
    setSearch(s);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
  }

  async function onAccess(id: string) {
    try {
      setSelectedId(id);
      const upd = await adminDeveloper_funEditUserAksesById(id, "1");
      if (upd.status == 200) {
        handleLoad_DataUser();
        handleLoad_DataAdmin();
        ComponentGlobal_NotifikasiBerhasil(upd.message);
        setSelectedId(null);
      } else {
        ComponentGlobal_NotifikasiGagal(upd.message);
        setSelectedId(null);
      }
    } catch (error) {
      console.error("Error get data admin", error);
      setSelectedId(null);
    }
  }

  const tableBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <tr>
          <td colSpan={3}>
            <Center c={AdminColor.white}>No data available</Center>
          </td>
        </tr>
      );
    }

    return data.map((v: any, i: any) => (
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
              loaderPosition="center"
              loading={selectedId === v.id}
              radius={"xl"}
              color="red"
              onClick={() => onAccess(v.id)}
            >
              Delete Access
            </Button>
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"}>
        <ComponentAdminGlobal_TitlePage
          name="Table Admin"
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
          <CustomSkeleton h={"80vh"} />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table verticalSpacing={"xs"} horizontalSpacing={"md"} p={"md"}>
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
                <tbody>{tableBody()}</tbody>
              </Table>
            </ScrollArea>
            <Admin_V3_ComponentPaginationBreakpoint
              value={activePage}
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
