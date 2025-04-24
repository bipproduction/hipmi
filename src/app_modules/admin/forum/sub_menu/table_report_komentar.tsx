"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_FORUM_REPORT_KOMENTAR } from "@/app_modules/forum/model/interface";
import { RouterAdminForum } from "@/lib/router_admin/router_admin_forum";
import { clientLogger } from "@/util/clientLogger";
import {
  Box,
  Button,
  Center,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconFlag3, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";
import { apiGetAdminForumReportKomentar } from "../lib/api_fetch_admin_forum";

export default function AdminForum_TableReportKomentar() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum" />
        <TableView />
        {/* <pre>{JSON.stringify(listPublish, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function TableView() {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_REPORT_KOMENTAR[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetAdminForumReportKomentar({
          page: `${activePage}`,
          search: isSearch,
        });

        if (response?.success && response?.data.data) {
          setData(response.data.data);
          setNPage(response.data.nCount || 1);
        } else {
          console.error("Invalid data format recieved", response);
          setData([]);
        }
      } catch (error) {
        clientLogger.error("Invalid data format recieved", error);
        setData([]);
      }
    };
    loadInitialData();
  }, [activePage, isSearch]);

  const onSearch = (searchTerm: string) => {
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
          <Box w={100}>
            <Text c={AdminColor.white} lineClamp={1}>
              {e?.User?.username}
            </Text>
          </Box>
        </td>
        <td>
          <Box w={150}>
            {!e?.ForumMaster_KategoriReport ? (
              <Text c={AdminColor.white}>Lainnya</Text>
            ) : (
              <Text c={AdminColor.white} lineClamp={1}>
                {e?.ForumMaster_KategoriReport?.title}
              </Text>
            )}
          </Box>
        </td>

        <td>
          <Box w={150}>
            <Spoiler
              style={{ textAlign: "justify", textJustify: "auto" }}
              c={AdminColor.white}
              // w={400}
              maxHeight={50}
              hideLabel="sembunyikan"
              showLabel="tampilkan"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: e?.Forum_Komentar.komentar,
                }}
              />
            </Spoiler>
          </Box>
        </td>

        <td>
          <Box w={150}>
            <Text c={AdminColor.white}>
              {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
                new Date(e?.createdAt)
              )}
            </Text>
          </Box>
        </td>

        <td>
          <Stack align="center" spacing={"xs"}>
            <ButtonLihatReportLainnya komentarId={e?.Forum_Komentar.id} />
          </Stack>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Report Komentar"
          color={AdminColor.softBlue}
          component={
            <TextInput
              icon={<IconSearch size={20} />}
              radius={"xl"}
              placeholder="Cari Komentar"
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
            <ScrollArea w={"100%"} h={"90%"} offsetScrollbars>
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
                      <Text c={AdminColor.white}>Pelaporr</Text>
                    </th>

                    <th>
                      <Text c={AdminColor.white}>Jenis Laporan</Text>
                    </th>

                    <th>
                      <Text c={AdminColor.white}>Komentar</Text>
                    </th>

                    <th>
                      <Text c={AdminColor.white}>Tanggal Report</Text>
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

function ButtonLihatReportLainnya({ komentarId }: { komentarId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        fz={"xs"}
        loading={loading ? true : false}
        loaderPosition="center"
        radius={"xl"}
        w={170}
        leftIcon={<IconFlag3 size={15} />}
        onClick={() => {
          setLoading(true);
          router.push(RouterAdminForum.report_komentar + komentarId);
        }}
      >
        <Text>Lihat Report Lain</Text>
      </Button>
    </>
  );
}
