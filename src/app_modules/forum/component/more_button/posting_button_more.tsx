"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import {
  ActionIcon,
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { forum_funDeletePostingById } from "../../fun/delete/fun_delete_posting_by_id";
import { forum_funEditStatusPostingById } from "../../fun/edit/fun_edit_status_posting_by_id";
import { forum_getListAllPosting } from "../../fun/get/get_list_all_posting";
import { forum_getAllPostingByAuhtorId } from "../../fun/get/get_list_posting_by_author_id";

export default function ComponentForum_PostingButtonMore({
  authorId,
  postingId,
  statusId,
  userLoginId,
  setData,
}: {
  authorId: any;
  postingId?: any;
  statusId?: any;
  userLoginId: any;
  setData: any;
}) {
  const router = useRouter();

  // modal & drawer
  const [opened, { open, close }] = useDisclosure(false);
  const [openDel, setOpenDel] = useState(false);
  const [openStatusClose, setOpenStatusClose] = useState(false);

  // loading
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  //   if (loadingEdit) return <ComponentGlobal_V2_LoadingPage />;

  return (
    <>
      <Drawer
        // className={classes.radiusCustom}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ opacity: 0.1, blur: 1 }}
        position="bottom"
        size={"auto"}
      >
        <Stack>
          {userLoginId != authorId ? (
            ""
          ) : (
            <Stack>
              <Grid
                onClick={() => {
                  close();
                  setOpenStatusClose(true);
                }}
              >
                <Grid.Col span={"content"}>
                  {statusId === 1 ? (
                    <IconSquareRoundedX color="red" />
                  ) : (
                    <IconSquareCheck />
                  )}
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  {statusId === 1 ? (
                    <Text c={"red"}>Tutup forum</Text>
                  ) : (
                    <Text>Buka forum</Text>
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

              <Grid
                onClick={() => {
                  setLoadingEdit(true);
                  router.push(RouterForum.edit_posting + postingId);
                }}
              >
                <Grid.Col span={"content"}>
                  <IconEdit color={loadingEdit ? "gray" : "black"} />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Group>
                    <Text c={loadingEdit ? "gray" : "black"}>Edit posting</Text>{" "}
                    {loadingEdit ? <Loader size={"sm"} /> : ""}
                  </Group>
                </Grid.Col>
              </Grid>
            </Stack>
          )}

          {userLoginId == authorId ? (
            ""
          ) : (
            <Grid
              onClick={() => {
                setLoadingReport(true);
                router.push(RouterForum.report_posting + postingId);
              }}
            >
              <Grid.Col span={"content"}>
                <IconFlag3 color={loadingReport ? "gray" : "black"} />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Group>
                  <Text c={loadingReport ? "gray" : "black"}>
                    Laporkan posting
                  </Text>{" "}
                  {loadingReport ? <Loader size={"sm"} /> : ""}
                </Group>
              </Grid.Col>
            </Grid>
          )}

          <Button variant="outline" radius={"xl"} onClick={close}>
            Batal
          </Button>
        </Stack>
      </Drawer>

      <Modal
        opened={openDel}
        onClose={() => {
          setOpenDel(false);
        }}
        centered
        withCloseButton={false}
      >
        <ButtonDelete
          postingId={postingId}
          setOpenDel={setOpenDel}
          setData={setData}
        />
      </Modal>

      <Modal
        opened={openStatusClose}
        onClose={() => setOpenStatusClose(false)}
        centered
        withCloseButton={false}
      >
        <ButtonStatus
          postingId={postingId}
          setOpenStatus={setOpenStatusClose}
          statusId={statusId}
          setData={setData}
          userLoginId={userLoginId}
          authorId={authorId}
        />
      </Modal>

      <ActionIcon variant="transparent" onClick={() => open()}>
        <IconDots size={20} />
      </ActionIcon>
    </>
  );
}

function ButtonDelete({
  postingId,
  setOpenDel,
  setData,
}: {
  postingId?: string;
  setOpenDel: any;
  setData: any;
}) {
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    setOpenDel(false);
    await forum_funDeletePostingById(postingId as any).then(async (res) => {
      if (res.status === 200) {
        ComponentGlobal_NotifikasiBerhasil(`Postingan Terhapus`, 2000);
        setLoading(true);
        const listForum = await forum_getListAllPosting();
        setData(listForum);
      } else {
        ComponentGlobal_NotifikasiGagal(res.message);
      }
    });
  }
  return (
    <>
      <Stack>
        <Title order={6}>Yakin menghapus posting ini ?</Title>
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
  setData,
  userLoginId,
  authorId,
}: {
  postingId?: string;
  setOpenStatus: any;
  statusId?: any;
  setData: any;
  userLoginId: string;
  authorId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function onTutupForum() {
    setOpenStatus(false);

    await forum_funEditStatusPostingById(postingId as any, 2).then(
      async (res) => {
        if (res.status === 200) {
          if (userLoginId === authorId) {
            await forum_getAllPostingByAuhtorId({
              authorId: authorId,
              page: 1,
            }).then((val: any) => setData(val));
          } else {
            await forum_getListAllPosting().then((val) => setData(val as any));
          }
          ComponentGlobal_NotifikasiBerhasil(`Forum Ditutup`, 2000);
          setLoading(true);
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      }
    );
  }

  async function onBukaForum() {
    setOpenStatus(false);

    await forum_funEditStatusPostingById(postingId as any, 1).then(
      async (res) => {
        if (res.status === 200) {
          if (userLoginId === authorId) {
            await forum_getAllPostingByAuhtorId({
              authorId: authorId,
              page: 1,
            }).then((val: any) => setData(val));
          } else {
            await forum_getListAllPosting().then((val) => setData(val as any));
          }
          ComponentGlobal_NotifikasiBerhasil(`Forum Dibuka`, 2000);
          setLoading(true);
        } else {
          ComponentGlobal_NotifikasiGagal(res.message);
        }
      }
    );
  }

  return (
    <>
      <Stack>
        {statusId === 1 ? (
          <Title order={6}>Yakin menutup forum ini ?</Title>
        ) : (
          <Title order={6}>Yakin membuka forum ini ?</Title>
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
