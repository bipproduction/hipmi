"use client";

import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";
import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { clientLogger } from "@/util/clientLogger";
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
import { useShallowEffect } from "@mantine/hooks";
import { IconCircleCheck, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { apiGetAdminEventRiwayat } from "@/app/dev/admin/event/_lib/api_fecth_admin_event";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminEvent_Riwayat() {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event: Riwayat" />
        <DetailRiwayat />
      </Stack>
    </>
  );
}

function DetailRiwayat() {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<MODEL_EVENT[] | null>(null);
  const [isNPage, setNPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetAdminEventRiwayat({
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
          <Center c={AdminColor.white} w={200}>
            <Text>{e?.Author?.username}</Text>
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white} w={200}>
            <Text lineClamp={2}>{e.title}</Text>
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white} w={200}>
            <Text>{e.lokasi}</Text>
          </Center>
        </td>
        <td>
          <Center c={AdminColor.white} w={200}>
            <Text>{e.EventMaster_TipeAcara.name}</Text>
          </Center>
        </td>

        <td>
          <Center c={AdminColor.white} w={200}>
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
          <Center c={AdminColor.white} w={200}>
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

        <td>
          <Center c={AdminColor.white} w={400}>
            <Spoiler
              hideLabel="sembunyikan"
              maxHeight={50}
              showLabel="tampilkan"
            >
              {e.deskripsi}
            </Spoiler>
          </Center>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={AdminColor.softBlue}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title c={AdminColor.white} order={4}>Riwayat</Title>
          <TextInput
            icon={<IconSearch size={20} />}
            radius={"xl"}
            placeholder="Masukan judul"
            onChange={(val) => {
              onSearch(val.currentTarget.value);
            }}
          />
        </Group>

        {!data ? (
          <CustomSkeleton height={"80vh"} width="100%" />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
            <ScrollArea w={"100%"} h={"90%"}>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={"100%"}
                
              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AdminColor.white}>Aksi</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Username</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Judul</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Lokasi</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Tipe Acara</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Tanggal & Waktu Mulai</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Tanggal & Waktu Selesai</Center>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Deskripsi</Center>
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
    </>
  );
}
