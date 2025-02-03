import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
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
import { IconCirclePlus, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import {
    adminAppInformation_funCreateBidangBisnis,
    adminAppInformation_funGetBidangBisnis,
    adminAppInformation_funUpdateBidangBisnis,
} from "../fun";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export function AdminAppInformation_ViewKategoriPortofolio({
  dataBidangBisnis,
}: {
  dataBidangBisnis: MODEL_DEFAULT_MASTER_OLD[];
}) {
  const [data, setData] = useState(dataBidangBisnis);

  // Create
  const [isLoadingCreate, setLoadingCreate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [newData, setNewData] = useState("");
  async function onCreate() {
    const create = await adminAppInformation_funCreateBidangBisnis({
      name: newData,
    });

    if (create.status === 201) {
      try {
        setLoadingCreate(true);
        const loadData = await adminAppInformation_funGetBidangBisnis();
        setData(loadData);
      } catch (error) {
        console.log(error);
      } finally {
        setNewData("");
        setLoadingCreate(false);
        ComponentAdminGlobal_NotifikasiBerhasil(create.message);
      }
    } else {
      ComponentAdminGlobal_NotifikasiGagal(create.message);
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
    const updt = await adminAppInformation_funUpdateBidangBisnis({
      data: updateData as any,
    });
    if (updt?.status === 200) {
      try {
        setLoadingUpdate(true);
        const loadData = await adminAppInformation_funGetBidangBisnis();
        setData(loadData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingUpdate(false);
        ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
      }
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updt?.message as any);
    }
  }

  // Activation
  const [openModal, setOpenModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({
    id: "",
    active: null,
  });

  async function onUpdateActivation({
    id,
    active,
  }: {
    id: string;
    active: boolean;
  }) {
    const updt = await adminAppInformation_funUpdateBidangBisnis({
      data: { id: id, active: active },
    });

    if (updt?.status === 200) {
      try {
        setLoadingUpdate(true);
        const loadData = await adminAppInformation_funGetBidangBisnis();
        setData(loadData);
      } catch (error) {
        console.log(error);
      } finally {
        setOpenModal(false);
        setLoadingUpdate(false);
        ComponentAdminGlobal_NotifikasiBerhasil(updt?.message);
      }
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updt?.message as any);
    }
  }

  //   Row Table
  const rowTable = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>
          <Text c={AdminColor.white}>{e?.name}</Text>
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
        <Stack align="center" justify="center">
          <ActionIcon
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
          </ActionIcon>
        </Stack>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_TitlePage
          name="Kategori Bidang Bisnis"
          component={
            <Button
              radius={"xl"}
              leftIcon={<IconCirclePlus />}
              onClick={() => {
                setIsCreate(true);
                setIsUpdate(false);
              }}
            >
              Tambah
            </Button>
          }
        />

        <Grid>
          <Grid.Col span={9}>
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
                        <Center c={AdminColor.white}>Kategori</Center>
                      </th>
                      <th>
                        <Center c={AdminColor.white}>Status</Center>
                      </th>
                      <th>
                        <Center c={AdminColor.white}>Aksi</Center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{rowTable}</tbody>
                </Table>
              </ScrollArea>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            {/* Form Create */}
            {isCreate ? (
              <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg">
                <Stack>
                  <Center>
                    <Title c={AdminColor.white} order={5}>Tambah Bidang Bisnis</Title>
                  </Center>

                  <TextInput
                    placeholder="Masukan nama bidang bisnis"
                    value={newData}
                    onChange={(val) => {
                      setNewData(val.currentTarget.value);
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
                      disabled={newData == ""}
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
                    <Title c={AdminColor.white} order={5}>Update Bidang Bisnis</Title>
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
                      }}
                    >
                      Batal
                    </Button>
                    <Button
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
          </Grid.Col>
        </Grid>
      </Stack>

      {/* Activasi bank */}
      <Modal
        centered
        withCloseButton={false}
        opened={openModal}
        onClose={() => setOpenModal(false)}
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
            Bidang Bisnis ini ?
          </Title>
          <Group>
            <Button radius={"xl"} onClick={() => setOpenModal(false)}>
              Batal
            </Button>
            <Button
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
      </Modal>
    </>
  );
}
