"use client";

import { AccentColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { clientLogger } from "@/util/clientLogger";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Switch,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { Admin_V3_ComponentSkeletonBreakpoint } from "../../_components_v3/comp_skeleton_breakpoint";
import adminDonasi_funCreateKategori from "../fun/create/fun_create_kategori";
import adminDonasi_funDeleteKategori from "../fun/delete/fun_delete_by_id";
import adminDonasi_getMasterKategori from "../fun/master/get_list_kategori";
import adminDonasi_funUpdatekategoriById from "../fun/update/fun_update_kategori_by_id";
import { apiGetAdminDonasiKategori } from "../lib/api_fetch_admin_donasi";

export default function AdminDonasi_TableKategori() {
  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />
        <TableView />
      </Stack>
    </>
  );
}

function TableView() {
  const [data, setData] = useState<MODEL_NEW_DEFAULT_MASTER[] | null>(null);
  const [create, setCreate] = useState("");
  const [isCreate, setIsCreate] = useState(true);

  // const [kategoriId, setKategoriId] = useState("");
  const [updateKategori, setUpdateKategori] = useState({
    kategoriId: "",
    name: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const [updateStatus, setUpdateStatus] = useState({
    kategoriId: "",
    isActive: "",
  });
  const [isChangeStatus, setIsChangeStatus] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiGetAdminDonasiKategori();
      if (response) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get kategori", error);
    }
  }

  async function onCreateNewKategori() {
    const tambahData = await adminDonasi_funCreateKategori({
      newKategori: create,
    });
    if (tambahData.status === 200) {
      const loadNewdata = await adminDonasi_getMasterKategori();
      setData(loadNewdata);
      setCreate("");
      ComponentAdminGlobal_NotifikasiBerhasil(tambahData.message);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(tambahData.message);
    }
  }

  async function onChangeStatus() {
    const del = await adminDonasi_funDeleteKategori({
      kategoriId: updateStatus.kategoriId,
      isActive: updateStatus.isActive as any,
    });

    if (del.status === 200) {
      const loadNewdata = await adminDonasi_getMasterKategori();
      setData(loadNewdata);
      ComponentAdminGlobal_NotifikasiBerhasil(del.message);
      setIsChangeStatus(false);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(del.message);
    }
  }

  async function onUpdate() {
    const updt = await adminDonasi_funUpdatekategoriById({
      kategoriId: updateKategori.kategoriId,
      name: updateKategori.name,
    });
    if (updt.status === 200) {
      setUpdateKategori({ kategoriId: "", name: "" });
      ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
      const loadData = await adminDonasi_getMasterKategori();
      setData(loadData);
      setIsUpdate(false);
      setIsCreate(true);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updt.message);
    }
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
      );
    }
    return data.map((e, i) => (
      <tr key={i}>
        <td>
          <Box c={AccentColor.white}>
            <Text>{e?.name}</Text>
          </Box>
        </td>
        <td>
          <Center>
            <Switch
              color="orange"
              onLabel="ON"
              offLabel="OFF"
              checked={e?.active}
              onChange={(val) => {
                const status = val.currentTarget.checked;
                setIsChangeStatus(true);
                setUpdateStatus({
                  kategoriId: e?.id,
                  isActive: status as any,
                });
              }}
            />
          </Center>
        </td>
        <td>
          <Group position="center">
            <ActionIcon
              variant="transparent"
              onClick={() => {
                setIsUpdate(true);
                setIsCreate(false);
                setUpdateKategori({
                  kategoriId: e?.id,
                  name: e?.name,
                });
              }}
            >
              <IconEdit color={AdminColor.green} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Kategori"
          color={AdminColor.softBlue}
          // component={
          //   <Button
          //     w={120}
          //     leftIcon={<IconCirclePlus />}
          //     radius={"xl"}
          //     onClick={() => {
          //       setIsCreate(true);
          //       setIsUpdate(false);
          //     }}
          //   >
          //     Tambah
          //   </Button>
          // }
        />

        {!data ? (
          <Admin_V3_ComponentSkeletonBreakpoint />
        ) : (
          <Admin_V3_ComponentBreakpoint md={2} lg={2}>
            <div>
              {isCreate && (
                <Paper p={"md"} bg={AdminColor.softBlue}>
                  <Stack>
                    <TextInput
                      value={create}
                      label={
                        <Title c={AdminColor.white} order={6}>
                          Tambah Kategori
                        </Title>
                      }
                      placeholder="Masukan kategori baru"
                      onChange={(val) => {
                        setCreate(val.currentTarget.value);
                      }}
                    />
                    <Group position="right">
                      {/* <Button
                      style={{
                        transition: "0.5s",
                      }}
                      radius={"xl"}
                      onClick={() => {
                        setIsCreate(false);
                        setCreate("");
                      }}
                    >
                      Batal
                    </Button> */}
                      <Button
                        style={{
                          transition: "0.5s",
                        }}
                        disabled={create === ""}
                        radius={"xl"}
                        color="teal"
                        onClick={() => {
                          onCreateNewKategori();
                        }}
                      >
                        Simpan
                      </Button>
                    </Group>
                  </Stack>
                </Paper>
              )}

              {isUpdate && (
                <Paper
                  p={"md"}
                  bg={AdminColor.softBlue}
                  style={{ transition: "1s" }}
                >
                  <Stack>
                    <TextInput
                      value={updateKategori.name}
                      label={
                        <Title c={AdminColor.white} order={6}>
                          Update Kategori
                        </Title>
                      }
                      placeholder="Update kategori"
                      onChange={(val) => {
                        const data = _.clone(updateKategori);
                        setUpdateKategori({
                          kategoriId: data.kategoriId,
                          name: val.currentTarget.value,
                        });
                      }}
                    />
                    <Group position="right">
                      <Button
                        style={{
                          transition: "0.5s",
                        }}
                        radius={"xl"}
                        onClick={() => {
                          setIsUpdate(false);
                          setIsCreate(true);
                          setUpdateKategori({
                            kategoriId: "",
                            name: "",
                          });
                        }}
                      >
                        Batal
                      </Button>
                      <Button
                        disabled={updateKategori.name === "" ? true : false}
                        style={{
                          transition: "0.5s",
                        }}
                        color="green"
                        radius={"xl"}
                        onClick={() => {
                          onUpdate();
                        }}
                      >
                        Update
                      </Button>
                    </Group>
                  </Stack>
                </Paper>
              )}
            </div>

            <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"70vh"}>
              <ScrollArea w={"100%"} h={"90%"}>
                <Table
                  verticalSpacing={"xs"}
                  horizontalSpacing={"md"}
                  p={"md"}
                  w={"100%"}
                >
                  <thead>
                    <tr>
                      <th>
                        <Text c={AccentColor.white}>Kategori</Text>
                      </th>
                      <th>
                        <Center c={AccentColor.white}>Status</Center>
                      </th>
                      <th>
                        <Center c={AccentColor.white}>Aksi</Center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderTableBody()}</tbody>
                </Table>
              </ScrollArea>
              {/* <Center mt={"xl"}>
                <Pagination
                  total={10}
                  // value={isActivePage}
                  // total={isNPage}
                  // onChange={(val) => {
                  //   onPageClick(val);
                  // }}
                />
              </Center> */}
            </Paper>
          </Admin_V3_ComponentBreakpoint>
        )}
      </Stack>

      <Modal
        opened={isChangeStatus}
        onClose={() => setIsChangeStatus(false)}
        withCloseButton={false}
        centered
      >
        <Stack align="center">
          <Title order={5}>
            Anda ingin{" "}
            {updateStatus.isActive ? (
              <Text span inherit>
                mengaktifkan
              </Text>
            ) : (
              <Text span inherit>
                menonaktifkan
              </Text>
            )}{" "}
            Bank ini ?
          </Title>
          <Group>
            <Button radius={"xl"} onClick={() => setIsChangeStatus(false)}>
              Batal
            </Button>
            <Button
              color="green"
              radius={"xl"}
              onClick={() => {
                onChangeStatus();
              }}
            >
              Iya
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
