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
import { useDisclosure } from "@mantine/hooks";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import { adminForum_getListKomentarById } from "../fun/get/get_list_komentar_by_id";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminForum_ViewOneDetailPosting from "../component/detail_one_posting";

export default function AdminForum_DetailPosting({
  listKomentar,
  dataPosting,
  countKomentar,
}: {
  listKomentar: any;
  dataPosting: MODEL_FORUM_POSTING;
  countKomentar: number;
}) {
  return (
    <>
      {/* <pre>{JSON.stringify(listKomentar, null, 2)}</pre> */}
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Detail Posting" />
        <AdminGlobal_ComponentBackButton />
        <ComponentAdminForum_ViewOneDetailPosting dataPosting={dataPosting} />
        <TableKomentar
          listKomentar={listKomentar}
          postingId={dataPosting.id}
          countKomentar={countKomentar}
        />
      </Stack>
    </>
  );
}



function TableKomentar({
  listKomentar,
  postingId,
  countKomentar,
}: {
  listKomentar: any;
  postingId: string;
  countKomentar: number;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_KOMENTAR[]>(listKomentar.data);
  const [nPage, setNPage] = useState(listKomentar.nPage);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [isLoadingReport, setLoadingReport] = useState(false);
  const [idData, setIdData] = useState("");

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

  const rowTable = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={200}>
          <Text lineClamp={1}>{e?.Author?.username}</Text>
        </Center>
      </td>
      <td>
        <Box w={500}>
          <Spoiler maxHeight={50} hideLabel="sembunyikan" showLabel="tampilkan">
            <div
              style={{ textAlign: "center" }}
              dangerouslySetInnerHTML={{ __html: e?.komentar }}
            />
          </Spoiler>
        </Box>
      </td>
      <td>
        <Center w={200}>
          <Text>
            {new Intl.DateTimeFormat(["id-ID"], { dateStyle: "medium" }).format(
              e.createdAt
            )}
          </Text>
        </Center>
      </td>
      <td>
        <Center w={100}>
          <Text
            c={e?.Forum_ReportKomentar?.length >= 3 ? "red" : "black"}
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

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={"gray"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Group spacing={5}>
            <Title order={4} c={"white"}>
              Komentar
            </Title>
            <Title order={4} c={"white"}>
              {`(${countKomentar})`}
            </Title>
          </Group>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Cari komentar"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group>

        {_.isEmpty(data) ? (
          <ComponentAdminGlobal_IsEmptyData text="Tidak Ada Komentar" />
        ) : (
          <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"} offsetScrollbars>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={"100%"}
                h={"100%"}
                striped
                highlightOnHover
              >
                <thead>
                  <tr>
                    <th>
                      <Center w={200}>Username</Center>
                    </th>
                    <th>
                      <Center w={500}>Komentar</Center>
                    </th>
                    <th>
                      <Center w={200}>Tgl Komentar</Center>
                    </th>
                    <th>
                      <Center w={100}>Total Report</Center>
                    </th>
                    <th>
                      <Center w={200}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{rowTable}</tbody>
              </Table>
            </ScrollArea>
            <Center mt={"xl"}>
              <Pagination
                value={activePage}
                total={nPage}
                onChange={(val) => {
                  onPageClick(val);
                }}
              />
            </Center>
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
