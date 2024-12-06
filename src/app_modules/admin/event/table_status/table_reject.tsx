"use client";

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
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPencilPlus, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { MODEL_EVENT } from "@/app_modules/event/model/interface";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { adminEvent_funGetListReject } from "../fun";
import { AdminEvent_funEditCatatanById } from "../fun/edit/fun_edit_status_reject_by_id";

export default function AdminEvent_TableReject({
  listReject,
}: {
  listReject: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />
        <TableStatus listReject={listReject} />
      </Stack>
    </>
  );
}

function TableStatus({ listReject }: { listReject: any }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_EVENT[]>(listReject.data);
  const [isNPage, setNPage] = useState(listReject.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  const [opened, { open, close }] = useDisclosure(false);
  const [eventId, setEventId] = useState("");
  const [catatan, setCatatan] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminEvent_funGetListReject({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminEvent_funGetListReject({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onUpdate(eventId: string, catatan: string) {
    const body = {
      id: eventId,
      catatan: catatan,
    };
    const res = await AdminEvent_funEditCatatanById(body as any, "4");
    if (res.status === 200) {
      const loadData = await adminEvent_funGetListReject({
        search: isSearch,
        page: isActivePage,
      });
      setData(loadData.data as any);
      setNPage(loadData.nPage);
      ComponentGlobal_NotifikasiBerhasil(res.message);
      close();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
    }
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={200}>{e?.Author?.username}</Center>
      </td>
      <td>
        <Center w={200}>{e.title}</Center>
      </td>
      <td>
        <Center w={200}>{e.lokasi}</Center>
      </td>
      <td>
        <Center w={200}>{e.EventMaster_TipeAcara.name}</Center>
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
        <Center w={500}>
          <Spoiler hideLabel="sembunyikan" maxHeight={50} showLabel="tampilkan">
            {e.deskripsi}
          </Spoiler>
        </Center>
      </td>
      <td>
        {" "}
        <Center w={400}>
          <Spoiler hideLabel="sembunyikan" maxHeight={50} showLabel="tampilkan">
            {e.catatan}
          </Spoiler>
        </Center>
      </td>

      <td>
        <Button
          color={"red"}
          leftIcon={<IconPencilPlus />}
          radius={"xl"}
          onClick={() => {
            setEventId(e.id);
            setCatatan(e.catatan);
            open();
          }}
        >
          Tambah Catatan
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={"red.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Reject</Title>
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
              w={1500}
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
                    <Center>Cacatan</Center>
                  </th>
                  <th>
                    <Center>Deskripsi</Center>
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

      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size={"md"}
      >
        <Stack>
          <Textarea
            minRows={2}
            maxRows={5}
            maxLength={300}
            value={catatan}
            autosize
            label="Masukan Alasan Penolakan"
            placeholder="Contoh: Karena deskripsi kurang lengkap, dll"
            onChange={(val) => {
              setCatatan(val.target.value);
            }}
          />
          <Group position="right">
            <Button
              radius={"xl"}
              onClick={() => {
                onUpdate(eventId, catatan);
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
