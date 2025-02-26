"use client";

import { apiGetDataEventByStatus } from "@/app_modules/admin/event/_lib/api_fecth_admin_event";
import { RouterAdminEvent } from "@/lib/router_admin/router_admin_event";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { clientLogger } from "@/util/clientLogger";
import {
  Button,
  Center,
  Pagination,
  Paper,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconEyeCheck, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QRCode from "react-qr-code";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminEvent_TablePublish() {
  return (
    <Stack>
      <ComponentAdminGlobal_HeaderTamplate name="Event" />
      <TableStatus />
    </Stack>
  );
}

function TableStatus() {
  const router = useRouter();
  const [data, setData] = useState<MODEL_EVENT[] | null>(null);
  const [isNPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState("");

  useShallowEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetDataEventByStatus({
          name: "Publish",
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

  const handleDownloadQR = (id: string, title: string) => {
    const svg: any = document.getElementById(id);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QRCode ${title}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
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
          <Center w={200}>
            <QRCode
              id={e.id}
              style={{ height: 70, width: 70 }}
              value={`${origin}/dev/event/konfirmasi/${e.id}`}
            />
          </Center>
        </td>
        <td>
          <Center w={200}>
            <Button onClick={() => handleDownloadQR(e.id, e.title)}>
              Download QR
            </Button>
          </Center>
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
            <Text>{e.EventMaster_TipeAcara?.name}</Text>
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

        <td>
          <Button
            loaderPosition="center"
            loading={loading && e.id === eventId}
            color="green"
            leftIcon={<IconEyeCheck size={20} />}
            radius="xl"
            onClick={() => {
              setEventId(e.id);
              setLoading(true);
              router.push(RouterAdminEvent.detail_publish + e.id);
            }}
          >
            Detail
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <Stack spacing="xs" h="100%">
      <ComponentAdminGlobal_TitlePage
        name="Publish"
        color={AdminColor.softBlue}
        component={
          <TextInput
            disabled={!data}
            icon={<IconSearch size={20} />}
            radius="xl"
            placeholder="Masukan judul"
            value={isSearch}
            onChange={(e) => onSearch(e.currentTarget.value)}
          />
        }
      />

      {!data ? (
        <CustomSkeleton height={"80vh"} width="100%" />
      ) : (
        <Paper p="md" bg={AdminColor.softBlue} h="80vh">
          <ScrollArea w="100%" h="90%">
            <Table
              verticalSpacing="md"
              horizontalSpacing="md"
              p="md"
              w={1500}
            >
              <thead>
                <tr>
                  <th>
                    <Center c={AdminColor.white}>QR Code</Center>
                  </th>
                  <th>
                    <Center c={AdminColor.white}>Download QR</Center>
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
                  <th>
                    <Center c={AdminColor.white}>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{renderTableBody()}</tbody>
            </Table>
          </ScrollArea>

          <Center mt="xl">
            <Pagination
              value={activePage}
              total={isNPage}
              onChange={onPageClick}
            />
          </Center>
        </Paper>
      )}
    </Stack>
  );
}
