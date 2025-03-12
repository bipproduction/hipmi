"use client";

import {
  Stack,
  Group,
  Title,
  Paper,
  ScrollArea,
  Table,
  Center,
  Text,
  Badge,
  Spoiler,
  Pagination,
  Button,
  Modal,
  TextInput,
  Textarea,
  Box,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import { useState } from "react";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import adminColab_getListAllPublish from "../fun/get/get_list_all_publish";
import ComponentAdminColab_DetailData from "../component/detail_data";
import adminColab_getOneByColabId from "../fun/get/get_one_by_colab_id";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import _ from "lodash";
import { IconBan, IconCheck, IconEye } from "@tabler/icons-react";
import adminColab_funReportProjectById from "../fun/edit/fun_report_project_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { useRouter } from "next/navigation";

import { clientLogger } from "@/util/clientLogger";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { apiGetAdminCollaborationPublish } from "../lib/api_fetch_admin_collaboration";
import { RouterAdminColab } from "@/lib/router_admin/router_admin_colab";

export default function AdminColab_TablePublish() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Project Collaboration" />
        <TableMenu />
        {/* <pre>{JSON.stringify(listData.nPage, null, 2)}</pre> */}
      </Stack>
    </>
  );
}
function TableMenu() {
  const router = useRouter();
  const [data, setData] = useState<MODEL_COLLABORATION[] | null>(null);
  const [isNPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [idData, setIdData] = useState("");
  const [isLoading, setLoading] = useState(false);

  useShallowEffect(() => {
    loadInitialData();
  }, [activePage]);

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminCollaborationPublish({
        page: `${activePage}`,
      })
      console.log("Ini Response", response)

      if (response?.success && response?.data?.data) {
        setData(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        console.error("Invalid data format recieved", response);
        setData([])
      }
    } catch (error) {
      clientLogger.error("Invalid data table publish", error);
      setData([]);
    }
  }

  const onPageCLick = (page: number) => {
    setActivePage(page);
  }

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
      )
    }

    return data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center c={AdminColor.white}>
            <Text lineClamp={1}>{e?.Author?.Profile?.name}</Text>
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white}>
            <Box>
              <Center c={AdminColor.white}>
                <Text lineClamp={1}>{e?.title}</Text>
              </Center>
            </Box>
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white}>
            <Text>{e?.ProjectCollaborationMaster_Industri.name}</Text>
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white}>
            <Text>{e?.ProjectCollaboration_Partisipasi.length}</Text>
          </Center>
        </td>
        <td>
          <Center>
            <Button
              loading={isLoading && e?.id == idData ? true : false}
              leftIcon={<IconEye />}
              loaderPosition="center"
              radius={"xl"}
              color="green"
              onClick={() => {
                setLoading(true);
                setIdData(e?.id);
                router.push(RouterAdminColab.detail_publish + `${e?.id}`);
              }}
            >
              Detail
            </Button>
          </Center>
        </td>
      </tr>
    ));
  }

  // async function onReport() {
  //   if (report === "")
  //     return ComponentGlobal_NotifikasiPeringatan("Lengkapi Alasan Report");

  //   await adminColab_funReportProjectById({
  //     colabId: idData,
  //     report: report,
  //   }).then(async (res) => {
  //     if (res.status === 200) {
  //       const newData = await adminColab_getListAllPublish({
  //         page: activePage,
  //       });

  //       setActivePage(activePage);
  //       setData(newData.data as any);
  //       setNPage(newData.nPage);
  //       setOpenReject(false);
  //       ComponentGlobal_NotifikasiBerhasil(res.message);
  //     } else {
  //       ComponentGlobal_NotifikasiPeringatan(res.message);
  //     }
  //   });
  // }

  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
          c={AdminColor.white}
        >
          <Title order={4}>Publish</Title>
        </Group>
        {!data ? (
          <CustomSkeleton height={"80vh"} width={"100%"} />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} >
            <Stack>
              <ScrollArea h={"65vh"}>
                <Table
                  verticalSpacing={"xs"}
                  horizontalSpacing={"md"}
                  p={"md"}

                >
                  <thead>
                    <tr>
                      <th>
                        <Center c={AdminColor.white}>Username</Center>
                      </th>
                      <th>
                        <Center c={AdminColor.white}>Title</Center>
                      </th>
                      <th>
                        <Center c={AdminColor.white}>Industri</Center>
                      </th>
                      <th>
                        <Center c={AdminColor.white}>Jumlah Partisipan</Center>
                      </th>
                      <th>
                        <Center c={AdminColor.white}>Aksi</Center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderTableBody()}</tbody>
                </Table>
              </ScrollArea>
              <Pagination
                position="center"
                total={isNPage}
                value={activePage}
                onChange={(val) => {
                  onPageCLick(val);
                }}
              />
            </Stack>
          </Paper>
        )}
      </Stack>
    </>
  );
}
