"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import Admin_DetailButton from "@/app_modules/admin/_admin_global/_component/button/detail_button";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import { RouterAdminGlobal } from "@/lib";
import { IRealtimeData } from "@/lib/global_state";
import { RouterAdminJob } from "@/lib/router_admin/router_admin_job";
import { clientLogger } from "@/util/clientLogger";
import {
  Box,
  Button,
  Center,
  Group,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { IconPhotoCheck, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { AdminJob_funEditCatatanById } from "../../fun/edit/fun_edit_catatan_by_id";
import adminJob_getListReject from "../../fun/get/get_list_reject";
import { apiGetAdminJobByStatus } from "../../lib/api_fetch_admin_job";
import { Admin_V3_ComponentPaginationBreakpoint } from "@/app_modules/admin/_components_v3/comp_pagination_breakpoint";

export default function AdminJob_TableReject() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy" />
        <TableStatus />
      </Stack>
    </>
  );
}

function TableStatus() {
  const router = useRouter();
  const [data, setData] = useState<MODEL_JOB[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  const [reject, setReject] = useState(false);
  const [jobId, setJobId] = useState("");

  const [catatan, setCatatan] = useState("");
  const [isLoadingShowImage, setLoadingShowImage] = useState(false);
  const [dataId, setDataId] = useState("");

  useShallowEffect(() => {
    loadInitialData();
  }, [activePage, isSearch]);
  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminJobByStatus({
        name: "Reject",
        page: `${activePage}`,
        search: isSearch,
      });

      if (response?.success && response?.data.data) {
        setData(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        console.error("Invalid data format recieved:", response);
        setData([]);
      }
    } catch (error) {
      clientLogger.error("Invalid data format recieced:", error);
      setData([]);
    }
  };

  const onSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  };

  const onNextPage = (page: number) => {
    setActivePage(page);
  };

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

    return data?.map((e, i) => (
      <tr key={i}>
        <td>
          <Center>
            <Text c={AdminColor.white}>{e?.Author?.username}</Text>
          </Center>
        </td>

        <td>
          <Center>
            <Box w={150}>
              <Text c={"white"} truncate>
                {e.title}
              </Text>
            </Box>
          </Center>
        </td>
        <td>
          <Center>
            {e.imageId ? (
              <Button
                loaderPosition="center"
                loading={isLoadingShowImage && e.id === dataId}
                color="green"
                radius={"xl"}
                leftIcon={<IconPhotoCheck />}
                onClick={() => {
                  setLoadingShowImage(true);
                  setDataId(e.id);
                  router.push(
                    RouterAdminGlobal.preview_image({ id: e.imageId })
                  );
                }}
              >
                Lihat
              </Button>
            ) : (
              <Center>
                <Text c={AdminColor.white} fw={"bold"} fz={"xs"} fs={"italic"}>
                  Tidak ada poster
                </Text>
              </Center>
            )}
          </Center>
        </td>
        <td>
          <Center>
            <Admin_DetailButton path={RouterAdminJob.detail({ id: e.id })} />
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Modal
        opened={reject}
        onClose={() => {
          setReject(false);
        }}
        withCloseButton={false}
        size={"sm"}
        centered
      >
        <Stack>
          <Stack spacing={5}>
            <Textarea
              minRows={2}
              maxRows={5}
              maxLength={300}
              autosize
              label={<Text fw={"bold"}>Alasan Penolakan</Text>}
              placeholder="Masukkan alasan penolakan lowongan ini"
              value={catatan}
              onChange={(val) => setCatatan(val.currentTarget.value)}
            />
            <ComponentGlobal_InputCountDown
              lengthInput={catatan.length}
              maxInput={300}
            />
          </Stack>
          <Group position="right">
            <Button radius={"xl"} onClick={() => setReject(false)}>
              Batal
            </Button>
            <Button
              style={{
                transition: "0.5s",
              }}
              disabled={catatan === "" ? true : false}
              radius={"xl"}
              onClick={() => {
                onReject({
                  catatan: catatan,
                  jobId: jobId,
                  onSetData(val) {
                    setData(val.data);
                    setNPage(val.nPage);
                  },
                });
                setReject(false);
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Reject"
          color={AdminColor.softBlue}
          component={
            <TextInput
              icon={<IconSearch size={20} />}
              radius={"xl"}
              placeholder="Masukan judul"
              onChange={(val) => {
                onSearch(val.currentTarget.value);
              }}
            />
          }
        />

        {!data ? (
          <CustomSkeleton height={"80vh"} width={"100%"} />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={"100%"}
                h={"100%"}
              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AdminColor.white}>Author</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Judul</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Poster</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </ScrollArea>
            <Admin_V3_ComponentPaginationBreakpoint
              value={activePage}
              total={nPage}
              onChange={(val) => {
                onNextPage(val);
              }}
            />
          </Paper>
        )}
      </Stack>
    </>
  );
}



async function onReject({
  jobId,
  catatan,
  onSetData,
}: {
  jobId: string;
  catatan: string;
  onSetData: (val: any) => void;
}) {
  const reject = await AdminJob_funEditCatatanById(jobId, catatan);
  if (reject.status === 200) {
    const loadData = await adminJob_getListReject({ page: 1 });
    onSetData(loadData);

    const dataNotifikasi: IRealtimeData = {
      appId: reject.data?.id as any,
      status: reject.data?.MasterStatus?.name as any,
      userId: reject.data?.authorId as any,
      pesan: reject.data?.title as any,
      kategoriApp: "JOB",
      title: "Report tambahan",
    };

    const notif = await adminNotifikasi_funCreateToUser({
      data: dataNotifikasi as any,
    });

    if (notif.status === 201) {
      WibuRealtime.setData({
        type: "notification",
        pushNotificationTo: "USER",
        dataMessage: dataNotifikasi,
      });
    }

    ComponentGlobal_NotifikasiBerhasil(reject.message);
  } else {
    ComponentGlobal_NotifikasiGagal(reject.message);
  }
}
