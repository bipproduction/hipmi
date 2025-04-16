"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import {
  Box,
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
import { useState } from "react";
import Admin_DetailButton from "../../_admin_global/_component/button/detail_button";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { apiGetAdminCollaborationReject } from "../lib/api_fetch_admin_collaboration";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";

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

  useShallowEffect(() => {
    loadInitialData();
  }, [activePage]);
  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminCollaborationReject({
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
      clientLogger.error("Error get data table reject", error);
      setData([]);
    }
  };

  const onPageClick = (page: number) => {
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
      <tr key={i} style={{ color: AdminColor.white }}>
        <td>
          <Box w={150}>
            <Text lineClamp={1}>{e?.Author.username}</Text>
          </Box>
        </td>

        <td>
          <Box w={150} c={AdminColor.white}>
            <Text lineClamp={1}>{e?.title}</Text>
          </Box>
        </td>

        <td>
          <Box w={150} c={AdminColor.white}>
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
            <Admin_DetailButton
              path={`/dev/admin/colab/detail/reject/${e.id}`}
            />
          </Center>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <Stack spacing={"xs"}>
        <Group
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title c={AdminColor.white} order={4}>
            Reject
          </Title>
        </Group>
        {!data ? (
          <CustomSkeleton height={"80vh"} width={"100%"} />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue}>
            <Stack>
              <ScrollArea h={"65vh"}>
                <Table verticalSpacing={"lg"} horizontalSpacing={"md"} p={"md"}>
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
                value={activePage}
                total={isNPage}
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
