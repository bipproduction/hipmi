"use client";

import {
  AccentColor,
  AdminColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import Admin_DetailButton from "@/app_modules/admin/_admin_global/_component/button/detail_button";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import ComponentAdminGlobal_IsEmptyData from "@/app_modules/admin/_admin_global/is_empty_data";
import { Admin_V3_ComponentPaginationBreakpoint } from "@/app_modules/admin/_components_v3/comp_pagination_breakpoint";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import { RouterAdminVote } from "@/lib/router_admin/router_admin_vote";
import { clientLogger } from "@/util/clientLogger";
import {
  Button,
  Center,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
              <ComponentAdminGlobal_IsEmptyData />
            </Center>
          </td>
        </tr>
      );
    }

    return data?.map((e, i) => (
      <tr key={i}>
        {/* <td>
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
        </td> */}
        {/* <td>
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
        </td> */}
        <td>
          <Text w={100} c={AccentColor.white}>
            {e?.Author?.username}
          </Text>
        </td>
        <td>
          <Text w={150} c={AccentColor.white} lineClamp={1}>
            {e?.title}
          </Text>
        </td>
        {/* <td>
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
        </td> */}
        {/* <td>
          <Stack>
            {e.Voting_DaftarNamaVote.map((v) => (
              <Box key={v.id}>
                <Text c={AccentColor.white}>- {v.value}</Text>
              </Box>
            ))}
          </Stack>
        </td> */}

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

        <td>
          <Center>
            <Admin_DetailButton path={RouterAdminVote.detail({ id: e.id })} />
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
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} shadow="lg" h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table verticalSpacing={"md"} horizontalSpacing={"md"} p={"md"}>
                <thead>
                  <tr>
                    <th>
                      <Text c={AccentColor.white}>Author</Text>
                    </th>
                    <th>
                      <Text c={AccentColor.white}>Judul</Text>
                    </th>

                    <th>
                      <Center c={AccentColor.white}>Mulai Vote</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Selesai Vote</Center>
                    </th>
                    <th>
                      <Center c={AccentColor.white}>Aksi</Center>
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </ScrollArea>

            <Admin_V3_ComponentPaginationBreakpoint
              value={isActivePage}
              total={nPage}
              onChange={(val) => {
                onPageClick(val);
              }}
            />
          </Paper>
        )}
      </Stack>

      <Modal
        styles={{ body: { backgroundColor: AdminColor.softBlue } }}
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size={"md"}
      >
        <Stack>
          <Textarea
            styles={{ label: { color: AdminColor.white } }}
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
