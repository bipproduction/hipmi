"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_FORUM_POSTING } from "@/app_modules/forum/model/interface";
import { RouterAdminForum } from "@/lib/router_admin/router_admin_forum";
import { clientLogger } from "@/util/clientLogger";
import {
  Badge,
  Box,
  Button,
  Center,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconFlag3, IconMessageCircle, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";
import ComponentAdminForum_ButtonDeletePosting from "../component/button_delete";
import { apiGetAdminForumPublish } from "../lib/api_fetch_admin_forum";
import { Comp_DangerouslySetInnerHTML } from "@/app_modules/_global/component/new/comp_set_inner_html";
import { Comp_V3_SetInnerHTML } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { AdminForum_CompTableSetHtmlStiker } from "../component/comp_table_set_html_stiker";

export default function AdminForum_TablePosting() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum" />
        <TablePublish />
      </Stack>
    </>
  );
}

function TablePublish() {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_POSTING[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [isDelete, setDelete] = useState(false);

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
        const response = await apiGetAdminForumPublish({
          page: `${activePage}`,
          search: isSearch,
        });

        if (response?.success && response?.data.data) {
          setData(response.data.data);
          setNPage(response.data.nCount || 1);
        } else {
          console.error("Invalid data format recieved:", response);
          setData([]);
        }
      } catch (error) {
        clientLogger.error("Invlid data format recieved:", error);
        setData([]);
      }
    };
    loadInitialData();
  }, [activePage, isSearch, isDelete]);

  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  };

  async function onDelete(val: boolean) {
    setDelete(val);
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
              <Text color="gray">Tidak ada data</Text>
            </Center>
          </td>
        </tr>
      );
    }
    return data?.map((e, i) => (
      <tr
        key={i}
        style={{
          color: AdminColor.white,
        }}
      >
        {/* Author */}
        <td>
          <Box w={100}>
            <Text lineClamp={1}>{e?.Author?.username}</Text>
          </Box>
        </td>

        {/* Status */}
        <td>
          <Center>
            <Badge
              color={
                (e?.ForumMaster_StatusPosting?.id as any) === 1
                  ? "green"
                  : "red"
              }
            >
              {e?.ForumMaster_StatusPosting?.status}
            </Badge>
          </Center>
        </td> 

        {/* Deskripsi */}
        <td>
          <AdminForum_CompTableSetHtmlStiker data={e.diskusi} classname="chat-content" />
        </td>

        {/* Jumlah komentar */}
        <td>
          <Center>
            <Text fw={"bold"} fz={"lg"}>
              {e?.Forum_Komentar.length}
            </Text>
          </Center>
        </td>

        {/* Jumlah report */}
        <td>
          <Center>
            <Text
              c={e?.Forum_ReportPosting?.length >= 3 ? "red" : AdminColor.white}
              fw={"bold"}
              fz={"lg"}
            >
              {e?.Forum_ReportPosting.length}
            </Text>
          </Center>
        </td>

        {/* Aksi */}
        <td>
          <Stack align="center" spacing={"xs"}>
            <ButtonAction postingId={e?.id} />
            <ComponentAdminForum_ButtonDeletePosting
              postingId={e?.id}
              onSuccesDelete={(val) => {
                onDelete(val);
              }}
            />
          </Stack>
        </td>

        {/* <td>
          <Box w={100}>
            <Text>
              {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
                new Date(e?.createdAt)
              )}
            </Text>
          </Box>
        </td> */}
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Posting"
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
                      <Text c={AdminColor.white}>Username</Text>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Status</Center>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Postingan</Text>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Komentar Aktif</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Total Report Posting</Center>
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

function ButtonAction({ postingId }: { postingId: string }) {
  const router = useRouter();
  const [loadingKomentar, setLoadingKomentar] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  return (
    <>
      <Button
        fz={"xs"}
        loading={loadingKomentar ? true : false}
        loaderPosition="center"
        radius={"xl"}
        w={170}
        leftIcon={<IconMessageCircle size={15} />}
        onClick={() => {
          setLoadingKomentar(true);
          router.push(RouterAdminForum.detail_posting + postingId);
        }}
      >
        <Text>Detail & Komentar</Text>
      </Button>
      <Button
        fz={"xs"}
        loading={loadingReport ? true : false}
        loaderPosition="center"
        radius={"xl"}
        w={170}
        leftIcon={<IconFlag3 size={15} />}
        onClick={() => {
          setLoadingReport(true);
          router.push(RouterAdminForum.report_posting + postingId);
        }}
      >
        Hasil Report
      </Button>
    </>
  );
}

// function ButtonDeletePosting({ postingId }: { postingId: string }) {
//   const [opened, { open, close }] = useDisclosure(false);
//   const [loadingDel, setLoadingDel] = useState(false);
//   const [loadingDel2, setLoadingDel2] = useState(false);

//   async function onDelete() {
//     await adminForum_funDeletePostingById(postingId).then((res) => {
//       if (res.status === 200) {
//         setLoadingDel2(false);
//         setLoadingDel(false);
//         close();
//         ComponentGlobal_NotifikasiBerhasil(res.message);
//       } else {
//         ComponentGlobal_NotifikasiGagal(res.message);
//       }
//     });
//   }
//   return (
//     <>
//       <Modal
//         opened={opened}
//         onClose={close}
//         centered
//         withCloseButton={false}
//         closeOnClickOutside={false}
//       >
//         <Stack>
//           <Title order={5}>Anda yakin menghapus posting ini</Title>
//           <Group position="center">
//             <Button
//               radius={"xl"}
//               onClick={() => {
//                 close();
//                 setLoadingDel(false);
//               }}
//             >
//               Batal
//             </Button>
//             <Button
//               loaderPosition="center"
//               loading={loadingDel2 ? true : false}
//               radius={"xl"}
//               color="red"
//               onClick={() => {
//                 onDelete();
//                 setLoadingDel2(true);
//               }}
//             >
//               Hapus
//             </Button>
//           </Group>
//         </Stack>
//       </Modal>
//       <Button
//         fz={"xs"}
//         loaderPosition="center"
//         loading={loadingDel ? true : false}
//         radius={"xl"}
//         w={170}
//         color="red"
//         leftIcon={<IconTrash size={15} />}
//         onClick={() => {
//           // onDelete();
//           open();
//           setLoadingDel(true);
//         }}
//       >
//         Hapus Posting
//       </Button>
//     </>
//   );
// }
