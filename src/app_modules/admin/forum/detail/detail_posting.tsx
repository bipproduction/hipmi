"use client";

import { RouterAdminForum } from "@/lib/router_admin/router_admin_forum";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import ComponentAdminDonasi_TombolKembali from "@/app_modules/admin/donasi/component/tombol_kembali";
import {
  MODEL_FORUM_KOMENTAR,
  MODEL_FORUM_POSTING,
} from "@/app_modules/forum/model/interface";
import {
  Badge,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { IconFlag3 } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminForum_funDeleteKomentarById } from "../fun/delete/fun_delete_komentar_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import { adminForum_getListKomentarById } from "../fun/get/get_list_komentar_by_id";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminForum_ViewOneDetailPosting from "../component/detail_one_posting";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";
import { apiAdminGetKomentarForumById } from "../lib/api_fetch_admin_forum";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import moment from "moment";
import "moment/locale/id";

export default function AdminForum_DetailPosting({
  dataPosting,
}: {
  dataPosting: MODEL_FORUM_POSTING;
}) {
  return (
    <>
      {/* <pre>{JSON.stringify(listKomentar, null, 2)}</pre> */}
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Detail" />
        <AdminGlobal_ComponentBackButton />
        <ComponentAdminForum_ViewOneDetailPosting dataPosting={dataPosting} />
        <TableKomentar postingId={dataPosting.id} />
      </Stack>
    </>
  );
}

function TableKomentar({ postingId }: { postingId: string }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_KOMENTAR[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [isLoadingReport, setLoadingReport] = useState(false);
  const [idData, setIdData] = useState("");

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  async function handleLoadData() {
    try {
      const response = await apiAdminGetKomentarForumById({
        id: postingId,
        page: `${activePage}`,
        search: isSearch,
      });

      if (response && response.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Invalid data format received:", error);
      setData([]);
    }
  }

  async function onSearch(s: string) {
    setSearch(s);
    setActivePage(1);
    const loadData = await adminForum_getListKomentarById({
      postingId: postingId,
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminForum_getListKomentarById({
      postingId: postingId,
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

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
          <Box w={200}>
            <Spoiler
              c={AdminColor.white}
              maxHeight={50}
              hideLabel="sembunyikan"
              showLabel="tampilkan"
            >
              <div
                style={{ textAlign: "justify", textJustify: "auto" }}
                dangerouslySetInnerHTML={{ __html: e?.komentar }}
              />
            </Spoiler>
          </Box>
        </td>
        <td>
          <Box c={AdminColor.white} w={100}>
            <Text>{moment(e?.createdAt).format("DD-MM-YYYY")}</Text>
          </Box>
        </td>
        <td>
          <Center w={100}>
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
          <Stack align="center" spacing={"xs"} w={200}>
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
            <ButtonDeleteKomentar komentarId={e?.id} />
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
                {data?.length}
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

function ButtonDeleteKomentar({ komentarId }: { komentarId: string }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [loadindDel, setLoadingDel] = useState(false);
  const [loadingDel2, setLoadingDel2] = useState(false);

  async function onDelete() {
    await adminForum_funDeleteKomentarById(komentarId).then((res) => {
      if (res.status === 200) {
        setLoadingDel(false);
        setLoadingDel2(false);
        ComponentGlobal_NotifikasiBerhasil(res.message);
        close();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Stack>
          <Title order={5}>Anda yakin menghapus komentar ini ?</Title>
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
              loading={loadingDel2 ? true : false}
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
      </Modal>

      <Button
        loading={loadindDel ? true : false}
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
