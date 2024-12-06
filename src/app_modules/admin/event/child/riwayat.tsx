"use client";

import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";
import { MODEL_EVENT } from "@/app_modules/event/model/interface";
import {
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
  Title,
} from "@mantine/core";
import { IconCircleCheck, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { adminEvent_funGetListAllRiwayat } from "../fun";

export default function AdminEvent_Riwayat({
  listRiwayat,
}: {
  listRiwayat: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event: Riwayat" />
        <DetailRiwayat listRiwayat={listRiwayat} />
      </Stack>
    </>
  );
}

function DetailRiwayat({ listRiwayat }: { listRiwayat: any }) {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<MODEL_EVENT[]>(listRiwayat.data);
  const [isNPage, setNPage] = useState(listRiwayat.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminEvent_funGetListAllRiwayat({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminEvent_funGetListAllRiwayat({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Button
          loaderPosition="center"
          loading={e.id === eventId && loading ? true : false}
          color={"green"}
          leftIcon={<IconCircleCheck />}
          radius={"xl"}
          onClick={() => {
            setEventId(e.id);
            setLoading(true);
            router.push(RouterAdminEvent.detail_peserta + e.id);
          }}
        >
          Lihat Peserta
        </Button>
      </td>

      <td>
        <Center w={200}>
          <Text>{e?.Author?.username}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <Text lineClamp={2}>{e.title}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <Text>{e.lokasi}</Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <Text>{e.EventMaster_TipeAcara.name}</Text>
        </Center>
      </td>

      <td>
        <Center w={200}>
          <Text align="center">
            {" "}
            {new Intl.DateTimeFormat("id-ID", {
              dateStyle: "full",
            }).format(e?.tanggal)}
            ,{" "}
            <Text span inherit>
              {new Intl.DateTimeFormat("id-ID", {
                timeStyle: "short",
              }).format(e?.tanggal)}
            </Text>
          </Text>
        </Center>
      </td>
      <td>
        <Center w={200}>
          <Text align="center">
            {" "}
            {new Intl.DateTimeFormat("id-ID", {
              dateStyle: "full",
            }).format(e?.tanggalSelesai)}
            ,{" "}
            <Text span inherit>
              {new Intl.DateTimeFormat("id-ID", {
                timeStyle: "short",
              }).format(e?.tanggalSelesai)}
            </Text>
          </Text>
        </Center>
      </td>

      <td>
        <Center w={400}>
          <Spoiler hideLabel="sembunyikan" maxHeight={50} showLabel="tampilkan">
            {e.deskripsi}
          </Spoiler>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={"gray.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Riwayat</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan judul"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group>

        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"md"}
              horizontalSpacing={"md"}
              p={"md"}
              w={"100%"}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Aksi</Center>
                  </th>
                  <th>
                    <Center>Username</Center>
                  </th>
                  <th>
                    <Center>Judul</Center>
                  </th>
                  <th>
                    <Center>Lokasi</Center>
                  </th>
                  <th>
                    <Center>Tipe Acara</Center>
                  </th>
                  <th>
                    <Center>Tanggal & Waktu Mulai</Center>
                  </th>
                  <th>
                    <Center>Tanggal & Waktu Selesai</Center>
                  </th>
                  <th>
                    <Center>Deskripsi</Center>
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
