"use client";

import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { apiGetDataEventByStatus } from "@/app_modules/admin/event/_lib/api_fecth_admin_event";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { RouterAdminEvent } from "@/lib/router_admin/router_admin_event";
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
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import Admin_DetailButton from "../../_admin_global/_component/button/detail_button";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { AdminEvent_funEditCatatanById } from "../fun/edit/fun_edit_status_reject_by_id";

export default function AdminEvent_TableReject() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />
        <TableStatus />
      </Stack>
    </>
  );
}

function TableStatus() {
  const router = useRouter();
  const [data, setData] = useState<MODEL_EVENT[] | null>(null);
  const [isNPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  const [opened, { open, close }] = useDisclosure(false);
  const [eventId, setEventId] = useState("");
  const [catatan, setCatatan] = useState("");

  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetDataEventByStatus({
          name: "Reject",
          page: `${activePage}`,
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

    loadInitialData();
  }, [activePage, isSearch]);

  const onSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  };

  const onPageClick = (page: number) => {
    setActivePage(page);
  };

  async function onUpdate(eventId: string, catatan: string) {
    const body = {
      id: eventId,
      catatan: catatan,
    };
    const res = await AdminEvent_funEditCatatanById(body as any, "4");
    if (res.status === 200) {
      try {
        const response = await apiGetDataEventByStatus({
          name: "Reject",
          page: `${activePage}`,
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
      ComponentGlobal_NotifikasiBerhasil(res.message);
      close();
    } else {
      ComponentGlobal_NotifikasiGagal(res.message);
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

    return data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center c={AdminColor.white}>
            <Box w={100}>
              <Text lineClamp={1}>{e?.Author?.username}</Text>
            </Box>
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white}>
            <Box w={100}>
              <Text lineClamp={2}>{e.title}</Text>
            </Box>
          </Center>
        </td>

        <td>
          <Center c={AdminColor.white}>
            <Text align="center">
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "full",
              }).format(new Date(e?.tanggal))}
              ,{" "}
              <Text span inherit>
                {new Intl.DateTimeFormat("id-ID", {
                  timeStyle: "short",
                }).format(new Date(e?.tanggal))}
              </Text>
            </Text>
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white}>
            <Text align="center">
              {new Intl.DateTimeFormat("id-ID", {
                dateStyle: "full",
              }).format(new Date(e?.tanggalSelesai))}
              ,{" "}
              <Text span inherit>
                {new Intl.DateTimeFormat("id-ID", {
                  timeStyle: "short",
                }).format(new Date(e?.tanggalSelesai))}
              </Text>
            </Text>
          </Center>
        </td>

        {/* <td>
          <Center c={AdminColor.white} w={500}>
            <Spoiler
              hideLabel="sembunyikan"
              maxHeight={50}
              showLabel="tampilkan"
            >
              {e.deskripsi}
            </Spoiler>
          </Center>
        </td>
        <td>
          {" "}
          <Center c={AdminColor.white} w={400}>
            <Spoiler
              hideLabel="sembunyikan"
              maxHeight={50}
              showLabel="tampilkan"
            >
              {e.catatan}
            </Spoiler>
          </Center>
        </td> */}

        <td>
          {/* <Button
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
          </Button> */}
          <Center>
            <Admin_DetailButton
              path={RouterAdminEvent.new_detail({ id: e.id })}
            />
          </Center>{" "}
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
              disabled={!data}
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
          <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table verticalSpacing={"md"} horizontalSpacing={"md"} p={"md"}>
                <thead>
                  <tr>
                    <th>
                      <Center c={AdminColor.white}>Username</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Judul</Center>
                    </th>

                    <th>
                      <Center c={AdminColor.white}>
                        Tanggal & Waktu Mulai
                      </Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>
                        Tanggal & Waktu Selesai
                      </Center>
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
                total={isNPage}
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
