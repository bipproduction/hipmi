"use client";

import { AccentColor } from "@/app_modules/_global/color";
import {
  AdminColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { MODEL_MASTER_BANK } from "@/app_modules/investasi/_lib/interface";
import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Switch,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import { Admin_ComponentModal } from "../../_admin_global/_component/comp_admin_modal";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { AdminAppInformation_ComponentTitlePageBank } from "../component";
import adminAppInformation_createBank from "../fun/create/fun_create_new_bank";
import adminAppInformation_getMasterBank from "../fun/master/get_list_bank";
import adminAppInformation_updateStatusBankById from "../fun/update/fun_udpate_status_bank";
import adminAppInformation_updateDataBankById from "../fun/update/fun_update_data_bank";
import { useShallowEffect } from "@mantine/hooks";

import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { apiGetMasterAdminBank } from "../lib/api_fetch_master";

export default function AdminAppInformation_ViewInfoBank() {
  const [data, setData] = useState<MODEL_MASTER_BANK[] | null>(null);
  const [isCreate, setIsCreate] = useState(true);
  const [isLoadingCreate, setLoadingCreate] = useState(false);
  const [isLoadingUpdate, setLoadingUpdate] = useState(false);
  const [isLoadingActivation, setLoadingActivation] = useState(false);

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

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  async function handleLoadData() {
    try {
      const response = await apiGetMasterAdminBank();

      if (response && response.success) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("Error load data", error);
      setData([]);
    }
  }

  async function onCreate() {
    try {
      setLoadingCreate(true);
      const create = await adminAppInformation_createBank({ data: newData });

      if (create.status === 200) {
        setNewData({
          namaBank: "",
          namaAkun: "",
          norek: "",
        });

        const loadData = await adminAppInformation_getMasterBank();
        setData(loadData);
        ComponentAdminGlobal_NotifikasiBerhasil(create.message);
      } else {
        ComponentAdminGlobal_NotifikasiGagal(create.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCreate(false);
    }
  }

  async function onUpdate() {
    try {
      setLoadingUpdate(true);
      const updt = await adminAppInformation_updateDataBankById({
        data: updateData as any,
      });
      if (updt.status === 200) {
        const loadData = await adminAppInformation_getMasterBank();
        setData(loadData);
        setIsUpdate(false);
        setIsCreate(true);

        ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
      } else {
        ComponentAdminGlobal_NotifikasiGagal(updt.message);
      }
    } catch (error) {
      console.log("Error update data bank", error);
    } finally {
      setLoadingUpdate(false);
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

    try {
      setLoadingActivation(true);
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
    } catch (error) {
      console.log("Error update status bank", error);
    } finally {
      setLoadingActivation(false);
    }
  }

  const rowTable = () => {
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

    return data.map((e, i) => (
      <tr key={i}>
        <td>
          <Stack align="center" justify="center">
            <Button
              leftIcon={<IconEdit />}
              radius={"xl"}
              bg={MainColor.green}
              color="green"
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
              Edit
            </Button>
            {/* <ActionIcon variant="transparent">
              <Tooltip label="Edit">
                <IconEdit color={AdminColor.green} />
              </Tooltip>
            </ActionIcon> */}
          </Stack>
        </td>
        <td>
          <Box>
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
          </Box>
        </td>

        <td>
          <Box c={AccentColor.white} w={100}>
            <Text>{e?.namaBank}</Text>
          </Box>
        </td>

        <td>
          <Box c={AccentColor.white} w={150}>
            <Text>{e?.namaAkun}</Text>
          </Box>
        </td>
        <td>
          <Box c={AccentColor.white}>
            <Text>{e?.norek}</Text>
          </Box>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack>
        <AdminAppInformation_ComponentTitlePageBank
          onEventListener={(val: { isCreate: any; isUpdate: any }) => {
            setIsCreate(val.isCreate);
            setIsUpdate(val.isUpdate);
          }}
        />

        <Admin_V3_ComponentBreakpoint>
          <div>
            {isCreate && (
              <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg">
                <Stack>
                  <Center>
                    <Title c={AccentColor.white} order={5}>
                      Tambah Daftar Bank
                    </Title>
                  </Center>

                  <TextInput
                    label={"Nama Bank"}
                    value={newData.namaBank}
                    styles={{
                      label: {
                        color: AdminColor.white,
                      },
                    }}
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
                    value={newData.namaAkun}
                    styles={{
                      label: {
                        color: AdminColor.white,
                      },
                    }}
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
                    value={newData.norek}
                    styles={{
                      label: {
                        color: AdminColor.white,
                      },
                    }}
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
                    {/* <Button
                      radius={"xl"}
                      onClick={() => {
                        setIsCreate(false);
                      }}
                    >
                      Batal
                    </Button> */}
                    <Button

                      loading={isLoadingCreate}
                      loaderPosition="center"
                      style={{ transition: "0.5s" }}
                      disabled={_.values(newData).includes("") || !data}
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
            )}

            {isUpdate && (
              <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg">
                <Stack>
                  <Center>
                    <Title c={AdminColor.white} order={5}>
                      Update Data Bank
                    </Title>
                  </Center>
                  <TextInput
                    label={"Nama Bank"}
                    styles={{
                      label: {
                        color: AdminColor.white,
                      },
                    }}
                    placeholder="Masukan nama bank"
                    value={updateData.namaBank}
                    onChange={(val) => {
                      const value = val.currentTarget.value;
                      setUpdateData({ ...updateData, namaBank: value });
                    }}
                  />

                  <TextInput
                    label={"Nama Rekening"}
                    styles={{
                      label: {
                        color: AdminColor.white,
                      },
                    }}
                    placeholder="Masukan nama rekening"
                    value={updateData.namaAkun}
                    onChange={(val) => {
                      const value = val.currentTarget.value;
                      setUpdateData({ ...updateData, namaAkun: value });
                    }}
                  />

                  <TextInput
                    label={"Nomor Rekening Bank"}
                    styles={{
                      label: {
                        color: AdminColor.white,
                      },
                    }}
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
                        setIsCreate(true);
                      }}
                    >
                      Batal
                    </Button>
                    <Button
                      loading={isLoadingUpdate}
                      loaderPosition="center"
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
            )}
          </div>
        </Admin_V3_ComponentBreakpoint>

        <Admin_V3_ComponentBreakpoint cols={1}>
          {!data ? (
            <CustomSkeleton height={"80vh"} width="100%" />
          ) : (
            <Paper p={"md"} bg={AdminColor.softBlue} h={"65vh"}>
              <ScrollArea w={"100%"} h={"90%"} offsetScrollbars>
                <Table verticalSpacing={"xs"} horizontalSpacing={"md"} p={"md"}>
                  <thead>
                    <tr>
                      <th>
                        <Center c={AdminColor.white}>Aksi</Center>
                      </th>
                      <th>
                        <Text c={AdminColor.white}>Status</Text>
                      </th>
                      <th>
                        <Text c={AdminColor.white} w={100}>
                          Bank
                        </Text>
                      </th>
                      <th>
                        <Text c={AdminColor.white}>Nama Rekening</Text>
                      </th>
                      <th>
                        <Text c={AdminColor.white}>Nomor Rekening</Text>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{rowTable()}</tbody>
                </Table>
              </ScrollArea>
            </Paper>
          )}
        </Admin_V3_ComponentBreakpoint>

        {/* Activasi bank */}
        <Admin_ComponentModal
          opened={isActivation}
          onClose={() => setIsActivation(false)}
        >
          <Stack align="center">
            <Title order={5} c={MainColor.white}>
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
                loading={isLoadingActivation}
                loaderPosition="center"
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
        </Admin_ComponentModal>
      </Stack>
    </>
  );
}
