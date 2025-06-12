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
  MODEL_FORUM_POSTING,
  MODEL_FORUM_REPORT_POSTING,
} from "@/app_modules/forum/model/interface";
import mqtt_client from "@/util/mqtt_client";
import {
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
import ComponentAdminForum_ViewOneDetailPosting from "../component/detail_one_posting";
import { adminForum_funDeletePostingById } from "../fun/delete/fun_delete_posting_by_id";
import {
  apiAdminGetPostingForumById,
  apiGetAdminForumReportPosting,
} from "../lib/api_fetch_admin_forum";

export default function AdminForum_HasilReportPosting(
  {
    // dataPosting,
    // listReport,
  }: {
    // dataPosting: MODEL_FORUM_POSTING;
    // listReport: any;
  }
) {
  const { id } = useParams();
  const [data, setData] = useState<MODEL_FORUM_POSTING | null>(null);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    try {
      const response = await apiAdminGetPostingForumById({
        id: id as string,
      });
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
        <ComponentAdminGlobal_HeaderTamplate name="Forum: Report" />
        <Admin_ComponentBackButton />

        {!data ? (
          <CustomSkeleton height={200} width={"100%"} />
        ) : (
          <>
            <Admin_V3_ComponentBreakpoint>
              <ComponentAdminForum_ViewOneDetailPosting dataPosting={data} />
              <Group position="center">
                <ButtonDeletePosting dataPosting={data} />
              </Group>
            </Admin_V3_ComponentBreakpoint>
          </>
        )}

        <HasilReportPosting postingId={id as string} />
      </Stack>
    </>
  );
}

function ButtonDeletePosting({
  dataPosting,
}: {
  dataPosting: MODEL_FORUM_POSTING;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    try {
      setLoading(true);
      const del = await adminForum_funDeletePostingById(dataPosting.id);
      if (del.status === 200) {
        const dataNotif = {
          appId: dataPosting.id,
          status: "Report Posting",
          userId: dataPosting.authorId,
          pesan: dataPosting.diskusi,
          kategoriApp: "FORUM",
          title: "Postingan anda telah di laporkan",
        };
        const notif = await adminNotifikasi_funCreateToUser({
          data: dataNotif as any,
        });
        if (notif.status === 201) {
          mqtt_client.publish(
            "USER",
            JSON.stringify({ userId: dataPosting.authorId, count: 1 })
          );
        }

        ComponentGlobal_NotifikasiBerhasil(del.message);
        setLoading(false);
        close();
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(del.message);
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
            Anda yakin menghapus ini ?
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
              loading={loading ? true : false}
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
      <Button
        radius={"xl"}
        color="red"
        leftIcon={<IconTrash size={15} />}
        onClick={() => {
          // onDelete();
          open();
        }}
      >
        Hapus Posting
      </Button>
    </>
  );
}

function HasilReportPosting({
  // listReport,
  postingId,
}: {
  // listReport: any;
  postingId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_REPORT_POSTING[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

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
        console.error("Invalid data format recieved", error);
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

  // async function onPageClick(p: any) {
  //   setActivePage(p);
  //   const loadData = await adminForum_getListReportPostingById({
  //     postingId: postingId,
  //     page: p,
  //   });
  //   setData(loadData.data as any);
  //   setNPage(loadData.nPage);
  // }

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
      <tr key={i}>
        <td>
          <Center c={AdminColor.white} w={150}>
            <Text>{e?.User?.username}</Text>
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white} w={150}>
            <Text>
              {e?.ForumMaster_KategoriReport?.title
                ? e?.ForumMaster_KategoriReport?.title
                : "-"}
            </Text>
          </Center>
        </td>

        <td>
          <Center c={AdminColor.white} w={300}>
            <Spoiler
              maxHeight={50}
              hideLabel="sembunyikan"
              showLabel="tampilkan"
            >
              {e?.ForumMaster_KategoriReport?.deskripsi ? (
                <Text style={{ textJustify: "auto", textAlign: "justify" }}>
                  {e?.ForumMaster_KategoriReport?.deskripsi}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Spoiler>
          </Center>
        </td>

        <td>
          <Center c={AdminColor.white} w={300}>
            <Spoiler
              maxHeight={50}
              hideLabel="sembunyikan"
              showLabel="tampilkan"
            >
              {e?.deskripsi ? (
                <Text style={{ textJustify: "auto", textAlign: "justify" }}>
                  {e?.deskripsi}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Spoiler>
          </Center>
        </td>
      </tr>
    ));
  };

  if (!data) return <CustomSkeleton height={400} width={"100%"} />;

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
            Hasil Report Postingan
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
                      <Center w={150} c={AdminColor.white}>
                        Username
                      </Center>
                    </th>
                    <th>
                      <Center w={150} c={AdminColor.white}>
                        Kategori
                      </Center>
                    </th>
                    <th>
                      <Center w={300} c={AdminColor.white}>
                        Deskripsi
                      </Center>
                    </th>
                    <th>
                      <Center w={300} c={AdminColor.white}>
                        Deskripsi Lainnya
                      </Center>
                    </th>
                  </tr>
                </thead>

                <tbody>{TableRows()}</tbody>
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
