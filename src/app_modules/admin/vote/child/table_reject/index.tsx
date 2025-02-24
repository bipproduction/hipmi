"use client";

import {
  AccentColor,
  AdminColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import ComponentAdminGlobal_IsEmptyData from "@/app_modules/admin/_admin_global/is_empty_data";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { clientLogger } from "@/util/clientLogger";
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
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconBan, IconSearch } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminVote_funGetListReject } from "../../fun";
import { AdminVote_funEditCatatanRejectById } from "../../fun/edit/fun_edit_catatan_reject_by_id";
import { apiGetAdminVotingByStatus } from "../../lib/api_fetch_admin_voting";

export default function AdminVote_TableReject() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Voting" />
        <TableStatus />
      </Stack>
    </>
  );
}

function TableStatus() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [votingId, setVotingId] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState<MODEL_VOTING[] | null>(null);
  const [nPage, setNPage] = useState(1);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  useShallowEffect(() => {
    handleLoadData();
  }, [isActivePage, isSearch]);

  const handleLoadData = async () => {
    try {
      const response = await apiGetAdminVotingByStatus({
        name: "Reject",
        page: `${isActivePage}`,
        search: isSearch,
      });

      if (response?.success && response?.data?.data) {
        setData(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        console.error("Invalid data format received:", response);
        setData([]);
      }
    } catch (error) {
      clientLogger.error("Error get data table publish", error);
      setData([]);
    }
  };

  async function onSearch(s: string) {
    setSearch(s);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
  }

  async function onReject() {
    try {
      setLoading(true);
      const res = await AdminVote_funEditCatatanRejectById(votingId, catatan);
      if (res.status === 200) {
        handleLoadData();
        ComponentAdminGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentAdminGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      console.log("Error get data voting review", error);
      setVotingId("");
    } finally {
      close();
      setLoading(false);
      setVotingId("");
    }
  }

  const renderTableBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <tr>
          <td colSpan={12}>
            <Center>
              <Text color={"gray"}>Tidak ada data</Text>
            </Center>
          </td>
        </tr>
      );
    }

    return data?.map((e, i) => (
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
          <Center c={"white"}>
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
          <Center c={"white"}>
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
        <td>
          <Stack>
            {e.Voting_DaftarNamaVote.map((v) => (
              <Box key={v.id}>
                <Text c={AccentColor.white}>- {v.value}</Text>
              </Box>
            ))}
          </Stack>
        </td>

        <td>
          <Center c={AccentColor.white}>
            {new Intl.DateTimeFormat("id-ID", {
              dateStyle: "long",
            }).format(new Date(e?.awalVote))}
          </Center>
        </td>
        <td>
          <Center c={AccentColor.white}>
            {new Intl.DateTimeFormat("id-ID", {
              dateStyle: "long",
            }).format(new Date(e?.akhirVote))}
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
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

        {!data ? (
          <CustomSkeleton height={"80vh"} width="100%" />
        ) : _.isEmpty(data) ? (
          <ComponentAdminGlobal_IsEmptyData />
        ) : (
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
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </ScrollArea>

            <Center mt={"xl"}>
              <Pagination
                value={isActivePage}
                total={nPage}
                onChange={(val) => {
                  onPageClick(val);
                }}
              />
            </Center>
          </Paper>
        )}
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
              loading={isLoading}
              loaderPosition="center"
              radius={"xl"}
              onClick={() => {
                onReject();
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
