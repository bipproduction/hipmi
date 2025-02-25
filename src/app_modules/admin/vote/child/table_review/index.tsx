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
} from "@/lib/global_state";
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
import { clientLogger } from "@/util/clientLogger";
import { apiGetAdminVotingByStatus } from "../../lib/api_fetch_admin_voting";
import _ from "lodash";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import ComponentAdminGlobal_IsEmptyData from "@/app_modules/admin/_admin_global/is_empty_data";

export default function AdminVote_TableReview() {
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
  const [openedReject, { open: openReject, close: closeReject }] =
    useDisclosure(false);
  const [openedPublish, { open: openPublish, close: closePublish }] =
    useDisclosure(false);

  const [data, setData] = useState<MODEL_VOTING[] | null>(null);
  const [nPage, setNPage] = useState(1);
  const [dataId, setDataId] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState<Date>();
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

  useShallowEffect(() => {
    handleLoadData();
  }, [isActivePage, isSearch]);

  const handleLoadData = async () => {
    try {
      const response = await apiGetAdminVotingByStatus({
        name: "Review",
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
  
  async function onLoadData() {
    handleLoadData();
    setIsLoading(false);
    setIsShowReload(false);
    setIsAdminVoting_TriggerReview(false);
  }


  async function onReject() {
    const data = {
      id: dataId,
      catatan: catatan,
    };

    try {
      setSaveLoading(true);
      const res = await AdminEvent_funEditCatatanById(data as any);
      if (res.status === 200) {
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

        handleLoadData();
        ComponentGlobal_NotifikasiBerhasil(res.message);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      console.error("Error update voting admin", error);
    } finally {
      closeReject();
      setSaveLoading(false);
    }
  }

  async function onPublish() {
    const hariIni = new Date();
    const cekHari = moment(tanggalMulai).diff(hariIni, "days");

    if (cekHari < 0)
      return ComponentGlobal_NotifikasiPeringatan("Tanggal Voting Lewat");

    try {
      setLoadingPublish(true);
      const res = await AdminVote_funEditStatusPublishById(dataId);
      if (res.status === 200) {
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
        handleLoadData();
        ComponentGlobal_NotifikasiBerhasil(res.message);
        closePublish()
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      console.log("Error get data voting", error);
    } finally {
      setLoadingPublish(false);
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
          <Center c={AccentColor.white}>{e?.Author?.username}</Center>
        </td>
        <td>
          <Center c={AccentColor.white}>{e.title}</Center>
        </td>
        <td>
          <Center c={AccentColor.white}>
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

        <td>
          <Stack align="center">
            <Button
              w={120}
              color={"green"}
              leftIcon={<IconCircleCheck />}
              radius={"xl"}
              onClick={() => {
                openPublish();
                setDataId(e.id);
                setTanggalMulai(e.awalVote);
              }}
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
                setDataId(e.id);
              }}
            >
              Reject
            </Button>
          </Stack>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Stack spacing={"xs"} h={"100%"}>
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

        {!data ? (
          <CustomSkeleton height={"80vh"} width="100%" />
        ) : _.isEmpty(data) ? (
          <ComponentAdminGlobal_IsEmptyData />
        ) : (
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
                onReject();
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
                onPublish();
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
