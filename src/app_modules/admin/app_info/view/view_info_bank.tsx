"use client";

import { MODEL_MASTER_BANK } from "@/app_modules/investasi/_lib/interface";
import {
  ActionIcon,
  Button,
  Center,
  Grid,
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
  Tooltip,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { AdminAppInformation_ComponentTitlePageBank } from "../component";
import adminAppInformation_createBank from "../fun/create/fun_create_new_bank";
import adminAppInformation_getMasterBank from "../fun/master/get_list_bank";
import adminAppInformation_updateStatusBankById from "../fun/update/fun_udpate_status_bank";
import adminAppInformation_updateDataBankById from "../fun/update/fun_update_data_bank";

export default function AdminAppInformation_ViewInfoBank({
  listBank,
}: {
  listBank: MODEL_MASTER_BANK[];
}) {
  const [data, setData] = useState(listBank);
  const [isCreate, setIsCreate] = useState(false);
  const [isLoadingCreate, setLoadingCreate] = useState(false);

  const [newData, setNewData] = useState<any>({
    namaBank: "",
    namaAkun: "",
    norek: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    namaBank: "",
    namaAkun: "",
    norek: "",
  });

  const [isActivation, setIsActivation] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({
    id: "",
    active: "",
  });

  async function onCreate() {
    const create = await adminAppInformation_createBank({ data: newData });
    if (create.status === 200) {
      try {
        const loadData = await adminAppInformation_getMasterBank();
        setData(loadData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCreate(true);
        ComponentAdminGlobal_NotifikasiBerhasil(create.message);
      }
    } else {
      ComponentAdminGlobal_NotifikasiGagal(create.message);
    }
    setIsCreate(false);
  }

  async function onUpdate() {
    const updt = await adminAppInformation_updateDataBankById({
      data: updateData as any,
    });
    if (updt.status === 200) {
      const loadData = await adminAppInformation_getMasterBank();
      setData(loadData);
      ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
      setIsUpdate(false);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updt.message);
    }
  }

  async function onUpdateActivation({
    id,
    value,
  }: {
    id: string;
    value: boolean;
  }) {
    const data = {
      id: id,
      isActive: value,
    };

    const updt = await adminAppInformation_updateStatusBankById({
      data: data as any,
    });

    if (updt.status === 200) {
      const loadData = await adminAppInformation_getMasterBank();
      setData(loadData);
      ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
      setIsActivation(false);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updt.message);
    }
  }

  const rowTable = _.isEmpty(data) ? (
    <tr>
      <Center>
        <Text>Tidak ada data</Text>
      </Center>
    </tr>
  ) : (
    data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center w={150}>
            <Text>{e?.namaBank}</Text>
          </Center>
        </td>
        <td>
          <Center>
            <Switch
              color="orange"
              onLabel="ON"
              offLabel="OFF"
              checked={e?.isActive}
              onChange={(val) => {
                setIsActivation(true);
                setUpdateStatus({
                  id: e?.id,
                  active: val.currentTarget.checked as any,
                });
              }}
            />
          </Center>
        </td>
        <td>
          <Center>
            <Text>{e?.namaAkun}</Text>
          </Center>
        </td>
        <td>
          <Center>
            <Text>{e?.norek}</Text>
          </Center>
        </td>

        <td>
          <Stack align="center" justify="center">
            <ActionIcon
              radius={"xl"}
              variant="transparent"
              onClick={() => {
                setIsUpdate(true);
                setIsCreate(false);
                setUpdateData({
                  id: e?.id,
                  namaBank: e?.namaBank,
                  namaAkun: e?.namaAkun,
                  norek: e?.norek,
                });
              }}
            >
              <Tooltip label="Edit">
                <IconEdit color="green" />
              </Tooltip>
            </ActionIcon>
          </Stack>
        </td>
      </tr>
    ))
  );

  return (
    <>
      <Stack>
        <Stack spacing={"xs"}>
          <AdminAppInformation_ComponentTitlePageBank
            onEventListener={(val: { isCreate: any; isUpdate: any }) => {
              setIsCreate(val.isCreate);
              setIsUpdate(val.isUpdate);
            }}
          />
        </Stack>

        <Grid>
          <Grid.Col span={9}>
            <Paper p={"md"} withBorder shadow="lg" h={"65vh"}>
              <ScrollArea w={"100%"} h={"90%"} offsetScrollbars>
                <Table
                  verticalSpacing={"xs"}
                  horizontalSpacing={"md"}
                  p={"md"}
                  w={1000}
                  striped
                  highlightOnHover
                >
                  <thead>
                    <tr>
                      <th>
                        <Center w={150}>Bank</Center>
                      </th>
                      <th>
                        <Center>Status</Center>
                      </th>
                      <th>
                        <Center>Nama Rekening</Center>
                      </th>
                      <th>
                        <Center>Nomor Rekening</Center>
                      </th>
                      <th>
                        <Center>Aksi</Center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{rowTable}</tbody>
                </Table>
              </ScrollArea>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            {isCreate ? (
              <Paper p={"md"} withBorder shadow="lg">
                <Stack>
                  <Center>
                    <Title order={5}>Tambah Daftar Bank</Title>
                  </Center>

                  <TextInput
                    label={"Nama Bank"}
                    placeholder="Masukan nama bank"
                    onChange={(val) => {
                      setNewData({
                        ...newData,
                        namaBank: val.currentTarget.value,
                      });
                    }}
                  />

                  <TextInput
                    label={"Nama Rekening"}
                    placeholder="Masukan nama rekening"
                    onChange={(val) => {
                      setNewData({
                        ...newData,
                        namaAkun: val.currentTarget.value,
                      });
                    }}
                  />

                  <TextInput
                    label={"Nomor Rekening Bank"}
                    placeholder=" Masukan nomor rekening bank"
                    type="number"
                    onChange={(val) => {
                      setNewData({
                        ...newData,
                        norek: val.currentTarget.value,
                      });
                    }}
                  />
                  <Group position="right" align="flex-end">
                    <Button
                      radius={"xl"}
                      onClick={() => {
                        setIsCreate(false);
                      }}
                    >
                      Batal
                    </Button>
                    <Button
                      loading={isLoadingCreate}
                      loaderPosition="center"
                      style={{ transition: "0.5s" }}
                      disabled={_.values(newData).includes("") ? true : false}
                      radius={"xl"}
                      color="green"
                      onClick={() => {
                        onCreate();
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
              <Paper p={"md"} withBorder shadow="lg">
                <Stack>
                  <Center>
                    <Title order={5}>Update Data Bank</Title>
                  </Center>
                  <TextInput
                    label={"Nama Bank"}
                    placeholder="Masukan nama bank"
                    value={updateData.namaBank}
                    onChange={(val) => {
                      const value = val.currentTarget.value;
                      setUpdateData({ ...updateData, namaBank: value });
                    }}
                  />

                  <TextInput
                    label={"Nama Rekening"}
                    placeholder="Masukan nama rekening"
                    value={updateData.namaAkun}
                    onChange={(val) => {
                      const value = val.currentTarget.value;
                      setUpdateData({ ...updateData, namaAkun: value });
                    }}
                  />

                  <TextInput
                    label={"Nomor Rekening Bank"}
                    placeholder=" Masukan nomor rekening bank"
                    type="number"
                    value={updateData.norek}
                    onChange={(val) => {
                      const value = val.currentTarget.value;
                      setUpdateData({ ...updateData, norek: value });
                    }}
                  />
                  <Group position="right">
                    <Button
                      radius={"xl"}
                      onClick={() => {
                        setIsUpdate(false);
                      }}
                    >
                      Batal
                    </Button>
                    <Button
                      style={{ transition: "0.5s" }}
                      disabled={
                        updateData?.namaBank === "" ||
                        updateData?.namaAkun === "" ||
                        updateData?.norek === ""
                          ? true
                          : false
                      }
                      radius={"xl"}
                      color="green"
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

        {/* Activasi bank */}
        <Modal
          centered
          withCloseButton={false}
          opened={isActivation}
          onClose={() => setIsActivation(false)}
        >
          <Stack align="center">
            <Title order={5}>
              Anda ingin{" "}
              {updateStatus.active ? (
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
              <Button radius={"xl"} onClick={() => setIsActivation(false)}>
                Batal
              </Button>
              <Button
                color="green"
                radius={"xl"}
                onClick={() => {
                  onUpdateActivation({
                    id: updateStatus.id,
                    value: updateStatus.active as any,
                  });
                }}
              >
                Iya
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </>
  );
}
