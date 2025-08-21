"use client";

import {
  AdminColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import {
  MODEL_FORUM_KOMENTAR,
  MODEL_FORUM_REPORT_POSTING,
} from "@/app_modules/forum/model/interface";
import mqtt_client from "@/util/mqtt_client";
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
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Admin_ComponentModal } from "../../_admin_global/_component/comp_admin_modal";
import Admin_ComponentBackButton from "../../_admin_global/back_button";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import ComponentAdminForum_ViewOneDetailKomentar from "../component/detail_one_komentar";
import { adminForum_funDeleteKomentarById } from "../fun/delete/fun_delete_komentar_by_id";
import {
  apiAdminGetListReportKomentarById,
  apiAdminGetOneKomentarForumById,
} from "../lib/api_fetch_admin_forum";

export default function AdminForum_HasilReportKomentar(
//   {
//   komentarId,
//   listReport,
//   dataKomentar,
// }: {
//   komentarId: string;
//   listReport: any;
//   dataKomentar: MODEL_FORUM_KOMENTAR;
// }
) {
  const { id } = useParams();
  const [data, setData] = useState<MODEL_FORUM_KOMENTAR | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiAdminGetOneKomentarForumById({
        id: id as string,
      });
      if (response && response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Invalid data get one forum", error);
      setData(null);
    }
  }

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Report" />
        <Admin_ComponentBackButton />

        {!data ? (
          <CustomSkeleton height={200} width={"100%"} />
        ) : (
          <Admin_V3_ComponentBreakpoint>
            <ComponentAdminForum_ViewOneDetailKomentar dataKomentar={data} />
            <Group position="center">
              <ButtonDeleteKomentar
                komentarId={id as string}
                data={data}
                onSuccess={(val) => {
                  setData(val);
                }}
              />
            </Group>
          </Admin_V3_ComponentBreakpoint>
        )}

        <HasilReportPosting komentarId={id as string} />
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
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    try {
      setLoading(true);
      const res = await adminForum_funDeleteKomentarById(komentarId);
      if (res.status === 200) {
        // const dataKomentar = await adminForum_funGetOneKomentarById({
        //   komentarId: komentarId,
        // });
        // onSuccess(dataKomentar);

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
        setLoading(false);
        close();
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      console.log("error delete", error);
      setLoading(false);
      ComponentGlobal_NotifikasiGagal("Terjadi kesalahan, silahkan coba lagi");
    }
  }

  return (
    <>
      <Admin_ComponentModal
        opened={opened}
        onClose={close}
        withCloseButton={false}
      >
        <Stack>
          <Title order={5} c={MainColor.white}>
            Anda yakin menghapus komentar ini ?
          </Title>
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
              loading={loading}
              radius={"xl"}
              color="red"
              onClick={() => {
                onDelete();
                setLoading(true);
              }}
            >
              Hapus
            </Button>
          </Group>
        </Stack>
      </Admin_ComponentModal>

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
  // listReport,
  komentarId,
}: {
  // listReport: any;
  komentarId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_REPORT_POSTING[] | null>(null);
  const [nPage, setNPage] = useState(1);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    onLoadData();
  }, [komentarId, activePage]);

  async function onLoadData() {
    try {
      const response = await apiAdminGetListReportKomentarById({
        id: komentarId,
        page: `${activePage}`,
      });
      if (response && response.success) {
        setData(response.data.data);
        setNPage(response.data.nPage);
      }
    } catch (error) {
      console.error("Invalid data format received:", error);
      setData([]);
      setNPage(1);
    }
  }

  async function onPageClick(p: any) {
    setActivePage(p);
  }

  const TableRows = () => {
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
      <tr key={i} style={{ color: AdminColor.white }}>
        <td>
          <Box w={100}>
            <Text>{e?.User?.username}</Text>
          </Box>
        </td>
        <td>
          <Box w={150}>
            <Text>
              {e?.ForumMaster_KategoriReport?.title
                ? e?.ForumMaster_KategoriReport?.title
                : "-"}
            </Text>
          </Box>
        </td>

        <td>
          <Box w={300}>
            <Spoiler
              maxHeight={50}
              hideLabel="sembunyikan"
              showLabel="tampilkan"
            >
              {e?.ForumMaster_KategoriReport?.deskripsi ? (
                <Text>{e?.ForumMaster_KategoriReport?.deskripsi}</Text>
              ) : (
                <Text>-</Text>
              )}
            </Spoiler>
          </Box>
        </td>

        <td>
          <Box w={300}>
            <Spoiler
              maxHeight={50}
              hideLabel="sembunyikan"
              showLabel="tampilkan"
            >
              {e?.deskripsi ? <Text>{e?.deskripsi}</Text> : <Text>-</Text>}
            </Spoiler>
          </Box>
        </td>
      </tr>
    ));
  };

  if (!data) {
    return <CustomSkeleton height={400} width={"100%"} />;
  }

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4} c={"white"}>
            Hasil Report Komentar
          </Title>
        </Group>

        {_.isEmpty(data) ? (
          <ComponentAdminGlobal_IsEmptyData />
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
                      <Text c={AdminColor.white}>Kategori</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Deskripsi</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Deskripsi Lainnya</Text>
                    </th>
                  </tr>
                </thead>

                <tbody>{TableRows()}</tbody>
              </Table>
            </ScrollArea>
            <Admin_V3_ComponentPaginationBreakpoint
              value={activePage}
              total={nPage}
              onChange={onPageClick}
            />
          </Paper>
        )}
      </Stack>
    </>
  );
}
