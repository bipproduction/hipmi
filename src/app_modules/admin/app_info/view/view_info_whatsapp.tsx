" use client";

import {
  ActionIcon,
  Button,
  Collapse,
  Group,
  Paper,
  Stack,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconPhone } from "@tabler/icons-react";
import { useState } from "react";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import adminAppInformation_getNomorAdmin from "../fun/master/get_nomor_admin";
import adminAppInformation_funUpdateNomorAdmin from "../fun/update/fun_update_nomor";
import { useDisclosure } from "@mantine/hooks";
import { AccentColor, AdminColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminAppInformation_ViewInformasiWhatApps({
  nomorAdmin,
}: {
  nomorAdmin: any;
}) {
  const [dataNomor, setDataNomor] = useState(nomorAdmin);
  const [updateNomor, setUpdateNomor] = useState("");
  const [opened, { toggle }] = useDisclosure(false);

  async function onUpdate() {
    const newNumber = (dataNomor.nomor = updateNomor);
    setDataNomor({
      ...dataNomor,
      nomor: newNumber,
    });

    const updt = await adminAppInformation_funUpdateNomorAdmin({
      data: dataNomor,
    });
    if (updt.status === 200) {
      const loadDdata = await adminAppInformation_getNomorAdmin();
      setDataNomor(loadDdata);
      toggle();
      ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(updt.message);
    }
  }

  return (
    <>
      <Stack>
        <Stack spacing={"xs"}>
          <Group
            position="apart"
            bg={AdminColor.softBlue}
            p={"xs"}
            style={{ borderRadius: "6px" }}
          >
            <Title c={AdminColor.white} order={4}>Informasi WhatsApp</Title>
          </Group>
        </Stack>

        <Paper w={"50%"} bg={AdminColor.softBlue} p={"md"}>
          <Stack>
            <Paper c={AdminColor.white} bg={AccentColor.darkblue} p={"xl"}>
              <Group position="apart">
                <Title order={2}>{`+${dataNomor.nomor}`}</Title>
                <Tooltip label={"Edit"}>
                  <ActionIcon
                    style={{ transition: "0.2s" }}
                    variant="transparent"
                    radius={"xl"}
                    onClick={() => {
                      toggle();
                      setUpdateNomor(dataNomor.nomor);
                    }}
                  >
                    <IconEdit
                      style={{
                        transition: "0.2s",
                      }}
                      color={AdminColor.white}
                    />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Paper>

            <Collapse
              in={opened}
              transitionDuration={300}
              transitionTimingFunction="linear"
            >
              <Stack>
                <TextInput
                  type="number"
                  placeholder="Update nomor admin"
                  icon={<IconPhone />}
                  value={updateNomor}
                  label={<Title order={6}>Nomor Aktif Admin</Title>}
                  onChange={(val) => {
                    setUpdateNomor(val.currentTarget.value);
                  }}
                />
                <Group position="right">
                  <Button
                    style={{ transition: "0.2s" }}
                    radius={"xl"}
                    onClick={() => {
                      toggle();
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    style={{ transition: "0.2s" }}
                    disabled={updateNomor === "" ? true : false}
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
            </Collapse>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
