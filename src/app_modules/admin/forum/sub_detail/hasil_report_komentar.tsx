"use client";

import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import {
  MODEL_FORUM_KOMENTAR,
  MODEL_FORUM_REPORT_POSTING
} from "@/app_modules/forum/model/interface";
import mqtt_client from "@/util/mqtt_client";
import {
  Button,
  Center,
  Group,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  Title
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconTrash
} from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import ComponentAdminForum_ViewOneDetailKomentar from "../component/detail_one_komentar";
import { adminForum_funDeleteKomentarById } from "../fun/delete/fun_delete_komentar_by_id";
import { adminForum_getListReportKomentarbyId } from "../fun/get/get_list_report_komentar_by_id";
import adminForum_funGetOneKomentarById from "../fun/get/get_one_komentar_by_id";

export default function AdminForum_HasilReportKomentar({
  komentarId,
  listReport,
  dataKomentar,
}: {
  komentarId: string;
  listReport: any;
  dataKomentar: MODEL_FORUM_KOMENTAR;
}) {
  const [data, setData] = useState(dataKomentar);
  console.log(komentarId);

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Hasil Report Komentar" />
        <Group position="apart">
          <AdminGlobal_ComponentBackButton />
          <ButtonDeleteKomentar
            komentarId={komentarId}
            data={data}
            onSuccess={(val) => {
              setData(val);
            }}
          />
        </Group>
        <ComponentAdminForum_ViewOneDetailKomentar dataKomentar={data} />
        <HasilReportPosting listReport={listReport} komentarId={komentarId} />
        {/* <pre>{JSON.stringify(listReport, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function ButtonDeleteKomentar({
  komentarId,
  data,
  onSuccess,
}: {
  komentarId: string;
  data: MODEL_FORUM_KOMENTAR;
  onSuccess: (val: any) => void;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [loadingDel2, setLoadingDel2] = useState(false);

  async function onDelete() {
    await adminForum_funDeleteKomentarById(komentarId).then(async (res) => {
      if (res.status === 200) {
        setLoadingDel2(false);
        close();

        const dataKomentar = await adminForum_funGetOneKomentarById({
          komentarId: komentarId,
        });
        onSuccess(dataKomentar);

        const dataNotif = {
          appId: data.id,
          status: "Report Komentar",
          // userId harus sama seperti author
          userId: data.authorId,
          pesan: data.komentar,
          kategoriApp: "FORUM",
          title: "Komentar anda telah di laporkan",
        };

        const notif = await adminNotifikasi_funCreateToUser({
          data: dataNotif as any,
        });
        if (notif.status === 201) {
          mqtt_client.publish(
            "USER",
            JSON.stringify({ userId: data.authorId, count: 1 })
          );
        }

        ComponentGlobal_NotifikasiBerhasil(res.message);
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

      {data?.isActive ? (
        <Button
          loaderPosition="center"
          radius={"xl"}
          color="red"
          leftIcon={<IconTrash size={15} />}
          onClick={() => {
            open();
          }}
        >
          Hapus Komentar
        </Button>
      ) : (
        ""
      )}
    </>
  );
}

function HasilReportPosting({
  listReport,
  komentarId,
}: {
  listReport: any;
  komentarId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_REPORT_POSTING[]>(
    listReport.data
  );
  const [nPage, setNPage] = useState(listReport.nPage);
  const [activePage, setActivePage] = useState(1);


  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminForum_getListReportKomentarbyId({
      komentarId: komentarId,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={200}>
          <Text>{e?.User?.Profile?.name}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <Text>
            {e?.ForumMaster_KategoriReport?.title
              ? e?.ForumMaster_KategoriReport?.title
              : "-"}
          </Text>
        </Center>
      </td>

      <td>
        <Center w={500}>
          <Spoiler maxHeight={50} hideLabel="sembunyikan" showLabel="tampilkan">
            {e?.ForumMaster_KategoriReport?.deskripsi ? (
              <Text>{e?.ForumMaster_KategoriReport?.deskripsi}</Text>
            ) : (
              <Text>-</Text>
            )}
          </Spoiler>
        </Center>
      </td>

      <td>
        <Center w={500}>
          <Spoiler maxHeight={50} hideLabel="sembunyikan" showLabel="tampilkan">
            {e?.deskripsi ? <Text>{e?.deskripsi}</Text> : <Text>-</Text>}
          </Spoiler>
        </Center>
      </td>
    </tr>
  ));
  console.log("Ini data", data);

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={"red.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4} c={"white"}>
            Report Komentar
          </Title>
          {/* <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Cari postingan"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          /> */}
        </Group>

        {_.isEmpty(data) ? (
          <ComponentAdminGlobal_IsEmptyData />
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
                      <Center>Username</Center>
                    </th>
                    <th>
                      <Center>Kategori</Center>
                    </th>
                    <th>
                      <Center>Deskripsi</Center>
                    </th>
                    <th>
                      <Center>Deskripsi Lainnya</Center>
                    </th>
                  </tr>
                </thead>

                <tbody>{TableRows}</tbody>
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
