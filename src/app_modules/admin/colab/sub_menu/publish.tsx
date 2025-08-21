"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import {
  Box,
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";

import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { RouterAdminColab } from "@/lib/router_admin/router_admin_colab";
import { clientLogger } from "@/util/clientLogger";
import { apiGetAdminCollaborationPublish } from "../lib/api_fetch_admin_collaboration";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";

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
      });

      if (response?.success && response?.data?.data) {
        setData(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        console.error("Invalid data format recieved", response);
        setData([]);
      }
    } catch (error) {
      clientLogger.error("Invalid data table publish", error);
      setData([]);
    }
  };

  const onPageCLick = (page: number) => {
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

    return data.map((e, i) => (
      <tr
        key={i}
        style={{
          color: AdminColor.white,
        }}
      >
        <td>
          <Box w={150}>
            <Text lineClamp={1}>
              {e?.Author?.username}
            </Text>
          </Box>
        </td>
        <td>
          <Box w={150}>
            <Text lineClamp={1}>{e?.title}</Text>
          </Box>
        </td>
        <td>
          <Box w={150}>
            <Text>{e?.ProjectCollaborationMaster_Industri.name}</Text>
          </Box>
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
  };

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
          <Paper p={"md"} bg={AdminColor.softBlue}>
            <Stack>
              <ScrollArea h={"65vh"}>
                <Table verticalSpacing={"xs"} horizontalSpacing={"md"} p={"md"}>
                  <thead>
                    <tr>
                      <th>
                        <Text c={AdminColor.white}>Username</Text>
                      </th>
                      <th>
                        <Text c={AdminColor.white}>Title</Text>
                      </th>
                      <th>
                        <Text c={AdminColor.white}>Industri</Text>
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
              <Admin_V3_ComponentPaginationBreakpoint
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
