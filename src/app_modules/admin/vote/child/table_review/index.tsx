"use client";

import ComponentAdminGlobal_HeaderTamplate from "@/app_modules/admin/_admin_global/header_tamplate";
import { MODEL_VOTING } from "@/app_modules/vote/model/interface";
import {
  Affix,
  Box,
  Button,
  Center,
  Group,
  Modal,
  Pagination,
  Paper,
  rem,
  ScrollArea,
  Spoiler,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import {
  IconBan,
  IconCircleCheck,
  IconRefresh,
  IconSearch,
} from "@tabler/icons-react";

import {
  gs_adminVoting_triggerReview,
  IRealtimeData,
} from "@/app/lib/global_state";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import mqtt_client from "@/util/mqtt_client";
import { useAtom } from "jotai";
import moment from "moment";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { adminVote_funGetListReview } from "../../fun";
import { AdminVote_funEditStatusPublishById } from "../../fun/edit/fun_edit_status_publish_by_id";
import { AdminEvent_funEditCatatanById } from "../../fun/edit/fun_edit_status_reject_by_id";
import { ComponentAdminGlobal_TitlePage } from "@/app_modules/admin/_admin_global/_component";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";

export default function AdminVote_TableReview({
  listVote,
}: {
  listVote: MODEL_VOTING[];
}) {
  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Voting" />
        <TableStatus listData={listVote} />
      </Stack>
    </>
  );
}

function TableStatus({ listData }: { listData: any }) {
  const [openedReject, { open: openReject, close: closeReject }] = useDisclosure(false);
  const [openedPublish, { open: openPublish, close: closePublish }] = useDisclosure(false);
  const [data, setData] = useState<MODEL_VOTING[]>(listData.data);
  const [isNPage, setNPage] = useState(listData.nPage);
  const [votingId, setVotingId] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isLoadingPublish, setLoadingPublish] = useState(false);
  const [isSaveLoading, setSaveLoading] = useState(false);

  const [isActivePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");

  // Realtine
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminVoting_TriggerReview, setIsAdminVoting_TriggerReview] = useAtom(
    gs_adminVoting_triggerReview
  );
  const [isShowReload, setIsShowReload] = useState(false);

  useShallowEffect(() => {
    if (isAdminVoting_TriggerReview) {
      setIsShowReload(true);
    }
  }, [isAdminVoting_TriggerReview, setIsShowReload]);

  async function onLoadData() {
    const loadData = await adminVote_funGetListReview({ page: 1 });

    setData(loadData.data as any);
    setNPage(loadData.nPage);
    setIsLoading(false);
    setIsShowReload(false);
    setIsAdminVoting_TriggerReview(false);
  }

  async function onSearch(s: string) {
    setSearch(s);
    const loadData = await adminVote_funGetListReview({
      page: 1,
      search: s,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  async function onPageClick(p: any) {
    setActivePage(p);
    const loadData = await adminVote_funGetListReview({
      search: isSearch,
      page: p,
    });
    setData(loadData.data as any);
    setNPage(loadData.nPage);
  }

  const TableRows = data.map((e, i) => (
    <tr key={i}>
      <td>
        <Center c={AccentColor.white}>{e?.Author?.username}</Center>
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

      <td>
        <Stack align="center">
          <Button
            // loaderPosition="center"
            // loading={
            //   e?.id === votingId ? (isLoadingPublish ? true : false) : false
            // }
            w={120}
            color={"green"}
            leftIcon={<IconCircleCheck />}
            radius={"xl"}
            onClick={() => {
              openPublish();
              setVotingId(e.id);
            }
              // onPublish({
              //   // voteId: e.id,
              //   // awalVote: e.awalVote,
              //   // setLoadingPublish: setLoadingPublish,
              //   // setVotingId: setVotingId,
              // //   setData(val) {
              // //     setData(val.data);
              // //     setNPage(val.nPage);
              // //   },
              // })
            }
          >
            Publish
          </Button>
          <Button
            w={120}
            color={"red"}
            leftIcon={<IconBan />}
            radius={"xl"}
            onClick={() => {
              openReject();
              setVotingId(e.id);
            }}
          >
            Reject
          </Button>
        </Stack>
      </td>
    </tr>
  ));

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
        {/* <pre>{JSON.stringify(listUser, null, 2)}</pre> */}
        <ComponentAdminGlobal_TitlePage
          name="Review"
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
          bg={"orange.4"}
          p={"xs"}
          style={{ borderRadius: "6px" }}
        >
          <Title order={4}>Review</Title>
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
          {isShowReload && (
            <Affix position={{ top: rem(200) }} w={"100%"}>
              <Center>
                <Button
                  style={{
                    transition: "0.5s",
                    border: `1px solid ${AccentColor.skyblue}`,
                  }}
                  bg={AccentColor.blue}
                  loaderPosition="center"
                  loading={isLoading}
                  radius={"xl"}
                  opacity={0.8}
                  onClick={() => onLoadData()}
                  leftIcon={<IconRefresh />}
                >
                  Update Data
                </Button>
              </Center>
            </Affix>
          )}

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
                    <Center c={AccentColor.white}>Username</Center>
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

                  <th>
                    <Center c={AccentColor.white}>Aksi</Center>
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
        opened={openedReject}
        onClose={closeReject}
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
            onChange={(val) => {
              setCatatan(val.target.value);
            }}
          />
          <Group position="right">
            <Button radius={"xl"} onClick={() => closeReject()}>
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={isSaveLoading ? true : false}
              radius={"xl"}
              onClick={() => {
                onReject({
                  catatan: catatan,
                  voteId: votingId,
                  setData(val) {
                    setData(val.data);
                    setNPage(val.nPage);
                  },
                  close: () => {
                    closeReject();
                  },
                  setSaveLoading(val) {
                    setSaveLoading(val);
                  },
                });
              }}
              style={{ 
                backgroundColor: MainColor.green
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Modal
        opened={openedPublish}
        onClose={closePublish}
        centered
        withCloseButton={false}
        size={"md"}
      >
        <Stack align="center">
          <Title order={5}>Apakah anda yakin ingin mempublish vote ini?</Title>
          <Group position="center">
            <Button radius={"xl"} onClick={() => closePublish()}>
              Batal
            </Button>
            <Button
              loaderPosition="center"
              loading={isLoadingPublish ? true : false}
              radius={"xl"}
              onClick={() => {
                onPublish({
                  awalVote: data[0].awalVote,
                  voteId: votingId,
                  setData(val) {
                    setData(val.data);
                    setNPage(val.nPage);
                  },
                  close: () => {
                    closePublish();
                  },
                  setLoadingPublish: (val) => {
                    setLoadingPublish(val);
                  },
                  setVotingId: (val) => {
                    setVotingId(val);
                  },
                });
              }}
              style={{
                backgroundColor: MainColor.green,
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

async function onPublish({
  close,
  voteId,
  setData,
  awalVote,
  setLoadingPublish,
  setVotingId,
}: {
  close: any,
  voteId: string;
  setData: (val: { data: any[]; nPage: number }) => void;
  awalVote: Date;
  setLoadingPublish: (val: boolean) => void;
  setVotingId: (val: string) => void;
}) {
  const hariIni = new Date();
  const cekHari = moment(awalVote).diff(hariIni, "days");

  if (cekHari < 0)
    return ComponentGlobal_NotifikasiPeringatan("Tanggal Voting Lewat");

  setVotingId(voteId);
  const res = await AdminVote_funEditStatusPublishById(voteId);
  if (res.status === 200) {
    setLoadingPublish(true);

    const dataNotifikasi: IRealtimeData = {
      appId: res.data?.id as string,
      status: res.data?.Voting_Status?.name as any,
      userId: res.data?.authorId as any,
      pesan: res.data?.title as any,
      kategoriApp: "VOTING",
      title: "Voting publish",
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

      WibuRealtime.setData({
        type: "trigger",
        pushNotificationTo: "USER",
        dataMessage: dataNotifikasi,
      });
    }
    const loadData = await adminVote_funGetListReview({ page: 1 });
    setData({
      data: loadData.data,
      nPage: loadData.nPage,
    });

    ComponentGlobal_NotifikasiBerhasil(res.message);
    setLoadingPublish(false);
  } else {
    ComponentGlobal_NotifikasiGagal(res.message);
  }
}

async function onReject({
  voteId,
  catatan,
  close,
  setSaveLoading,
  setData,
}: {
  voteId: string;
  catatan: string;
  close: any;
  setSaveLoading: (val: boolean) => void;
  setData: (val: { data: any[]; nPage: number }) => void;
}) {
  const data = {
    id: voteId,
    catatan: catatan,
  };

  const res = await AdminEvent_funEditCatatanById(data as any);
  if (res.status === 200) {
    setSaveLoading(true);
    // const dataNotif = {
    //   appId: res.data?.id,
    //   status: res.data?.Voting_Status?.name as any,
    //   userId: res.data?.authorId as any,
    //   pesan: res.data?.title as any,
    //   kategoriApp: "VOTING",
    //   title: "Voting anda di tolak !",
    // };

    const dataNotifikasi: IRealtimeData = {
      appId: res.data?.id as string,
      status: res.data?.Voting_Status?.name as any,
      userId: res.data?.authorId as any,
      pesan: res.data?.title as any,
      kategoriApp: "VOTING",
      title: "Voting anda di tolak !",
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

    const loadData = await adminVote_funGetListReview({ page: 1 });
    setData({
      data: loadData.data,
      nPage: loadData.nPage,
    });
    setSaveLoading(false);
    ComponentGlobal_NotifikasiBerhasil(res.message);
    close();
  } else {
    ComponentGlobal_NotifikasiGagal(res.message);
  }
}