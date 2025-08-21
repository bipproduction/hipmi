" use client";

import {
  AccentColor,
  AdminColor,
} from "@/app_modules/_global/color/color_pallet";
import { apiGetAdminContact } from "@/app_modules/_global/lib/api_fetch_master";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import {
  ActionIcon,
  Button,
  Collapse,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconEdit, IconPhone } from "@tabler/icons-react";
import { useState } from "react";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import adminAppInformation_funUpdateNomorAdmin from "../fun/update/fun_update_nomor";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";

export default function AdminAppInformation_ViewInformasiWhatApps() {
  const [dataNomor, setDataNomor] = useState<any | null>(null);
  const [updateNomor, setUpdateNomor] = useState("");
  const [opened, { toggle }] = useDisclosure(false);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetAdminContact();

      if (response) {
        setDataNomor(response.data);
      } else {
        setDataNomor("");
      }
    } catch (error) {
      clientLogger.error("Error get admin contact", error);
      setDataNomor("");
    }
  };

  async function onUpdate() {
    try {
      const newNumber = (dataNomor.nomor = updateNomor);
      setDataNomor({
        ...dataNomor,
        nomor: newNumber,
      });

      const updt = await adminAppInformation_funUpdateNomorAdmin({
        data: dataNomor,
      });
      if (updt.status === 200) {
        handleLoadData();
        toggle();
        ComponentAdminGlobal_NotifikasiBerhasil(updt.message);
      } else {
        ComponentAdminGlobal_NotifikasiGagal(updt.message);
      }
    } catch (error) {
      clientLogger.error("Error update nomor admin", error);
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
            <Title c={AdminColor.white} order={4}>
              Informasi WhatsApp
            </Title>
          </Group>
        </Stack>

        {!dataNomor ? (
          <CustomSkeleton height={100} width={300} />
        ) : (
          <Admin_V3_ComponentBreakpoint cols={3} md={2} lg={2}>
            <Paper bg={AdminColor.softBlue} p={"md"}>
              <Stack>
                <Paper c={AdminColor.white} bg={AccentColor.darkblue} p={"xl"}>
                  <Group position="apart" spacing={0}>
                    <Tooltip label={"Edit"}>
                      <ActionIcon
                        style={{ transition: "0.2s" }}
                        variant="transparent"
                        radius={"xl"}
                        onClick={() => {
                          toggle();
                          setUpdateNomor(dataNomor?.nomor);
                        }}
                      >
                        <IconEdit
                          style={{
                            transition: "0.2s",
                          }}
                          color={opened ? "gray" : AdminColor.white}
                        />
                      </ActionIcon>
                    </Tooltip>
                    <Title order={3}>{`+${dataNomor?.nomor}`}</Title>
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
                      label={
                        <Title c="white" order={6}>
                          Nomor Aktif Admin
                        </Title>
                      }
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
          </Admin_V3_ComponentBreakpoint>
        )}
      </Stack>
    </>
  );
}
