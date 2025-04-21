import { apiGetDataEventByStatus } from "@/app_modules/admin/event/_lib/api_fecth_admin_event";
import { gs_adminEvent_triggerReview, IRealtimeData } from "@/lib/global_state";
import { AccentColor } from "@/app_modules/_global/color";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
  ComponentGlobal_NotifikasiPeringatan,
} from "@/app_modules/_global/notif_global";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_EVENT } from "@/app_modules/event/_lib/interface";
import { event_checkStatus } from "@/app_modules/event/fun/get/fun_check_status_by_id";
import { clientLogger } from "@/util/clientLogger";
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
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import {
  IconBan,
  IconCircleCheck,
  IconRefresh,
  IconSearch,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import moment from "moment";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import { adminEvent_funGetListReview } from "../fun";
import { AdminEvent_funEditStatusPublishById } from "../fun/edit/fun_edit_status_publish_by_id";
import { AdminEvent_funEditCatatanById } from "../fun/edit/fun_edit_status_reject_by_id";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import Admin_DetailButton from "../../_admin_global/_component/button/detail_button";
import { RouterAdminEvent } from "@/lib/router_admin/router_admin_event";
import { Admin_V3_ComponentPaginationBreakpoint } from "../../_components_v3/comp_pagination_breakpoint";

export default function AdminEvent_ComponentTableReview() {
  const [data, setData] = useState<MODEL_EVENT[] | null>(null);
  const [isNPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [catatan, setCatatan] = useState("");
  const [eventId, setEventId] = useState("");

  // Realtime state
  const [isAdminTriggerReview, setIsAdminTriggerReview] = useAtom(
    gs_adminEvent_triggerReview
  );
  const [isShowReload, setIsShowReload] = useState(false);

  useShallowEffect(() => {
    loadInitialData();
  }, [activePage, isSearch]);

  const loadInitialData = async () => {
    try {
      const response = await apiGetDataEventByStatus({
        name: "Review",
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

  const onSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  };

  const onPageClick = (page: number) => {
    setActivePage(page);
  };

  async function onLoadData() {
    loadInitialData();
    setIsLoading(false);
    setIsShowReload(false);
    setIsAdminTriggerReview(false);
  }

  async function onPublish({
    eventId,
    tanggal,
  }: {
    eventId: string;
    tanggal: Date;
  }) {
    const checkStatus = await event_checkStatus({ id: eventId });

    if (checkStatus) {
      if (moment(tanggal).diff(Date.now(), "minutes") < 0)
        return ComponentGlobal_NotifikasiPeringatan(
          "Waktu acara telah lewat, Report untuk memberitahu user !"
        );

      const res = await AdminEvent_funEditStatusPublishById(eventId, "1");
      if (res.status === 200) {
        setIsLoading(true);
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as any,
          status: res.data?.EventMaster_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "EVENT",
          title: "Event publish",
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

        try {
          const response = await apiGetDataEventByStatus({
            name: "Review",
            page: `${activePage}`,
            search: isSearch,
          });

          if (response?.success && response?.data?.data) {
            setData(response.data.data);
            setNPage(response.data.nPage || 1);
          } else {
            setData([]);
          }
        } catch (error) {
          clientLogger.error("Error get data table publish", error);
          setData([]);
        }

        ComponentAdminGlobal_NotifikasiBerhasil("Berhasil update status");
      } else {
        setModal(false);
        setIsLoading(false);
        ComponentAdminGlobal_NotifikasiGagal(res.message);
      }
    } else {
      setModal(false);
      ComponentAdminGlobal_NotifikasiPeringatan(
        "Review di batalkan oleh user, reload halaman review !"
      );
    }
  }

  async function onReject(eventId: string, catatan: string) {
    if (catatan === "")
      return ComponentGlobal_NotifikasiPeringatan("Lengkapi Catatan");
    const body = {
      id: eventId,
      catatan: catatan,
    };

    const res = await AdminEvent_funEditCatatanById(body as any, "4");
    if (res.status === 200) {
      const dataNotifikasi: IRealtimeData = {
        appId: res.data?.id as any,
        status: res.data?.EventMaster_Status?.name as any,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        kategoriApp: "EVENT",
        title: "Event reject",
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

      try {
        const response = await apiGetDataEventByStatus({
          name: "Review",
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
              <Text>{e?.Author?.username}</Text>
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
          <Center>
            <Stack>
              <Button
                color={"green"}
                leftIcon={<IconCircleCheck />}
                radius={"xl"}
                onClick={() =>
                  onPublish({
                    eventId: e.id,
                    tanggal: e.tanggal,
                  })
                }
              >
                Publish
              </Button>
              <Button
                color={"red"}
                leftIcon={<IconBan />}
                radius={"xl"}
                onClick={async () => {
                  const checkStatus = await event_checkStatus({ id: e.id });

                  if (checkStatus) {
                    open();
                    setEventId(e.id);
                  } else {
                    ComponentAdminGlobal_NotifikasiPeringatan(
                      "Review di batalkan oleh user, muat kembali halaman ini !"
                    );
                  }
                }}
              >
                Reject
              </Button>
            </Stack>
          </Center>
        </td> */}

        <td>
          <Center>
            <Admin_DetailButton
              path={RouterAdminEvent.new_detail({ id: e.id })}
            />
          </Center>
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

              <Admin_V3_ComponentPaginationBreakpoint
                value={activePage}
                total={isNPage}
                onChange={(val) => {
                  onPageClick(val);
                }}
              />
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
            onChange={(val) => {
              setCatatan(val.target.value);
            }}
          />
          <Group position="right">
            <Button radius={"xl"} onClick={close}>
              Batal
            </Button>
            <Button
              radius={"xl"}
              onClick={() => {
                onReject(eventId, catatan);
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* <Modal
        opened={isModal}
        title="Anda Yakin Ingin Mempublish Event Ini?"
        onClose={() => setModal(false)}
        centered
        withCloseButton={false}
        size={"md"}
      >
        <Stack>
          <Group position="right">
            <Button radius={"xl"} onClick={close}>
              Batal
            </Button>
            <Button
              radius={"xl"}
              // onClick={() => {
              //   onPublish(eventId, tanggal);
              // }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal> */}
    </>
  );
}
