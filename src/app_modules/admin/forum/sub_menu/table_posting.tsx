"use client";

import { RouterAdminForum } from "@/app/lib/router_admin/router_admin_forum";
import { RouterForum } from "@/app/lib/router_hipmi/router_forum";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import { MODEL_FORUM_POSTING } from "@/app_modules/forum/model/interface";
import {
  Badge,
  Box,
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
  TextInput,
  Title,
} from "@mantine/core";
import { IconMessageCircle, IconSearch } from "@tabler/icons-react";
import { IconFlag3 } from "@tabler/icons-react";
import { IconEyeCheck, IconTrash } from "@tabler/icons-react";
import _, { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminForum_funDeletePostingById } from "../fun/delete/fun_delete_posting_by_id";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { useDisclosure } from "@mantine/hooks";
import { adminForum_getListPosting } from "../fun/get/get_list_publish";
import adminJob_getListPublish from "@/app_modules/admin/job/fun/get/get_list_publish";
import ComponentAdminForum_ButtonDeletePosting from "../component/button_delete";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminForum_TablePosting({
  listPublish,
}: {
  listPublish: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum" />
        <TablePublish listPublish={listPublish} />
        {/* <pre>{JSON.stringify(listPublish, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function TablePublish({ listPublish }: { listPublish: any }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_POSTING[]>(listPublish.data);
  const [nPage, setNPage] = useState(listPublish.nPage);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    setActivePage(1);
    const loadData = await adminForum_getListPosting({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminForum_getListPosting({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onLoadData() {
     const loadData = await adminForum_getListPosting({
       page: 1,
     });
     setData(loadData.data as any);
     setNPage(loadData.nPage);
  }

  const TableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={200}>
          <Text lineClamp={1}>{e?.Author?.username}</Text>
        </Center>
      </td>
      <td>
        <Center w={100}>
          <Badge
            color={
              (e?.ForumMaster_StatusPosting?.id as any) === 1 ? "green" : "red"
            }
          >
            {e?.ForumMaster_StatusPosting?.status}
          </Badge>
        </Center>
      </td>
      <td>
        <Box w={400}>
          <Spoiler
            // w={400}
            maxHeight={60}
            hideLabel="sembunyikan"
            showLabel="tampilkan"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: e?.diskusi,
              }}
            />
          </Spoiler>
        </Box>
      </td>
      <td>
        <Center w={150}>
          <Text>
            {new Intl.DateTimeFormat(["id-ID"], { dateStyle: "medium" }).format(
              e.createdAt
            )}
          </Text>
        </Center>
      </td>
      <td>
        <Center w={150}>
          <Text fw={"bold"} fz={"lg"}>
            {e?.Forum_Komentar.length}
          </Text>
        </Center>
      </td>
      <td>
        <Center w={150}>
          <Text
            c={e?.Forum_ReportPosting?.length >= 3 ? "red" : "black"}
            fw={"bold"}
            fz={"lg"}
          >
            {e?.Forum_ReportPosting.length}
          </Text>
        </Center>
      </td>
      <td>
        <Stack align="center" spacing={"xs"}>
          <ButtonAction postingId={e?.id} />
          <ComponentAdminForum_ButtonDeletePosting
            postingId={e?.id}
            onSuccesDelete={(val) => {
              if (val) {
                onLoadData();
              }
            }}
          />
        </Stack>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Posting"
          color={AdminColor.green}
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
        {/* <Group
          position="apart"
          bg={"green.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4} c={"white"}>
            Posting
          </Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Cari postingan"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group> */}
        
        {isEmpty(data) ? (
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
                      <Center>Status</Center>
                    </th>
                    <th>
                      <Text>Postingan</Text>
                    </th>
                    <th>
                      <Center>Tanggal Publish</Center>
                    </th>
                    <th>
                      <Center>Komentar Aktif</Center>
                    </th>
                    <th>
                      <Center>Total Report Posting</Center>
                    </th>
                    <th>
                      <Center>Aksi</Center>
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
