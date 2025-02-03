"use client";

import {
  Stack,
  Group,
  Title,
  Paper,
  ScrollArea,
  Center,
  Pagination,
  Table,
  Grid,
  TextInput,
  Button,
  Text,
  ActionIcon,
  Overlay,
  Switch,
  Modal,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
import { useState } from "react";
import { IconCirclePlus, IconEdit, IconTrash } from "@tabler/icons-react";
import adminDonasi_funCreateKategori from "../fun/create/fun_create_kategori";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import adminDonasi_getMasterKategori from "../fun/master/get_list_kategori";
import adminDonasi_funDeleteKategori from "../fun/delete/fun_delete_by_id";
import adminDonasi_funUpdatekategoriById from "../fun/update/fun_update_kategori_by_id";
import _ from "lodash";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { AccentColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminDonasi_TableKategori({
  listKategori,
}: {
  listKategori: MODEL_NEW_DEFAULT_MASTER[];
}) {
  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />
        <TableView list={listKategori} />
      </Stack>
    </>
  );
}

function TableView({ list }: { list: MODEL_NEW_DEFAULT_MASTER[] }) {
  const [data, setData] = useState(list);

  const [create, setCreate] = useState("");
  const [isCreate, setIsCreate] = useState(false);

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
    // console.log(updateStatus.kategoriId, updateStatus.isActive);
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
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updt.message);
    }
  }

  const rowTable = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center c={AccentColor.white}>
          <Text>{e?.name}</Text>
        </Center>
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

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <ComponentAdminGlobal_TitlePage
          name="Kategori"
          color={AdminColor.softBlue}
          component={
            <Button
            w={120}
            leftIcon={<IconCirclePlus />}
            radius={"xl"}
            onClick={() => {
              setIsCreate(true);
              setIsUpdate(false);
            }}
          >
            Tambah
          </Button>
          }
        />
        {/* <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Kategori</Title>
          <Button
            w={120}
            leftIcon={<IconCirclePlus />}
            radius={"xl"}
            onClick={() => {
              setIsCreate(true);
              setIsUpdate(false);
            }}
          >
            Tambah
          </Button>
        </Group> */}

        <Grid>
          <Grid.Col span={"auto"}>
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
                        <Center c={AccentColor.white}>Kategori</Center>
                      </th>
                      <th>
                        <Center c={AccentColor.white}>Status</Center>
                      </th>
                      <th>
                        <Center c={AccentColor.white}>Aksi</Center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{rowTable}</tbody>
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
          </Grid.Col>

          <Grid.Col span={4}>
            {isCreate ? (
              <Paper p={"md"} withBorder>
                <Stack>
                  <TextInput
                    value={create}
                    label={<Title order={6}>Tambah Kategori</Title>}
                    placeholder="Masukan kategori baru"
                    onChange={(val) => {
                      setCreate(val.currentTarget.value);
                    }}
                  />
                  <Group position="right">
                    <Button
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
                    </Button>
                    <Button
                      style={{
                        transition: "0.5s",
                      }}
                      disabled={create === "" ? true : false}
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
            ) : (
              ""
            )}

            {isUpdate ? (
              <Paper p={"md"} withBorder style={{ transition: "1s" }}>
                <Stack>
                  <TextInput
                    value={updateKategori.name}
                    label={<Title order={6}>Update Kategori</Title>}
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
            ) : (
              ""
            )}
          </Grid.Col>
        </Grid>
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
