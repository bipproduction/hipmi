"use client";

import {
  AdminColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
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
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_ComponentModal } from "../../_admin_global/_component/comp_admin_modal";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import {
  adminAppInformation_funCreateBidangBisnis,
  adminAppInformation_funGetBidangBisnis,
  adminAppInformation_funUpdateBidangBisnis,
} from "../fun";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetMasterAdminBidangBisnis } from "../lib/api_fetch_master";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export function AdminAppInformation_ViewKategoriPortofolio() {
  const [data, setData] = useState<MODEL_DEFAULT_MASTER_OLD[] | null>(null);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  async function handleLoadData() {
    try {
      const response = await apiGetMasterAdminBidangBisnis();

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

  // Create
  const [isLoadingCreate, setLoadingCreate] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [newData, setNewData] = useState("");
  async function onCreate() {
    try {
      const create = await adminAppInformation_funCreateBidangBisnis({
        name: newData,
      });

      if (create.status === 201) {
        setLoadingCreate(true);
        const loadData = await adminAppInformation_funGetBidangBisnis();
        setData(loadData);
        setNewData("");
        ComponentAdminGlobal_NotifikasiBerhasil(create.message);
      } else {
        ComponentAdminGlobal_NotifikasiGagal(create.message);
      }
    } catch (error) {
      console.log(error);
      ComponentAdminGlobal_NotifikasiGagal("Gagal menambah bidang bisnis");
    } finally {
      setLoadingCreate(false);
    }
  }

  //   Update Data
  const [isLoadingUpdate, setLoadingUpdate] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
  });

  async function onUpdate() {
    try {
      setLoadingUpdate(true);
      const updt = await adminAppInformation_funUpdateBidangBisnis({
        data: updateData as any,
      });
      if (updt?.status === 200) {
        const loadData = await adminAppInformation_funGetBidangBisnis();
        setData(loadData);

        ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
      } else {
        ComponentAdminGlobal_NotifikasiGagal(updt?.message as any);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdate(false);
      setIsCreate(true);
      setLoadingUpdate(false);
    }
  }

  // Activation
  const [openModal, setOpenModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({
    id: "",
    active: null,
  });
  const [isLoadingActivation, setLoadingActivation] = useState(false);

  async function onUpdateActivation({
    id,
    active,
  }: {
    id: string;
    active: boolean;
  }) {
    try {
      setLoadingActivation(true);
      const updt = await adminAppInformation_funUpdateBidangBisnis({
        data: { id: id, active: active },
      });

      if (updt?.status === 200) {
        const loadData = await adminAppInformation_funGetBidangBisnis();
        setData(loadData);
        setOpenModal(false);
        setLoadingActivation(false);
        ComponentAdminGlobal_NotifikasiBerhasil(updt?.message);
      } else {
        ComponentAdminGlobal_NotifikasiGagal(updt?.message as any);
      }
    } catch (error) {
      console.log(error);
      ComponentAdminGlobal_NotifikasiGagal("Gagal mengupdate status");
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
                  name: e?.name,
                });
              }}
            >
              Edit
            </Button>
            {/* <ActionIcon
            radius={"xl"}
            variant="transparent"
            onClick={() => {
              setIsUpdate(true);
              setIsCreate(false);
              setUpdateData({
                id: e?.id,
                name: e?.name,
              });
            }}
          >
            <Tooltip label="Edit">
              <IconEdit color={AdminColor.white} />
            </Tooltip>
          </ActionIcon> */}
          </Stack>
        </td>

        <td>
          <Center>
            <Switch
              color="orange"
              onLabel="ON"
              offLabel="OFF"
              checked={e?.active}
              onChange={(val) => {
                setOpenModal(true);
                setUpdateStatus({
                  id: e?.id,
                  active: val.currentTarget.checked as any,
                });
              }}
            />
          </Center>
        </td>

        <td>
          <Box>
            <Text c={AdminColor.white}>{e?.name}</Text>
          </Box>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_TitlePage
          name="Kategori Bidang Bisnis"
          // component={
          //   <Button
          //     radius={"xl"}
          //     leftIcon={<IconCirclePlus />}
          //     onClick={() => {
          //       setIsCreate(true);
          //       setIsUpdate(false);
          //     }}
          //   >
          //     Tambah
          //   </Button>
          // }
        />

        <Admin_V3_ComponentBreakpoint>
          <div>
            {/* Form Create */}
            {isCreate ? (
              <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg">
                <Stack>
                  <Center>
                    <Title c={AdminColor.white} order={5}>
                      Tambah Bidang Bisnis
                    </Title>
                  </Center>

                  <TextInput
                    placeholder="Masukan nama bidang bisnis"
                    value={newData}
                    onChange={(val) => {
                      setNewData(val.currentTarget.value);
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
                      disabled={newData == "" || !data}
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

            {/* Form Update */}
            {isUpdate ? (
              <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg">
                <Stack>
                  <Center>
                    <Title c={AdminColor.white} order={5}>
                      Update Bidang Bisnis
                    </Title>
                  </Center>
                  <TextInput
                    placeholder="Masukan bidang bisnis"
                    value={updateData.name}
                    onChange={(val) => {
                      const value = val.currentTarget.value;
                      setUpdateData({ ...updateData, name: value });
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
                      disabled={updateData?.name === ""}
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
          </div>

          {!data ? (
            <CustomSkeleton height={"80vh"} width="100%" />
          ) : (
            <Paper p={"md"} bg={AdminColor.softBlue} h={"65vh"}>
              <ScrollArea w={"100%"} h={"90%"} offsetScrollbars>
                <Table
                  verticalSpacing={"xs"}
                  horizontalSpacing={"md"}
                  p={"md"}
                  w={"100%"}
                >
                  <thead>
                    <tr>
                      <th>
                        <Center c={AdminColor.white}>Status</Center>
                      </th>
                      <th>
                        <Center c={AdminColor.white}>Aksi</Center>
                      </th>
                      <th>
                        <Text c={AdminColor.white}>Kategori</Text>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{rowTable()}</tbody>
                </Table>
              </ScrollArea>
            </Paper>
          )}
        </Admin_V3_ComponentBreakpoint>
      </Stack>

      {/* Activasi bank */}
      <Admin_ComponentModal
        opened={openModal}
        onClose={() => setOpenModal(false)}
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
            Bidang Bisnis ini ?
          </Title>
          <Group>
            <Button radius={"xl"} onClick={() => setOpenModal(false)}>
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
                  active: updateStatus.active as any,
                });
              }}
            >
              Iya
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentModal>
    </>
  );
}
