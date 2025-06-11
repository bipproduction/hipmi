"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import {
  MODEL_FORUM_KOMENTAR,
  MODEL_FORUM_POSTING,
} from "@/app_modules/forum/model/interface";
import { RouterAdminForum } from "@/lib/router_admin/router_admin_forum";
import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconFlag3, IconSearch, IconTrash } from "@tabler/icons-react";
import moment from "moment";
import "moment/locale/id";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_ComponentModal } from "../../_admin_global/_component/comp_admin_modal";
import Admin_ComponentBackButton from "../../_admin_global/back_button";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";
import ComponentAdminForum_ViewOneDetailPosting from "../component/detail_one_posting";
import { adminForum_funDeleteKomentarById } from "../fun/delete/fun_delete_komentar_by_id";
import {
  apiAdminGetKomentarForumById,
  apiAdminGetPostingForumById,
} from "../lib/api_fetch_admin_forum";
import { AdminForum_CompTableSetHtmlStiker } from "../component/comp_table_set_html_stiker";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";

export default function AdminForum_DetailPosting() {
  const { id } = useParams();
  const [data, setData] = useState<MODEL_FORUM_POSTING | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiAdminGetPostingForumById({ id: id as string });
      if (response && response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Invalid data format received:", error);
      setData(null);
    }
  }

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Detail" />
        <Admin_ComponentBackButton />
        {!data ? (
          <CustomSkeleton height={"80vh"} width={"100%"} />
        ) : (
          <>
            <Admin_V3_ComponentBreakpoint>
              <ComponentAdminForum_ViewOneDetailPosting dataPosting={data} />
            </Admin_V3_ComponentBreakpoint>
            <TableKomentar
              postingId={id as string}
              totalComments={data?.Forum_Komentar as any}
            />
          </>
        )}
      </Stack>
    </>
  );
}

function TableKomentar({
  postingId,
  totalComments,
}: {
  postingId: string;
  totalComments: number;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_KOMENTAR[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [isLoadingReport, setLoadingReport] = useState(false);
  const [idData, setIdData] = useState("");
  const [isDelete, setDelete] = useState(false);

  useShallowEffect(() => {
    handleLoadData();
  }, [isSearch, activePage, isDelete]);

  async function handleLoadData() {
    try {
      const response = await apiAdminGetKomentarForumById({
        id: postingId,
        page: `${activePage}`,
        search: isSearch,
      });

      if (response && response.success) {
        setData(response.data.data);
        setDelete(false);
        setNPage(response.data.nPage || 1);
      }
    } catch (error) {
      console.error("Invalid data format received:", error);
      setData([]);
    }
  }

  async function onSearch(s: string) {
    setSearch(s);
    setActivePage(1);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
  }

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

  const rowTable = () => {
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
          <Box c={AdminColor.white} w={100}>
            <Text lineClamp={1}>{e?.Author?.username}</Text>
          </Box>
        </td>
        <td>
          <AdminForum_CompTableSetHtmlStiker
            data={e.komentar}
            classname="chat-content"
          />
        </td>
        <td>
          <Box c={AdminColor.white} w={100}>
            <Text>{moment(e?.createdAt).format("DD-MM-YYYY")}</Text>
          </Box>
        </td>
        <td>
          <Center>
            <Text
              c={
                e?.Forum_ReportKomentar?.length >= 3 ? "red" : AdminColor.white
              }
              fw={"bold"}
              fz={"lg"}
            >
              {e?.Forum_ReportKomentar.length}
            </Text>
          </Center>
        </td>
        <td>
          <Stack align="center" spacing={"xs"}>
            <Button
              disabled={e?.Forum_ReportKomentar.length <= 0 ? true : false}
              loaderPosition="center"
              loading={isLoadingReport && e?.id === idData ? true : false}
              radius={"xl"}
              w={170}
              fz={"xs"}
              leftIcon={<IconFlag3 size={15} />}
              onClick={() => {
                setIdData(e?.id);
                setLoadingReport(true);
                router.push(RouterAdminForum.report_komentar + e?.id);
              }}
            >
              Lihat Report
            </Button>
            <ButtonDeleteKomentar
              komentarId={e?.id}
              onSuccessDelete={(val) => {
                setDelete(val);
              }}
            />
          </Stack>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name={
            <Group spacing={5}>
              <Title order={4} c={"white"}>
                Komentar:
              </Title>
              <Title order={4} c={"white"}>
                {totalComments}
              </Title>
            </Group>
          }
          component={
            <TextInput
              icon={<IconSearch size={20} />}
              radius={"xl"}
              placeholder="Cari komentar"
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
                      <Text c={AdminColor.white}>Username</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Komentar</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Tgl Komentar</Text>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Total Report</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{rowTable()}</tbody>
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

function ButtonDeleteKomentar({
  komentarId,
  onSuccessDelete,
}: {
  komentarId: string;
  onSuccessDelete: (val: any) => void;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [loadindDel, setLoadingDel] = useState(false);
  const [loadingDel2, setLoadingDel2] = useState(false);

  async function onDelete() {
    await adminForum_funDeleteKomentarById(komentarId).then((res) => {
      if (res.status === 200) {
        setLoadingDel(false);
        setLoadingDel2(false);
        onSuccessDelete(true);
        ComponentGlobal_NotifikasiBerhasil(res.message);

        close();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Admin_ComponentModal
        opened={opened}
        onClose={close}
        withCloseButton={false}
      >
        <Stack>
          <Title order={5} c={AdminColor.white}>
            Anda yakin menghapus komentar ini ?
          </Title>
          <Group position="center">
            <Button
              radius={"xl"}
              onClick={() => {
                close();
                setLoadingDel(false);
              }}
            >
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={loadingDel2}
              radius={"xl"}
              color="red"
              onClick={() => {
                onDelete();
                setLoadingDel2(true);
              }}
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentModal>

      <Button
        loading={loadindDel}
        loaderPosition="center"
        radius={"xl"}
        w={170}
        color="red"
        fz={"xs"}
        leftIcon={<IconTrash size={15} />}
        onClick={() => {
          open();
          setLoadingDel(true);
        }}
      >
        Hapus Komentar
      </Button>
    </>
  );
}
