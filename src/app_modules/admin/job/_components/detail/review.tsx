"use client";

import { MainColor } from "@/app_modules/_global/color";
import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_InputCountDown } from "@/app_modules/_global/component";
import {
  ComponentGlobal_NotifikasiBerhasil,
  ComponentGlobal_NotifikasiGagal,
} from "@/app_modules/_global/notif_global";
import { Admin_ComponentBoxStyle } from "@/app_modules/admin/_admin_global/_component/comp_admin_boxstyle";
import adminNotifikasi_funCreateToUser from "@/app_modules/admin/notifikasi/fun/create/fun_create_notif_user";
import { MODEL_JOB } from "@/app_modules/job/model/interface";
import { IRealtimeData } from "@/lib/global_state";
import {
  Button,
  Grid,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { IconBan, IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { AdminJob_funEditCatatanById } from "../../fun/edit/fun_edit_catatan_by_id";
import { AdminJob_funEditStatusPublishById } from "../../fun/edit/fun_edit_status_publish_by_id";
import { AdminJob_ComponentImageView } from "./image_view";
import { useRouter } from "next/navigation";
import { Admin_V3_ComponentBreakpoint } from "@/app_modules/admin/_components_v3/comp_simple_grid_breakpoint";
import { Admin_V3_ComponentDetail } from "@/app_modules/admin/_components_v3/comp_detail_data";

export function AdminJob_DetailReview({ data }: { data: MODEL_JOB }) {
  const router = useRouter();
  const [publish, setPublish] = useState(false);
  const [reject, setReject] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [isLoadingPublish, setLoadingPublish] = useState(false);
  const [isLoadingReject, setLoadingReject] = useState(false);

  const listData = [
    {
      title: "Username",
      value: data.Author.username,
    },
    {
      title: "Judul",
      value: data.title,
    },
    {
      title: "Konten",
      value: <div dangerouslySetInnerHTML={{ __html: data.content }} />,
    },
    {
      title: "Deskripsi",
      value: <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} />,
    },
  ];

  async function onPublish() {
    try {
      setLoadingPublish(true);
      const publish = await AdminJob_funEditStatusPublishById(data.id);
      if (publish.status === 200) {
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
        setPublish(false);
        ComponentGlobal_NotifikasiBerhasil(publish.message);

        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(publish.message);
      }
    } catch (error) {
      console.log("Error,", error);
    } finally {
      setLoadingPublish(false);
    }
  }

  async function onReject() {
    try {
      setLoadingReject(true);
      const reject = await AdminJob_funEditCatatanById(data.id, catatan);

      if (reject.status === 200) {
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
        setReject(false);
        router.back();
      } else {
        ComponentGlobal_NotifikasiGagal(reject.message);
      }
    } catch (error) {
      console.log("Error reject", error);
    } finally {
      setLoadingReject(false);
    }
  }

  return (
    <>
      <Admin_V3_ComponentBreakpoint>
        <Admin_ComponentBoxStyle>
          <Stack>
            {listData.map((item, index) => (
               <Admin_V3_ComponentDetail key={index} item={item}/>
            ))}
          </Stack>

          <Grid mt={"xl"}>
            <Grid.Col span={2}></Grid.Col>
            <Grid.Col span={1}></Grid.Col>
            <Grid.Col span={"auto"}>
              <Group spacing={"xl"}>
                <Button
                  color={"green"}
                  leftIcon={<IconCircleCheck />}
                  radius={"xl"}
                  onClick={() => {
                    setPublish(true);
                  }}
                >
                  Publish
                </Button>

                <Button
                  color={"red"}
                  leftIcon={<IconBan />}
                  radius={"xl"}
                  onClick={() => {
                    setReject(true);
                  }}
                >
                  Reject
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Admin_ComponentBoxStyle>

        {data.imageId && <AdminJob_ComponentImageView imageId={data.imageId} />}
      </Admin_V3_ComponentBreakpoint>

      {/* PUBLISH MODAL */}
      <Modal
        styles={{
          header: { backgroundColor: AdminColor.softBlue },
          body: { backgroundColor: AdminColor.softBlue },
          title: { color: AdminColor.white },
        }}
        title={"Apakah anda yakin ingin mem-publish job ini ?"}
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
              loading={isLoadingPublish}
              loaderPosition="center"
              style={{ transition: "0.5s", backgroundColor: MainColor.green }}
              radius={"xl"}
              onClick={() => {
                onPublish();
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* REJECT MODAL */}
      <Modal
        styles={{
          header: { backgroundColor: AdminColor.softBlue },
          body: { backgroundColor: AdminColor.softBlue },
          title: { color: AdminColor.white },
        }}
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
              minRows={3}
              maxRows={5}
              maxLength={300}
              autosize
              label={
                <Text c={AdminColor.white} fw={"bold"}>
                  Alasan Penolakan
                </Text>
              }
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
              loading={isLoadingReject}
              loaderPosition="center"
              style={{ transition: "0.5s" }}
              bg={MainColor.green}
              color="green"
              disabled={catatan === "" ? true : false}
              radius={"xl"}
              onClick={() => {
                onReject();
              }}
            >
              Simpan
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* <pre style={{ color: "white" }}>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}
