"use client";


import { RouterAdminForum } from "@/app/lib/router_admin/router_admin_forum";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_FORUM_POSTING } from "@/app_modules/forum/model/interface";
import { clientLogger } from "@/util/clientLogger";
import {
  Badge,
  Box,
  Button,
  Center,
  Pagination,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconFlag3, IconMessageCircle, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import ComponentAdminForum_ButtonDeletePosting from "../component/button_delete";
import { apiGetAdminForumPublish } from "../lib/api_fetch_admin_forum";


export default function AdminForum_TablePosting() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum" />
        <TablePublish />
        {/* <pre>{JSON.stringify(listPublish, null, 2)}</pre> */}
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


  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetAdminForumPublish({
          page: `${activePage}`
        })
        
        
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
    }
    loadInitialData();
  }, [activePage, isSearch]);
  
  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  }

  async function onLoadData() {
    const loadData = await apiGetAdminForumPublish({
      page: `${activePage}`
    });
    setData(loadData.data.data);
    setNPage(loadData.data.nCount);
  }

  const onPageClick = (page: number) => {
    setActivePage(page);
  }


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
      )
    }
    return data?.map((e, i) => (
      <tr key={i}>
        <td>
          <Center w={200}>
            <Text c={AdminColor.white} lineClamp={1}>{e?.Author?.username}</Text>
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
              c={AdminColor.white}
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
            <Text c={AdminColor.white}>
              {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
               new Date(e?.createdAt)
              )}
            </Text>
          </Center>
        </td>
        <td>
          <Center w={150}>
            <Text c={AdminColor.white} fw={"bold"} fz={"lg"}>
              {e?.Forum_Komentar.length}
            </Text>
          </Center>
        </td>
        <td>
          <Center w={150}>
            <Text
              c={e?.Forum_ReportPosting?.length >= 3 ? "red" : AdminColor.white}
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
  }


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
                      <Center c={AdminColor.white}>Username</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Status</Center>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Postingan</Text>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Tanggal Publish</Center>
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



