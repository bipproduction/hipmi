"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_FORUM_REPORT_POSTING } from "@/app_modules/forum/model/interface";
import { RouterAdminForum } from "@/lib/router_admin/router_admin_forum";
import { clientLogger } from "@/util/clientLogger";
import {
  Badge,
  Button,
  Center,
  Paper,
  ScrollArea,
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
import { AdminForum_CompTableSetHtmlStiker } from "../component/comp_table_set_html_stiker";
import { apiGetAdminForumReportPosting } from "../lib/api_fetch_admin_forum";

export default function AdminForum_TableReportPosting() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum" />
        <TableView />
      </Stack>
    </>
  );
}

function TableView() {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_REPORT_POSTING[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  useShallowEffect(() => {
    // Add custom style for stickers inside Quill editor
    const style = document.createElement("style");
    style.textContent = `
        .chat-content img {
        max-width: 70px !important;
        max-height: 70px !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      // Clean up when component unmounts
      document.head.removeChild(style);
    };
  }, []);

  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetAdminForumReportPosting({
          page: `${activePage}`,
          search: isSearch,
        });

        if (response?.success && response?.data.data) {
          setData(response.data.data);
          setNPage(response.data.nCount || 1);
        } else {
          console.error("Invalid data format recieved", response), setData([]);
        }
      } catch (error) {
        clientLogger.error("Invalid data format recieved", error);
        setData([]);
      }
    };
    loadInitialData();
  }, [activePage, isSearch]);
  async function onSearch(searchTerm: string) {
    setSearch(searchTerm);
    setActivePage(1);
  }

  const onPageClick = (page: number) => {
    setActivePage(page);
  };

  const renderTableBody = () => {
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
    return data?.map((e, i) => (
      <tr key={i} style={{ color: AdminColor.white }}>
        <td>
          <Text w={100}>
            <Text lineClamp={1}>{e?.User.username}</Text>
          </Text>
        </td>
        <td>
          <Text w={150}>
            {e?.forumMaster_KategoriReportId === null ? (
              <Text>Lainnya</Text>
            ) : (
              <Text lineClamp={1}>{e?.ForumMaster_KategoriReport.title}</Text>
            )}
          </Text>
        </td>

        <td>
          <AdminForum_CompTableSetHtmlStiker
            data={e.Forum_Posting.diskusi}
            classname="chat-content"
          />
        </td>

        <td>
          <Center>
            <Badge
              color={
                (e?.Forum_Posting?.ForumMaster_StatusPosting?.id as any) === 1
                  ? "green"
                  : "red"
              }
            >
              {e?.Forum_Posting?.ForumMaster_StatusPosting?.status}
            </Badge>
          </Center>
        </td>

        <td>
          <Stack align="center" spacing={"xs"}>
            <ButtonLihatReportLainnya postingId={e?.forum_PostingId} />
          </Stack>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Report Posting"
          color={AdminColor.softBlue}
          component={
            <TextInput
              icon={<IconSearch size={20} />}
              radius={"xl"}
              placeholder="Cari postingan"
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
                      <Text c={AdminColor.white}>Pelapor</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Jenis Laporan</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Postingan</Text>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Status Posting</Center>
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

function ButtonLihatReportLainnya({ postingId }: { postingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        loading={loading}
        loaderPosition="center"
        radius={"xl"}
        w={170}
        leftIcon={<IconFlag3 size={15} />}
        onClick={() => {
          setLoading(true);
          router.push(RouterAdminForum.report_posting + postingId);
        }}
      >
        <Text> Report Lain</Text>
      </Button>
    </>
  );
}
