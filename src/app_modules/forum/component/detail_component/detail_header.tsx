"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_LoaderAvatar } from "@/app_modules/_global/component";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Drawer,
  Grid,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDots,
  IconEdit,
  IconFlag3,
  IconSquareCheck,
  IconSquareRoundedX,
  IconTrash,
} from "@tabler/icons-react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { forum_funDeletePostingById } from "../../fun/delete/fun_delete_posting_by_id";
import { forum_funEditStatusPostingById } from "../../fun/edit/fun_edit_status_posting_by_id";
import { MODEL_FORUM_POSTING } from "../../model/interface";

export default function ComponentForum_DetailHeader({
  data,
  userLoginId,
  onLoadData,
}: {
  data?: MODEL_FORUM_POSTING;
  userLoginId: string;
  onLoadData: (val: any) => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Stack spacing={"xs"}>
        <Grid>
          <Grid.Col
            span={"content"}
            onClick={() => {
              if (data?.Author?.id) {
                setIsLoading(true);
                router.push(RouterForum.forumku + data?.Author?.id);
              } else {
                ComponentGlobal_NotifikasiPeringatan("Id tidak ditemukan");
              }
            }}
          >
            {isLoading ? (
              <Avatar
                size={40}
                radius={"100%"}
                style={{
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
              >
                <ComponentGlobal_Loader variant="dots" />
              </Avatar>
            ) : (
              <ComponentGlobal_LoaderAvatar
                fileId={data?.Author.Profile?.imageId as any}
              />
            )}
          </Grid.Col>

          <Grid.Col span={"auto"}>
            <Stack spacing={3}>
              <Text lineClamp={1} fz={"sm"} fw={"bold"} color="white">
                {data?.Author.Profile.name
                  ? data?.Author.Profile.name
                  : "Nama author "}
              </Text>
              <Badge
                w={70}
                variant="outline"
                color={
                  (data?.ForumMaster_StatusPosting.id as any) === 1
                    ? "green"
                    : "red"
                }
              >
                <Text fz={10}>{data?.ForumMaster_StatusPosting.status}</Text>
              </Badge>
            </Stack>
          </Grid.Col>

          <Grid.Col span={"content"}>
            <ComponentForum_DetailButtonMore_V2
              postingId={data?.id}
              authorId={data?.Author.id}
              userLoginId={userLoginId}
              statusId={data?.ForumMaster_StatusPosting.id}
              dataPosting={data}
              onLoadData={(val) => {
                onLoadData(val);
              }}
            />
          </Grid.Col>
        </Grid>
        {/* {isPembatas ? <Divider /> : ""} */}
      </Stack>
    </>
  );
}

function ComponentForum_DetailButtonMore_V2({
  authorId,
  postingId,
  statusId,
  userLoginId,
  dataPosting,
  onLoadData,
}: {
  authorId: any;
  postingId?: any;
  statusId: any;
  userLoginId: any;
  dataPosting: any;
  onLoadData: (val: any) => void;
}) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [openDel, setOpenDel] = useState(false);
  const [openStatusClose, setOpenStatusClose] = useState(false);

  // loading
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  return (
    <>
      <Drawer
        styles={{
          content: {
            padding: 0,
            position: "absolute",
            margin: "auto",
            backgroundColor: "transparent",
            left: 0,
            right: 0,
            width: 500,
          },
          body: {
            backgroundColor: AccentColor.darkblue,
            borderTop: `2px solid ${AccentColor.blue}`,
            borderRight: `1px solid ${AccentColor.blue}`,
            borderLeft: `1px solid ${AccentColor.blue}`,
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            paddingBottom: "5%",
          },
        }}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ opacity: 0.1, blur: 1 }}
        position="bottom"
        size={"auto"}
      >
        <Stack>
          {userLoginId != authorId ? (
            <Grid
              onClick={() => {
                setLoadingReport(true);
                router.push(RouterForum.report_posting + postingId);
              }}
            >
              <Grid.Col span={"content"}>
                <IconFlag3 color={loadingReport ? "gray" : "white"} />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Group>
                  <Text c={loadingReport ? "gray" : "white"}>
                    Laporkan posting
                  </Text>{" "}
                  {loadingReport ? <Loader size={"sm"} /> : ""}
                </Group>
              </Grid.Col>
            </Grid>
          ) : (
            <Stack>
              <Grid
                onClick={() => {
                  setLoadingEdit(true);
                  router.push(RouterForum.edit_posting + postingId);
                }}
              >
                <Grid.Col span={"content"}>
                  <IconEdit color={loadingEdit ? "gray" : "white"} />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Group>
                    <Text c={loadingEdit ? "gray" : "white"}>Edit posting</Text>{" "}
                    {loadingEdit ? <Loader size={"sm"} /> : ""}
                  </Group>
                </Grid.Col>
              </Grid>

              <Grid
                onClick={() => {
                  close();
                  setOpenStatusClose(true);
                }}
              >
                <Grid.Col span={"content"}>
                  {statusId === 1 ? (
                    <IconSquareRoundedX color="orange" />
                  ) : (
                    <IconSquareCheck color="white" />
                  )}
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  {statusId === 1 ? (
                    <Text c={"orange"}>Tutup forum</Text>
                  ) : (
                    <Text c={"white"}>Buka forum</Text>
                  )}
                </Grid.Col>
              </Grid>

              <Grid
                onClick={() => {
                  close();
                  setOpenDel(true);
                }}
              >
                <Grid.Col span={"content"}>
                  <IconTrash color="red" />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Text c={"red"}>Hapus</Text>
                </Grid.Col>
              </Grid>
            </Stack>
          )}

          <Button
            bg={MainColor.yellow}
            color={"yellow"}
            style={{
              border: `1px solid ${AccentColor.yellow}`,
            }}
            radius={"xl"}
            onClick={close}
            c={"black"}
          >
            Batal
          </Button>
        </Stack>
      </Drawer>

      <Modal
        styles={{
          content: {
            backgroundColor: MainColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
          },
        }}
        opened={openDel}
        onClose={() => {
          setOpenDel(false);
        }}
        centered
        withCloseButton={false}
      >
        <ButtonDelete postingId={postingId} setOpenDel={setOpenDel} />
      </Modal>

      <Modal
        styles={{
          content: {
            backgroundColor: MainColor.darkblue,
            border: `1px solid ${AccentColor.blue}`,
          },
        }}
        opened={openStatusClose}
        onClose={() => setOpenStatusClose(false)}
        centered
        withCloseButton={false}
      >
        <ButtonStatus
          postingId={postingId}
          setOpenStatus={setOpenStatusClose}
          statusId={statusId}
          dataPosting={dataPosting}
          onLoadData={(val) => {
            onLoadData(val);
          }}
        />
      </Modal>

      <ActionIcon c="white" variant="transparent" onClick={() => open()}>
        <IconDots size={20} />
      </ActionIcon>
    </>
  );
}

function ButtonDelete({
  postingId,
  setOpenDel,
}: {
  postingId?: string;
  setOpenDel: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    try {
      setLoading(true);
      const responseDelete = await forum_funDeletePostingById(postingId as any);
      if (responseDelete.status === 200) {
        setOpenDel(false);
        router.back();

        ComponentGlobal_NotifikasiBerhasil(`Postingan Terhapus`, 2000);

        // mqtt_client.publish(
        //   "Forum_detail_hapus_data",
        //   JSON.stringify({
        //     id: postingId,
        //   })
        // );
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(responseDelete.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error get data forum", error);
    }
  }
  return (
    <>
      <Stack>
        <Title order={6} color="white">
          Yakin menghapus posting ini ?
        </Title>
        <Group position="center">
          <Button radius={"xl"} onClick={() => setOpenDel(false)}>
            Batal
          </Button>
          <Button
            loaderPosition="center"
            loading={loading ? true : false}
            color="red"
            radius={"xl"}
            onClick={() => {
              onDelete();
            }}
          >
            Hapus
          </Button>
        </Group>
      </Stack>
    </>
  );
}

function ButtonStatus({
  postingId,
  setOpenStatus,
  statusId,
  dataPosting,
  onLoadData,
}: {
  postingId?: string;
  setOpenStatus: any;
  statusId?: any;
  dataPosting: any;
  onLoadData: (val: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function onTutupForum() {
    try {
      setLoading(true);
      const closeForum = await forum_funEditStatusPostingById(
        postingId as any,
        2
      );

      if (closeForum.status === 200) {
        setOpenStatus(false);
        ComponentGlobal_NotifikasiBerhasil(`Forum Ditutup`, 2000);

        const cloneData = _.clone(dataPosting);
        const updateData = {
          ...cloneData,
          ForumMaster_StatusPosting: {
            id: 2,
            status: "Close",
          },
        };

        onLoadData(updateData);

        mqtt_client.publish(
          "Forum_detail_ganti_status",
          JSON.stringify({
            id: postingId,
            data: updateData.ForumMaster_StatusPosting,
          })
        );
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(closeForum.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error get data forum", error);
    }
  }

  async function onBukaForum() {
    setLoading(true);

    try {
      const openForum = await forum_funEditStatusPostingById(
        postingId as any,
        1
      );
      if (openForum.status === 200) {
        setOpenStatus(false);
        ComponentGlobal_NotifikasiBerhasil(`Forum Dibuka`, 2000);

        const cloneData = _.clone(dataPosting);
        const updateData = {
          ...cloneData,
          ForumMaster_StatusPosting: {
            id: 1,
            status: "Open",
          },
        };

        onLoadData(updateData);

        mqtt_client.publish(
          "Forum_detail_ganti_status",
          JSON.stringify({
            id: postingId,
            data: updateData.ForumMaster_StatusPosting,
          })
        );
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(openForum.message);
      }
    } catch (error) {
      setLoading(false);
      clientLogger.error("Error get data forum", error);
    }
  }

  return (
    <>
      <Stack>
        {statusId === 1 ? (
          <Title color="white" order={6}>
            Yakin menutup forum ini ?
          </Title>
        ) : (
          <Title color="white" order={6}>
            Yakin membuka forum ini ?
          </Title>
        )}
        <Group position="center">
          <Button radius={"xl"} onClick={() => setOpenStatus(false)}>
            Batal
          </Button>

          {statusId === 1 ? (
            <Button
              loaderPosition="center"
              loading={loading ? true : false}
              color="orange"
              radius={"xl"}
              onClick={() => {
                onTutupForum();
              }}
            >
              Tutup
            </Button>
          ) : (
            <Button
              loaderPosition="center"
              loading={loading ? true : false}
              color="green"
              radius={"xl"}
              onClick={() => {
                onBukaForum();
              }}
            >
              Buka
            </Button>
          )}
        </Group>
      </Stack>
    </>
  );
}
