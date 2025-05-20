"use client";

import {
  AdminColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_DEFAULT_MASTER_OLD } from "@/app_modules/model_global/interface";
import {
  Box,
  Button,
  Center,
  Paper,
  ScrollArea,
  Stack,
  Switch,
  Table,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
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
import { apiGetMasterAdminBidangBisnis } from "../lib/api_fetch_master";
import { useRouter } from "next/navigation";
import { RouterAdminAppInformation } from "@/lib/router_admin/router_app_information";

export function AdminAppInformation_V3_ViewKategoriBidangBisnis() {
  const router = useRouter();
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
        <ComponentAdminGlobal_TitlePage name="Kategori Bidang Bisnis" />

        <Button
          w={120}
          radius={"xl"}
          leftIcon={<IconCirclePlus />}
          onClick={() => {
            router.push(RouterAdminAppInformation.createBidangBisnis);
          }}
        >
          Tambah
        </Button>

        <div>
          {!data ? (
            <CustomSkeleton height={"80vh"} width="100%" />
          ) : (
            <Paper p={"md"} bg={AdminColor.softBlue} h={"65dvh"}>
              <ScrollArea w={"100%"} h={"100%"} scrollbarSize={"md"}>
                <Table
                  verticalSpacing={"md"}
                  horizontalSpacing={"md"}
                  p={"md"}
                  w={"100%"}
                >
                  <thead>
                    <tr>
                      <th>
                        <Center c={AdminColor.white}>Aksi</Center>
                      </th>
                      <th>
                        <Center c={AdminColor.white}>Status</Center>
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
        </div>
      </Stack>
    </>
  );
}
