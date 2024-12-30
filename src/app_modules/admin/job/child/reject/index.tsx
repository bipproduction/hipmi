"use client";

import { IRealtimeData } from "@/app/lib/global_state";
import { RouterAdminJob } from "@/app/lib/router_admin/router_admin_job";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
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
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconBan, IconPhotoCheck, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { AdminJob_funEditCatatanById } from "../../fun/edit/fun_edit_catatan_by_id";
import adminJob_getListReject from "../../fun/get/get_list_reject";

export default function AdminJob_TableReject({
  dataReject,
}: {
  dataReject: any;
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Job Vacancy" />
        <TableStatus listReject={dataReject} />
      </Stack>
    </>
  );
}

function TableStatus({ listReject }: { listReject: any }) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_JOB[]>(listReject.data);
  const [nPage, setNPage] = useState(listReject.nPage);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  const [reject, setReject] = useState(false);
  const [jobId, setJobId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [catatan, setCatatan] = useState("");

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminJob_getListReject({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
    setActivePage(1);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminJob_getListReject({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const rowTable = data?.map((e, i) => (
    <tr key={i}>
      <td>
        <Center w={150}>
          <Text>{e?.Author?.username}</Text>
        </Center>
      </td>
      <td>
        <Spoiler
          w={200}
          maxHeight={50}
          hideLabel="sembunyikan"
          showLabel="tampilkan"
        >
          {e.title}
        </Spoiler>
      </td>
      <td>
        <Center w={150}>
          {e.imageId ? (
            <Button
              loading={isLoading && e?.imageId === jobId}
              loaderPosition="center"
              color="green"
              radius={"xl"}
              leftIcon={<IconPhotoCheck />}
              onClick={() => {
                setJobId(e?.imageId);
                setIsLoading(true);
                router.push(RouterAdminJob.detail_poster + e?.imageId);
              }}
            >
              Lihat
            </Button>
          ) : (
            <Center w={150}>
              <Text fw={"bold"} fz={"xs"} fs={"italic"}>
                Tidak ada poster
              </Text>
            </Center>
          )}
        </Center>
      </td>
      <td>
        <Spoiler
          w={400}
          maxHeight={50}
          hideLabel="sembunyikan"
          showLabel="tampilkan"
        >
          <div dangerouslySetInnerHTML={{ __html: e.content }} />
        </Spoiler>
      </td>
      <td>
        <Spoiler
          hideLabel="sembunyikan"
          w={400}
          maxHeight={50}
          showLabel="tampilkan"
        >
          <div dangerouslySetInnerHTML={{ __html: e.deskripsi }} />
        </Spoiler>
      </td>
      <td>
        <Spoiler
          hideLabel="sembunyikan"
          w={400}
          maxHeight={50}
          showLabel="tampilkan"
        >
          {e.catatan}
        </Spoiler>
      </td>
      <td>
        <Button
          color={"red"}
          leftIcon={<IconBan />}
          radius={"xl"}
          onClick={() => {
            setReject(true);
            setJobId(e.id);
            setCatatan(e.catatan);
          }}
        >
          <Stack spacing={0}>
            <Text fz={10}>Tambah</Text>
            <Text fz={10}>Catatan</Text>
          </Stack>
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        opened={reject}
        onClose={() => {
          setReject(false);
        }}
        withCloseButton={false}
        size={"sm"}
        centered
      >
        <Stack>
          <Stack spacing={5}>
            <Textarea
              minRows={2}
              maxRows={5}
              maxLength={300}
              autosize
              label={<Text fw={"bold"}>Alasan Penolakan</Text>}
              placeholder="Masukkan alasan penolakan lowongan ini"
              value={catatan}
              onChange={(val) => setCatatan(val.currentTarget.value)}
            />
            <ComponentGlobal_InputCountDown
              lengthInput={catatan.length}
              maxInput={300}
            />
          </Stack>
          <Group position="right">
            <Button radius={"xl"} onClick={() => setReject(false)}>
              Batal
            </Button>
            <Button
              style={{
                transition: "0.5s",
              }}
              disabled={catatan === "" ? true : false}
              radius={"xl"}
              onClick={() => {
                onReject({
                  catatan: catatan,
                  jobId: jobId,
                  onSetData(val) {
                    setData(val.data);
                    setNPage(val.nPage);
                  },
                });
                setReject(false);
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Stack spacing={"xs"} h={"100%"}>
        <ComponentAdminGlobal_TitlePage
          name="Reject"
          color="red.4"
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

        <Paper p={"md"} withBorder shadow="lg" h={"80vh"}>
          <ScrollArea w={"100%"} h={"90%"}>
            <Table
              verticalSpacing={"md"}
              horizontalSpacing={"md"}
              p={"md"}
              w={"100%"}
              h={"100%"}
              striped
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <Center>Author</Center>
                  </th>
                  <th>
                    <Text>Judul</Text>
                  </th>
                  <th>
                    <Center>Poster</Center>
                  </th>
                  <th>
                    <Text>Syarat Ketentuan</Text>
                  </th>
                  <th>
                    <Text>Deskripsi</Text>
                  </th>
                  <th>
                    <Text>Report</Text>
                  </th>
                  <th>
                    <Center>Aksi</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rowTable}</tbody>
            </Table>
          </ScrollArea>
          <Center mt={"xl"}>
            <Pagination
              value={activePage}
              total={nPage}
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

async function onReject({
  jobId,
  catatan,
  onSetData,
}: {
  jobId: string;
  catatan: string;
  onSetData: (val: any) => void;
}) {
  const reject = await AdminJob_funEditCatatanById(jobId, catatan);
  if (reject.status === 200) {
    const loadData = await adminJob_getListReject({ page: 1 });
    onSetData(loadData);

    const dataNotifikasi: IRealtimeData = {
      appId: reject.data?.id as any,
      status: reject.data?.MasterStatus?.name as any,
      userId: reject.data?.authorId as any,
      pesan: reject.data?.title as any,
      kategoriApp: "JOB",
      title: "Report tambahan",
    };

    const notif = await adminNotifikasi_funCreateToUser({
      data: dataNotifikasi as any,
    });

    if (notif.status === 201) {
      WibuRealtime.setData({
        type: "notification",
        pushNotificationTo: "USER",
        dataMessage: dataNotifikasi,
      });
    }

    ComponentGlobal_NotifikasiBerhasil(reject.message);
  } else {
    ComponentGlobal_NotifikasiGagal(reject.message);
  }
}
