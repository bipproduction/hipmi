"use client";

import { RouterAdminForum } from "@/app/lib/router_admin/router_admin_forum";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import {
  MODEL_FORUM_REPORT_POSTING
} from "@/app_modules/forum/model/interface";
import {
  Badge,
  Box,
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { IconFlag3, IconSearch } from "@tabler/icons-react";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_IsEmptyData from "../../_admin_global/is_empty_data";
import ComponentAdminForum_ButtonDeletePosting from "../component/button_delete";
import adminForum_funGetAllReportPosting from "../fun/get/get_all_report_posting";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminForum_TableReportPosting({
  listData,
}: {
  listData: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Forum" />
        <TableView listData={listData} />
        {/* <pre>{JSON.stringify(listPublish, null, 2)}</pre> */}
      </Stack>
    </>
  );
}

function TableView({ listData }: { listData: any }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_FORUM_REPORT_POSTING[]>(listData.data);
  const [nPage, setNPage] = useState(listData.nPage);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    setActivePage(1);
    const loadData = await adminForum_funGetAllReportPosting({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminForum_funGetAllReportPosting({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onLoadData() {
    const loadData = await adminForum_funGetAllReportPosting({
      page: 1,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={200}>
          <Text lineClamp={1}>{e?.User.username}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          {e?.forumMaster_KategoriReportId === null ? (
            <Text>Lainnya</Text>
          ) : (
            <Text lineClamp={1}>{e?.ForumMaster_KategoriReport.title}</Text>
          )}
        </Center>
      </td>

      {/* <td>
        <Center w={200}>
          <Text lineClamp={1}>{e?.Forum_Posting.Author.username}</Text>
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
                __html: e?.Forum_Posting.diskusi,
              }}
            />
          </Spoiler>
        </Box>
      </td> */}

      <td>
        <Center w={200}>
          <Badge
            color={
              (e?.Forum_Posting.ForumMaster_StatusPosting?.id as any) === 1
                ? "green"
                : "red"
            }
          >
            {e?.Forum_Posting.ForumMaster_StatusPosting?.status}
          </Badge>
        </Center>
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
        <Stack align="center" spacing={"xs"}>
          {/* <ButtonAction postingId={e?.id} /> */}
          <ButtonLihatReportLainnya postingId={e?.forum_PostingId} />
          {/* <ComponentAdminForum_ButtonDeletePosting
            postingId={e?.forum_PostingId}
            onSuccesDelete={(val) => {
              if (val) {
                onLoadData();
              }
            }}
          /> */}
        </Stack>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Report Posting"
          color={AdminColor.orange}
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
          bg={"orange.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4} c={"white"}>
            Report Posting
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
                      <Center>Pelapor</Center>
                    </th>
                    <th>
                      <Center>Jenis Laporan</Center>
                    </th>
                    {/* <th>
                      <Center>Author</Center>
                    </th>
                    <th>
                      <Text>Postingan</Text>
                    </th> */}
                    <th>
                      <Center w={200}>Status Posting</Center>
                    </th>
                    <th>
                      <Center>Tanggal Report</Center>
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

function ButtonLihatReportLainnya({ postingId }: { postingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        fz={"xs"}
        loading={loading ? true : false}
        loaderPosition="center"
        radius={"xl"}
        w={170}
        leftIcon={<IconFlag3 size={15} />}
        onClick={() => {
          setLoading(true);
          router.push(RouterAdminForum.report_posting + postingId);
        }}
      >
        <Text>Lihat Report Lain</Text>
      </Button>
    </>
  );
}
