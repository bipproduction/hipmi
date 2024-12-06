"use client";

import { RouterAdminEvent } from "@/app/lib/router_admin/router_admin_event";
import { MODEL_EVENT } from "@/app_modules/event/model/interface";
import {
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
  Title,
} from "@mantine/core";
import { IconCircleCheck, IconSearch } from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { adminEvent_funGetListPublish } from "../fun";
import QRCode from "react-qr-code";
import { useShallowEffect } from "@mantine/hooks";

export default function AdminEvent_TablePublish({
  listPublish,
}: {
  listPublish: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Event" />
        <TableStatus listPublish={listPublish} />
      </Stack>
    </>
  );
}

function TableStatus({ listPublish }: { listPublish: any }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_EVENT[]>(listPublish.data);
  const [isNPage, setNPage] = useState(listPublish.nPage);
  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);

  const [origin, setOrigin] = useState("");

  useShallowEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window.location.origin);
      setOrigin(window.location.origin);
    }
  }, [setOrigin]);

  //  async function onLoadOrigin(setOrigin: any) {
  //    const res = await fetch("/api/origin-url");
  //    const result = await res.json();
  //    setOrigin(result.origin);
  //  }

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminEvent_funGetListPublish({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminEvent_funGetListPublish({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = _.isEmpty(data) ? (
    <tr>
      <td colSpan={12}>
        <Center>Belum Ada Data</Center>
      </td>
    </tr>
  ) : (
    data.map((e, i) => (
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
            <input
              type="button"
              value="Download QR"
              onClick={() => {
                const svg: any = document.getElementById(e.id);
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
                  downloadLink.download = `QRCode ${e.title}`;
                  downloadLink.href = `${pngFile}`;
                  downloadLink.click();
                };
                img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
              }}
            />
          </Center>
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
            loading={
              e.id === eventId ? (loading === true ? true : false) : false
            }
            color={"green"}
            leftIcon={<IconCircleCheck />}
            radius={"xl"}
            onClick={async () => {
              setEventId(e.id);
              setLoading(true);
              router.push(RouterAdminEvent.detail_peserta + e.id);
            }}
          >
            Lihat Peserta
          </Button>
        </td>
      </tr>
    ))
  );

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        <Group
          position="apart"
          bg={"green.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Publish</Title>
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
                    <Center>QR Code</Center>
                  </th>
                  <th>
                    <Center>Download QR</Center>
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
