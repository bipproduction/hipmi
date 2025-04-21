"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { apiGetAdminEventTipeAcara } from "@/app_modules/admin/event/_lib/api_fecth_admin_event";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
import { clientLogger } from "@/util/clientLogger";
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconEdit, IconEditCircle, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { Admin_V3_ComponentSkeletonBreakpoint } from "../../_components_v3/comp_skeleton_breakpoint";
import { AdminEvent_funCreateTipeAcara } from "../fun/create/fun_create_tipe_acara";
import { AdminEvent_funEditActivationTipeAcaraById } from "../fun/edit/fun_edit_activation_tipe_acara";
import { AdminEvent_funEditTipeAcara } from "../fun/edit/fun_edit_tipe_acara";
import { AdminEvent_getListTipeAcara } from "../fun/get/get_list_tipe_acara";

export default function AdminEvent_DetailTipeAcara() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />
        <DetailTipeAcara />
      </Stack>
    </>
  );
}

function DetailTipeAcara() {
  const [tipe, setTipe] = useState<MODEL_DEFAULT_MASTER_OLD[] | null>(null);
  const [name, setName] = useState("");
  const [openEditor, setOpenEditor] = useState(false);
  const [edit, setEdit] = useState<MODEL_DEFAULT_MASTER_OLD | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [hapusTipe, setHapusTipe] = useState({
    id: "",
    name: "",
  });
  const [openCreate, setOpenCreate] = useState(true);

  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const respone = await apiGetAdminEventTipeAcara();
      if (respone) {
        setTipe(respone.data);
      }
    } catch (error) {
      clientLogger.error("Error get tipe acara", error);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={6}>
            Anda yakin akan menghapus{" "}
            <Text span c={"red"} inherit>
              {hapusTipe.name}
            </Text>{" "}
            ?
          </Title>
          <Group position="center">
            <Button onClick={() => close()}>Batal</Button>
            <Button
              onClick={() => onDelete(hapusTipe as any, close, setTipe)}
              color="red"
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Modal>

      <ComponentAdminGlobal_TitlePage
        name="Tipe Acara"
        color={AdminColor.softBlue}
      />

      {/* <Group
        position="apart"
        bg={AdminColor.softBlue}
        p={"xs"}
        style={{ borderRadius: "6px" }}
      >
        <Title c={AdminColor.white} order={4}>Tipe Acara</Title>
        <Button
          leftIcon={<IconCirclePlus />}
          radius={"xl"}
          color="green"
          onClick={() => {
            setOpenCreate(true);
            setOpenEditor(false);
          }}
        >
          Tambah
        </Button>
      </Group> */}

      {!tipe ? (
        <Admin_V3_ComponentSkeletonBreakpoint />
      ) : (
        <Admin_V3_ComponentBreakpoint md={2} lg={2}>
          <div>
            {openCreate && (
              <Paper p={"sm"} bg={AdminColor.softBlue} shadow="lg">
                <Stack>
                  <TextInput
                    styles={{ label: { color: AdminColor.white } }}
                    value={name ? name : ""}
                    label="Masukan Tipe"
                    placeholder="Contoh: Seminar, Workshop, dll."
                    onChange={(val) => {
                      setName(val.currentTarget.value);
                    }}
                  />
                  <Group position="right">
                    {/* <Button radius={"xl"} onClick={() => setOpenCreate(false)}>
                      Batal
                    </Button> */}
                    <Button
                      disabled={!name}
                      style={{
                        transition: "all 0.5s ease",
                      }}
                      color="green"
                      radius={"xl"}
                      onClick={() => onSave(name, setName, setTipe)}
                    >
                      Simpan
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            )}

            {openEditor && (
              <Paper p={"sm"} bg={AdminColor.softBlue}>
                <Stack>
                  <TextInput
                    styles={{ label: { color: AdminColor.white } }}
                    value={edit?.name ? edit?.name : ""}
                    label="Edit Tipe"
                    placeholder="Contoh: Ramah Tamah, dll"
                    onChange={(val) => {
                      setEdit({
                        ...(edit as any),
                        name: val.target.value,
                      });
                    }}
                  />
                  <Group position="right">
                    <Group position="apart">
                      <Button
                        radius={"xl"}
                        onClick={() => {
                          setOpenEditor(false), setOpenCreate(true);
                        }}
                      >
                        Batal
                      </Button>
                      <Button
                        loaderPosition="center"

                        disabled={!edit?.name}
                        style={{
                          transition: "all 0.5s ease",
                        }}
                        radius={"xl"}
                        color="green"
                        onClick={() =>
                          onUpdate(
                            edit?.id,
                            edit?.name,
                            setTipe,
                            setOpenEditor,
                            setOpenCreate
                          )
                        }
                      >
                        Update
                      </Button>
                    </Group>
                  </Group>
                </Stack>
              </Paper>
            )}
          </div>

          <div>
            <Paper p={"md"} bg={AdminColor.softBlue}>
              <Stack>
                <Title c={AdminColor.white} order={3}>
                  Tipe Acara Yang Tersedia{" "}
                </Title>
                <Stack px={"md"}>
                  <Stack>
                    {tipe.map((e, i) => (
                      <div key={i}>
                        <Admin_V3_ComponentBreakpoint allCols={2}>
                          <Text c={AdminColor.white} lineClamp={1}>
                            {e.name}
                          </Text>
                          <Group position="right">
                            <ActionIcon
                              variant="transparent"
                              onClick={() => {
                                setOpenEditor(true);
                                setOpenCreate(false);
                                setEdit(e);
                              }}
                            >
                              <IconEdit color={AdminColor.green} />
                            </ActionIcon>{" "}
                            {/* <ActionIcon
                         variant="transparent"
                         onClick={() => {
                           open();
                           setHapusTipe({
                             ...hapusTipe,
                             id: e.id,
                             name: e.name,
                           });
                         }}
                       >
                         <IconTrash color="red" />
                       </ActionIcon> */}
                          </Group>
                        </Admin_V3_ComponentBreakpoint>
                        <Divider />
                      </div>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </div>
        </Admin_V3_ComponentBreakpoint>
      )}
    </>
  );
}

async function onSave(name: string, setName: any, setTipe: any) {
  if (name === "")
    return ComponentGlobal_NotifikasiPeringatan("Isi Tipe Acara");

  await AdminEvent_funCreateTipeAcara(name).then(async (res) => {
    if (res.status === 201) {
      await AdminEvent_getListTipeAcara().then((val) => {
        setTipe(val);
        setName("");
        ComponentGlobal_NotifikasiBerhasil("Berhasil Menyimpan Data");
      });
    } else {
      ComponentGlobal_NotifikasiGagal("Gagal Menyimpan Data");
    }
  });
}

async function onUpdate(
  id: any,
  edit: any,
  setTipe: any,
  setOpenEditor: any,
  setOpenCreate: any
) {
  await AdminEvent_funEditTipeAcara(id, edit).then(async (res) => {
    if (res.status === 200) {
      await AdminEvent_getListTipeAcara().then((val) => {
        setTipe(val);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        setOpenEditor(false);
        setOpenCreate(true);
      });
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  });
}

async function onDelete(
  data: MODEL_DEFAULT_MASTER_OLD,
  close: any,
  setTipe: any
) {
  await AdminEvent_funEditActivationTipeAcaraById(data.id as any).then(
    async (res) => {
      if (res.status === 200) {
        const data = await AdminEvent_getListTipeAcara();
        setTipe(data);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        close();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    }
  );
}
