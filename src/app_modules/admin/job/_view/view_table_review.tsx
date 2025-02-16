import { RouterAdminGlobal } from "@/lib";
import {
  gs_adminJob_triggerReview,
  IRealtimeData,
} from "@/lib/global_state";
import { ComponentGlobal_InputCountDown } from "@/app_modules/_global/component";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import {
  Center,
  Spoiler,
  Button,
  Stack,
  Modal,
  Textarea,
  Group,
  TextInput,
  Paper,
  ScrollArea,
  Table,
  Pagination,
  Text,
  Affix,
  rem,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconPhotoCheck,
  IconEyeShare,
  IconBan,
  IconSearch,
  IconRefresh,
  IconCircleCheck,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { ComponentAdminGlobal_TitlePage } from "../../_admin_global/_component";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import { AdminJob_funEditCatatanById } from "../fun/edit/fun_edit_catatan_by_id";
import { AdminJob_funEditStatusPublishById } from "../fun/edit/fun_edit_status_publish_by_id";
import adminJob_getListReview from "../fun/get/get_list_review";
import { useAtom } from "jotai";
import { AccentColor } from "@/app_modules/_global/color";
import { AdminColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import { clientLogger } from "@/util/clientLogger";
import { apiGetAdminJobByStatus } from "../lib/api_fetch_admin_job";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";

export default function AdminJob_ViewTavleReview() {
  const router = useRouter();
  const [data, setData] = useState<MODEL_JOB[] | null>(null);
  const [nPage, setNPage] = useState<number>(1);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setSearch] = useState("");
  const [publish, setPublish] = useState(false);
  const [reject, setReject] = useState(false);
  const [jobId, setJobId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [catatan, setCatatan] = useState("");

  // Realtime
  const [isAdminJob_TriggerReview, setIsAdminJob_TriggerReview] = useAtom(
    gs_adminJob_triggerReview
  );
  const [isShowReload, setIsShowReload] = useState(false);

  useShallowEffect(() => {
    loadInitialData();
  }, [activePage, isSearch]);


  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminJobByStatus({
        name: "Review",
        page: `${activePage}`,
        search: isSearch
      })


      if (response?.success && response?.data.data) {
        setData(response.data.data);
        setNPage(response.data.nPage || 1);
      } else {
        console.error("Invliad data format recieved", response)
        setData([]);
      }
    } catch (error) {
      clientLogger.error("Error get data table publish", error);
      setData([]);
    }
  }
  async function onLoadData() {
    loadInitialData();
    setIsLoading(false);
    setIsShowReload(false);
    setIsAdminJob_TriggerReview(false);
  }

  const onSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    setActivePage(1);
  }

  const onPageClick = (page: number) => {
    setActivePage(page);
  }

  const renderTableBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <tr>
          <td colSpan={12}>
            <Center>
              <Text color="gray">Tidak ada data</Text>
            </Center>
          </td>
        </tr>
      )
    }
    return data.map((e, i) => (
      <tr key={i}>
        <td>
          <Center w={150}>
            <Text c={AdminColor.white}>{e?.Author?.username}</Text>
          </Center>
        </td>
        <td>
          <Spoiler
            c={AdminColor.white}
            w={200}
            maxHeight={50}
            hideLabel="sembunyikan"
            showLabel="tampilkan"
          >
            {e.title}
          </Spoiler>
        </td>
        <td>
          <Center w={200}>
            {e.imageId ? (
              <Button
                loaderPosition="center"
                loading={isLoading && jobId == e?.id}
                color="green"
                radius={"xl"}
                leftIcon={<IconPhotoCheck />}
                onClick={() => {
                  setJobId(e?.id);
                  setIsLoading(true);
                  router.push(RouterAdminGlobal.preview_image({ id: e.imageId }));
                }}
              >
                Lihat
              </Button>
            ) : (
              <Center w={150}>
                <Text c={AdminColor.white} fw={"bold"} fz={"xs"} fs={"italic"}>
                  Tidak ada poster
                </Text>
              </Center>
            )}
          </Center>
        </td>
        <td>
          <Spoiler
            style={{ color: AdminColor.white }}
            hideLabel="sembunyikan"
            w={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            <div dangerouslySetInnerHTML={{ __html: e.content }} />
          </Spoiler>
        </td>
        <td>
          <Spoiler
            style={{ color: AdminColor.white }}
            hideLabel="sembunyikan"
            w={400}
            maxHeight={50}
            showLabel="tampilkan"
          >
            <div dangerouslySetInnerHTML={{ __html: e.deskripsi }} />
          </Spoiler>
        </td>
        <td>
          <Stack>
            <Stack align="center">
              <Button
                color={"green"}
                leftIcon={<IconCircleCheck />}
                radius={"xl"}
                onClick={() => {
                  setJobId(e?.id);
                  setPublish(true);
                }

                }
              >
                Publish
              </Button>
              <Button
                color={"red"}
                leftIcon={<IconBan />}
                radius={"xl"}
                onClick={() => {
                  setReject(true);
                  setJobId(e.id);
                }}
              >
                Reject
              </Button>
            </Stack>
          </Stack>
        </td>
      </tr>
    ));
  }


  return (
    <>
      <Modal
        title={"Apakah anda yakin ingin mempublish job ini?"}
        withCloseButton={false}
        opened={publish}
        onClose={() => {
          setPublish(false);
        }}
        size={"sm"}
        centered
      >
        <Stack>
          <Group position="center">
            <Button radius={"xl"} onClick={() => setPublish(false)}>
              Batal
            </Button>
            <Button
              style={{ transition: "0.5s", backgroundColor: MainColor.green }}
              radius={"xl"}
              onClick={() => {
                onPublish({
                  jobId: jobId,
                  onLoadData(val: any) {
                    setData(val.data);
                    setNPage(val.nPage);
                  },
                })
                setPublish(false);
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

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
              onChange={(val) => setCatatan(val.currentTarget.value)}
            />
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={catatan.length}
            />
          </Stack>
          <Group position="right">
            <Button radius={"xl"} onClick={() => setReject(false)}>
              Batal
            </Button>
            <Button
              style={{ transition: "0.5s", }}
              bg={MainColor.green}
              disabled={catatan === "" ? true : false}
              radius={"xl"}
              onClick={() => {
                onReject({
                  jobId: jobId,
                  catatan: catatan,
                  onLoadData(val) {
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
          <CustomSkeleton height={"80vh"} width={"100%"} />
        ) : (
          <Paper p={"md"} bg={AdminColor.softBlue} h={"80vh"}>
            {isShowReload && (
              <Paper bg={"red"} w={"50%"}>
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
              </Paper>
            )}

            <ScrollArea w={"100%"} h={"90%"}>
              <Table
                verticalSpacing={"md"}
                horizontalSpacing={"md"}
                p={"md"}
                w={"100%"}
                h={"100%"}

              >
                <thead>
                  <tr>
                    <th>
                      <Center c={AdminColor.white}>Author</Center>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Judul</Text>
                    </th>
                    <th>
                      <Center c={AdminColor.white}>Poster</Center>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Syarat Ketentuan</Text>
                    </th>
                    <th>
                      <Text c={AdminColor.white}>Deskripsi</Text>
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
                total={nPage}
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

async function onPublish({
  jobId,
  onLoadData,
}: {
  jobId: string;
  onLoadData: (val: any) => void;
}) {
  const publish = await AdminJob_funEditStatusPublishById(jobId);
  if (publish.status === 200) {
    const loadData = await adminJob_getListReview({ page: 1 });
    onLoadData(loadData);

    const dataNotifikasi: IRealtimeData = {
      appId: publish.data?.id as any,
      status: publish.data?.MasterStatus?.name as any,
      userId: publish.data?.authorId as any,
      pesan: publish.data?.title as any,
      kategoriApp: "JOB",
      title: "Job publish",
    };

    const createNotifikasi = await adminNotifikasi_funCreateToUser({
      data: dataNotifikasi as any,
    });

    if (createNotifikasi.status === 201) {
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

    ComponentGlobal_NotifikasiBerhasil(publish.message);
  } else {
    ComponentGlobal_NotifikasiGagal(publish.message);
  }
}

async function onReject({
  jobId,
  catatan,
  onLoadData,
}: {
  jobId: string;
  catatan: string;
  onLoadData: (val: any) => void;
}) {
  const reject = await AdminJob_funEditCatatanById(jobId, catatan);

  if (reject.status === 200) {
    const loadData = await adminJob_getListReview({ page: 1 });
    onLoadData(loadData);

    ComponentGlobal_NotifikasiBerhasil(reject.message);
    const dataNotifikasi: IRealtimeData = {
      appId: reject.data?.id as any,
      status: reject.data?.MasterStatus?.name as any,
      userId: reject.data?.authorId as any,
      pesan: reject.data?.title as any,
      kategoriApp: "JOB",
      title: "Job reject",
    };

    const createRejectNotifikasi = await adminNotifikasi_funCreateToUser({
      data: dataNotifikasi as any,
    });

    if (createRejectNotifikasi.status === 201) {
      WibuRealtime.setData({
        type: "notification",
        pushNotificationTo: "USER",
        dataMessage: dataNotifikasi,
      });
    }
  } else {
    ComponentGlobal_NotifikasiGagal(reject.message);
  }
}
