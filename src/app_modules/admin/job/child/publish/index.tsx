"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import Admin_DetailButton from "@/app_modules/admin/_admin_global/_component/button/detail_button";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import { RouterAdminGlobal } from "@/lib";
import { RouterAdminJob } from "@/lib/router_admin/router_admin_job";
import { clientLogger } from "@/util/clientLogger";
import {
  Badge,
  Box,
  Button,
  Center,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconPhotoCheck, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetAdminJobByStatus } from "../../lib/api_fetch_admin_job";
import { Admin_V3_ComponentPaginationBreakpoint } from "@/app_modules/admin/_components_v3/comp_pagination_breakpoint";

export default function AdminJob_TablePublish() {
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
  const [isLoadingShowImage, setLoadingShowImage] = useState(false);
  const [dataId, setDataId] = useState("");

  useShallowEffect(() => {
    loadInitialData();
  }, [activePage, isSearch]);

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminJobByStatus({
        name: "Publish",
        page: `${activePage}`,
        search: isSearch,
      });

      if (response?.success && response?.data.data) {
        setData(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        console.error("Invalid data format recieved", response);
        setData([]);
      }
    } catch (error) {
      clientLogger.error("Invalid data format recieved:", error);
      setData([]);
    }
  };
  const onSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
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
    return data?.map((e, i) => (
      <tr key={i}>
        <td>
          <Center>
            <Text c={AdminColor.white}>{e?.Author?.username}</Text>
          </Center>
        </td>
        <td>
          <Center>
            {e?.isArsip ? (
              <Badge variant="light">Arsip</Badge>
            ) : (
              <Badge color="green">Publish</Badge>
            )}
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
            <Admin_DetailButton
              path={String(RouterAdminJob.detail({ id: e.id }))}
            />
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Publish"
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
          <CustomSkeleton height={"80vh"} width="100%" />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
            <ScrollArea h={"90%"}>
              <Table verticalSpacing={"md"} horizontalSpacing={"xl"}>
                <thead>
                  <tr>
                    <th>
                      <Center c={AdminColor.white}>Author</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Status</Center>
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
                onPageClick(val);
              }}
            />
          </Paper>
        )}
      </Stack>
    </>
  );
}
