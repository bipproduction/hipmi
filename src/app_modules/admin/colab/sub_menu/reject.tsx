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
  Box,
  Pagination,
  Button,
} from "@mantine/core";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { useState } from "react";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import adminColab_getListAllRejected from "../fun/get/get_list_all_reject";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { clientLogger } from "@/util/clientLogger";

import { useShallowEffect } from "@mantine/hooks";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { IconEye } from "@tabler/icons-react";
import { apiGetAdminCollaborationReject } from "../lib/api_fetch_admin_collaboration";

export default function AdminColab_TableRejected() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Project Collaboration" />
        <TableMenu />
      </Stack>
    </>
  );
}
function TableMenu() {
  const [data, setData] = useState<MODEL_COLLABORATION[] | null>(null);
  const [isNPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");

  useShallowEffect(() => {
    loadInitialData()
  }, [activePage])
  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminCollaborationReject({
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
      clientLogger.error("Error get data table reject", error);
      setData([]);
    }
  }

  const onPageClick = (page: number) => {
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
            <Box w={300}>
              <Center c={AdminColor.white}>
                <Spoiler
                  hideLabel={"sembunyikan"}
                  maxHeight={50}
                  showLabel="tampilkan"
                >
                  {e?.report}
                </Spoiler>
              </Center>
            </Box>
          </Center>
        </td>
        <td>
          <Center>
            <Button
              loading={loading && e?.id == idData ? true : false}
              leftIcon={<IconEye />}
              loaderPosition="center"
              radius={"xl"}
              color="green"
              onClick={() => {
                setLoading(true);
                setIdData(e.id);
              }}
            >
              Detail
            </Button>
          </Center>
        </td>
      </tr >
    ));
  }
  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title c={AdminColor.white} order={4}>Reject</Title>
        </Group>
        {!data ? (
          <CustomSkeleton height={"80vh"} width={"100%"} />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue}>
            <Stack>
              <ScrollArea h={"65vh"}>
                <Table
                  verticalSpacing={"lg"}
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
                        <Center c={AdminColor.white}>Report</Center>
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
                  onPageClick(val);
                }}
              />
            </Stack>
          </Paper>
        )}
      </Stack>
    </>
  );
}