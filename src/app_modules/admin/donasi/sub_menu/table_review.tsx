"use client";

import { gs_adminDonasi_triggerReview } from "@/app/lib/global_state";
import { RouterAdminDonasi_OLD } from "@/app/lib/router_hipmi/router_admin";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import {
  Affix,
  Button,
  Center,
  Group,
  Pagination,
  Paper,
  rem,
  ScrollArea,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconEyeCheck, IconRefresh, IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import adminDonasi_getListReview from "../fun/get/get_list_review";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminDonasi_TableReview({
  listReview,
}: {
  listReview: MODEL_DONASI[];
}) {
  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="Donasi" />
        <TableStatus listReview={listReview} />
      </Stack>
    </>
  );
}

function TableStatus({ listReview }: { listReview: any }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [idData, setIdData] = useState("");
  const [data, setData] = useState<MODEL_DONASI[]>(listReview.data);
  const [isNPage, setNPage] = useState(listReview.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  // Realtime
  const [isAdminDonasi_TriggerReview, setIsAdminDonasi_TriggerReview] = useAtom(
    gs_adminDonasi_triggerReview
  );
  const [isShowReload, setIsShowReload] = useState(false);
  const [isLoadingReload, setLoadingReload] = useState(false);

  useShallowEffect(() => {
    if (isAdminDonasi_TriggerReview) {
      setIsShowReload(true);
    }
  }, [isAdminDonasi_TriggerReview, setIsShowReload]);

  async function onLoadData() {
    const loadData = await adminDonasi_getListReview({ page: 1 });

    setData(loadData.data as any);
    setNPage(loadData.nPage);
    setLoadingReload(false);
    setIsShowReload(false);
    setIsAdminDonasi_TriggerReview(false);
  }

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminDonasi_getListReview({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminDonasi_getListReview({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>{e?.Author?.username}</Center>
      </td>
      <td>
        <Center>{e?.title}</Center>
      </td>
      <td>
        <Center>
          <ComponentGlobal_TampilanRupiah color="black" nominal={+e.target} />
        </Center>
      </td>
      <td>
        <Center>{e?.DonasiMaster_Ketegori.name}</Center>
      </td>
      <td>
        <Center>{e?.DonasiMaster_Durasi.name} hari</Center>
      </td>
      <td>
        <Center>
          <Button
            loaderPosition="center"
            loading={isLoading && e?.id == idData ? true : false}
            color={"orange"}
            leftIcon={<IconEyeCheck />}
            radius={"xl"}
            variant="outline"
            onClick={() => {
              setLoading(true);
              setIdData(e?.id);
              router.push(RouterAdminDonasi_OLD.detail_review + `${e?.id}`);
            }}
          >
            Tampilkan
          </Button>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <ComponentAdminGlobal_TitlePage
          name="Review"
          color={AdminColor.orange}
          component={
            <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan judul"
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
          <Title order={4}>Review</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan judul"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group> */}

        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
          {isShowReload && (
            <Affix position={{ top: rem(200) }} w={"100%"}>
              <Center>
                <Button
                  style={{
                    transition: "0.5s",
                    border: `1px solid ${AccentColor.skyblue}`,
                  }}
                  bg={AccentColor.blue}
                  loaderPosition="center"
                  loading={isLoadingReload}
                  radius={"xl"}
                  opacity={0.8}
                  onClick={() => onLoadData()}
                  leftIcon={<IconRefresh />}
                >
                  Update Data
                </Button>
              </Center>
            </Affix>
          )}
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"md"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}
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
                    <Center>Judul</Center>
                  </th>
                  <th>
                    <Center>Target</Center>
                  </th>
                  <th>
                    <Center>Ketegori</Center>
                  </th>
                  <th>
                    <Center>Durasi</Center>
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
              value={isActivePage}
              total={isNPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Center>
        </Paper>
      </Stack>
    </>
  );
}
