"use client";

import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import {
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
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBan, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminVote_funGetListReject } from "../../fun";
import { AdminVote_funEditCatatanRejectById } from "../../fun/edit/fun_edit_catatan_reject_by_id";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import { MainColor } from "@/app_modules/_global/color";
import { AccentColor, AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminVote_TableReject({ dataVote }: { dataVote: any }) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Voting" />
        <TableStatus listData={dataVote} />
      </Stack>
    </>
  );
}

function TableStatus({ listData }: { listData: any }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState<MODEL_VOTING[]>(listData.data);
  const [votingId, setVotingId] = useState("");
  const [catatan, setCatatan] = useState("");

  const [isNPage, setNPage] = useState(listData.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminVote_funGetListReject({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminVote_funGetListReject({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onReject(
    votingId: string,
    catatan: string,
    close: any,
    setData: any
  ) {
    const res = await AdminVote_funEditCatatanRejectById(votingId, catatan);
    if (res.status === 200) {
      const loadData = await adminVote_funGetListReject({
        page: 1,
        search: isSearch,
      });
      setData(loadData.data as any);
      setNPage(loadData.nPage);
      setActivePage(1);
      ComponentAdminGlobal_NotifikasiBerhasil(res.message);
      close();
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
    }
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center>
          <Button
            color={"red"}
            leftIcon={<IconBan />}
            radius={"xl"}
            onClick={() => {
              open();
              setVotingId(e.id);
              setCatatan(e.catatan);
            }}
          >
            <Stack c={AccentColor.white} spacing={0}>
              <Text fz={10}>Tambah</Text>
              <Text fz={10}>Catatan</Text>
            </Stack>
          </Button>
        </Center>
      </td>
      <td>
        <Center>
          <Spoiler
            hideLabel="sembunyikan"
            maw={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            {e.catatan}
          </Spoiler>
        </Center>
      </td>
      <td>
        <Center c={AccentColor.white}>{e?.Author?.Profile?.name}</Center>
      </td>
      <td>
        <Center c={AccentColor.white}>{e.title}</Center>
      </td>
      <td>
        <Center>
          <Spoiler
            hideLabel="sembunyikan"
            maw={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            {e.deskripsi}
          </Spoiler>
        </Center>
      </td>
      <th>
        <Stack>
          {e.Voting_DaftarNamaVote.map((v) => (
            <Box key={v.id}>
              <Text c={AccentColor.white}>- {v.value}</Text>
            </Box>
          ))}
        </Stack>
      </th>
      <td>
        <Center c={AccentColor.white}>
          {e.awalVote.toLocaleDateString("id-ID", { dateStyle: "long" })}
        </Center>
      </td>
      <td>
        <Center c={AccentColor.white}>
          {e.akhirVote.toLocaleDateString("id-ID", { dateStyle: "long" })}
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <ComponentAdminGlobal_TitlePage
          name="Reject"
          color={AdminColor.softBlue}
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
        </Group> */}

        <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"md"}
              horizontalSpacing={"md"}
              p={"md"}
              w={1500}
              
            >
              <thead>
                <tr>
                  <th>
                    <Center c={AccentColor.white}>Aksi</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Catatan</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Author</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Judul</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Deskripsi</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Pilihan</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Mulai Vote</Center>
                  </th>
                  <th>
                    <Center c={AccentColor.white}>Selesai Vote</Center>
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
            autosize
            label="Masukan Alasan Penolakan"
            placeholder="Contoh: Karena deskripsi kurang lengkap, dll"
            value={catatan}
            onChange={(val) => {
              setCatatan(val.target.value);
            }}
          />
          <Group position="right">
            <Button radius={"xl"} onClick={() => close()}>
              Batal
            </Button>
            <Button
              radius={"xl"}
              onClick={() => {
                onReject(votingId, catatan, close, setData);
                console.log(catatan);
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
