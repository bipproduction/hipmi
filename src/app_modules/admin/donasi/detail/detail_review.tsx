"use client";

import { MainColor } from "@/app_modules/_global/color";
import ComponentGlobal_InputCountDown from "@/app_modules/_global/component/input_countdown";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { donasi_checkStatus } from "@/app_modules/donasi/fun";
import { MODEL_DONASI } from "@/app_modules/donasi/model/interface";
import { IRealtimeData } from "@/lib/global_state";
import { clientLogger } from "@/util/clientLogger";
import { Button, Group, SimpleGrid, Stack } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { Admin_ComponentModalReport } from "../../_admin_global/_component";
import Admin_ComponentModalPublish from "../../_admin_global/_component/comp_admin_modal_publish";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import Admin_ComponentBackButton from "../../_admin_global/back_button";
import adminNotifikasi_funCreateToAllUser from "../../notifikasi/fun/create/fun_create_notif_to_all_user";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";

import ComponentAdminDonasi_CeritaPenggalangDana from "../component/tampilan_detail_cerita";
import ComponentAdminDonasi_TampilanDetailDonasi from "../component/tampilan_detail_donasi";
import { AdminDonasi_getOneById } from "../fun/get/get_one_by_id";
import { AdminDonasi_funUpdateStatusPublish } from "../fun/update/fun_status_publish";
import { AdminDonasi_funUpdateStatusReject } from "../fun/update/fun_status_reject";
import { apiGetAdminDonasiById } from "../lib/api_fetch_admin_donasi";
import SkeletonAdminDetailDonasiReview from "../component/skeleton_detail_donasi_review";

export default function AdminDonasi_DetailReview() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_DONASI | null>(null);

  useShallowEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await apiGetAdminDonasiById({
          id: params.id,
        })

        if (response?.success && response?.data) {
          setData(response.data);
        } else {
          console.error("Invalid data format recieved:", response);
          setData(null);
        }
      } catch (error) {
        clientLogger.error("Invalid data format recieved:", error);
        setData(null);
      }
    }
    loadInitialData();
  })
  return (
    <>
      <Stack>
        {!data ? (
          <SkeletonAdminDetailDonasiReview  />
        ) : (
          <>
            <ButtonOnHeader donasi={data} setData={setData} />
            <SimpleGrid
              cols={2}
              spacing="lg"
              breakpoints={[
                { maxWidth: "md", cols: 2, spacing: "md" },
                { maxWidth: "sm", cols: 1, spacing: "sm" },
                { maxWidth: "xs", cols: 1, spacing: "xs" },
              ]}
            >
              <ComponentAdminDonasi_TampilanDetailDonasi donasi={data} />
              <ComponentAdminDonasi_CeritaPenggalangDana
                cerita={data.CeritaDonasi}
              />
            </SimpleGrid>
          </>
        )}
      </Stack >
    </>
  );
}

function ButtonOnHeader({
  donasi,
  setData,
}: {
  donasi: MODEL_DONASI;
  setData: any;
}) {
  const router = useRouter();
  const [isLoadingPublish, setLoadingPublish] = useState(false);
  const [isLoadingReject, setLoadingReject] = useState(false);
  const [openedPublish, { open: openPublish, close: closePublish }] = useDisclosure(false);
  const [openedReject, { open: openReject, close: closeReject }] = useDisclosure(false);
  const [catatan, setCatatan] = useState("");

  async function onPublish() {
    try {
      setLoadingPublish(true);
      const checkStatus = await donasi_checkStatus({ id: donasi.id });

      if (checkStatus) {
        const res = await AdminDonasi_funUpdateStatusPublish(donasi.id, "1");
        if (res.status === 200) {
          // ===== TO CREATEOR ====== //
          const notifikasiToCreator: IRealtimeData = {
            appId: res.data?.id as string,
            status: res.data?.DonasiMaster_Status?.name as any,
            userId: res.data?.authorId as any,
            pesan: res.data?.title as any,
            kategoriApp: "DONASI",
            title: "Donasi publish",
          };

          const notif = await adminNotifikasi_funCreateToUser({
            data: notifikasiToCreator as any,
          });

          if (notif.status === 201) {
            WibuRealtime.setData({
              type: "notification",
              pushNotificationTo: "USER",
              dataMessage: notifikasiToCreator,
            });

            WibuRealtime.setData({
              type: "trigger",
              pushNotificationTo: "USER",
              dataMessage: notifikasiToCreator,
            });
          }

          // ===== TO CREATEOR ====== //

          // TO ALL USER
          const notificationToAll = await adminNotifikasi_funCreateToAllUser({
            data: res.data as any,
            authorId: donasi.authorId,
          });

          if (notificationToAll.status === 201) {
            const dataUser = notificationToAll.data;
            for (let i of dataUser as any) {
              const dataNotifikasiToAll: IRealtimeData = {
                appId: res.data?.id as string,
                status: res.data?.DonasiMaster_Status?.name as any,
                userId: i.id as any,
                pesan: res.data?.title as any,
                kategoriApp: "DONASI",
                title: "Donasi baru terpublish",
              };


              WibuRealtime.setData({
                type: "notification",
                pushNotificationTo: "USER",
                dataMessage: dataNotifikasiToAll,
              });
            }
          }

          const newData = await AdminDonasi_getOneById(donasi?.id);
          setData(newData);
          // router.back()
          ComponentAdminGlobal_NotifikasiBerhasil(
            "Berhasil Mengubah Status Donasi"
          );
        } else {
          setLoadingPublish(false);
          ComponentAdminGlobal_NotifikasiPeringatan(
            "Gagal Mengubah Status Donasi"
          );
        }
      } else {
        setLoadingPublish(false);
        ComponentGlobal_NotifikasiPeringatan("Status donasi telah diubah user");
      }
    } catch (error) {
      setLoadingPublish(false);
      clientLogger.error("Error to published donasi", error);
    }
  }

  async function onReject() {
    if (catatan === "")
      return ComponentAdminGlobal_NotifikasiPeringatan(
        "Lengkapi Alasan Penolakan"
      );

    const checkStatus = await donasi_checkStatus({ id: donasi.id });

    if (checkStatus) {
      const res = await AdminDonasi_funUpdateStatusReject(
        donasi.id,
        "4",
        catatan
      );
      if (res.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as string,
          status: res.data?.DonasiMaster_Status?.name as any,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          kategoriApp: "DONASI",
          title: "Donasi anda di tolak !",
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

          const newData = await AdminDonasi_getOneById(donasi?.id);
          setData(newData);
          close();
          ComponentAdminGlobal_NotifikasiBerhasil(res.message);
          setLoadingReject(true);
        }
      } else {
        ComponentAdminGlobal_NotifikasiGagal(res.message);
      }
    } else {
      ComponentGlobal_NotifikasiPeringatan("Status donasi telah diubah user");
    }
  }

  return (
    <>
      <Group position="apart">
        <Admin_ComponentBackButton />
        {donasi.donasiMaster_StatusDonasiId === "2" ? (
          <Group>
            <Button
              loaderPosition="center"
              radius={"xl"}
              bg={"green"}
              color="green"
              onClick={openPublish}
            >
              Publish
            </Button>
            <Button radius={"xl"} bg={"red"} color="red" onClick={openReject}>
              Reject
            </Button>
          </Group>
        ) : (
          ""
        )}
      </Group>
      {/* <Divider /> */}

      <Admin_ComponentModalReport
        opened={openedReject}
        onClose={closeReject}
        title={"Alasan penolakan"}
        onHandlerChange={(val: any) => setCatatan(val.target.value)}
        buttonKiri={
          <>
            <Button
              radius={"xl"}
              onClick={() => {
                closeReject();
              }}
            >
              Batal
            </Button>
          </>
        }
        buttonKanan={
          <>
            <Button
              bg={MainColor.green}
              loaderPosition="center"
              loading={isLoadingReject ? true : false}
              radius={"xl"}
              onClick={() => {
                onReject();
              }}
            >
              Simpan
            </Button>
          </>
        }
        cekInputKarakter={
          <>
            <ComponentGlobal_InputCountDown
              maxInput={300}
              lengthInput={catatan.length}
            />
          </>
        }
      />
      <Admin_ComponentModalPublish
        opened={openedPublish}
        onClose={closePublish}
        title={"Anda yakin ingin publish donasi ini?"}
        buttonKiri={
          <>
            <Button
              radius={"xl"}
              onClick={() => {
                closePublish();
              }}
            >
              Batal
            </Button>
          </>
        }
        buttonKanan={
          <>
            <Button
              bg={MainColor.green}
              loaderPosition="center"
              loading={isLoadingPublish ? true : false}
              radius={"xl"}
              onClick={() => {
                onPublish();
              }}
            >
              Simpan
            </Button>
          </>
        }
      />





      {/* <Modal
        opened={opened}
        onClose={close}
        centered
        size={"lg"}
        withCloseButton={false}
      >
        <Stack>
          <Textarea
            autosize
            minRows={3}
            maxRows={5}
            maxLength={300}
            label="Alasan penolakan"
            placeholder="Masukan alasan penolakan"
            onChange={(val) => setCatatan(val.target.value)}
          />
          <ComponentGlobal_InputCountDown
            maxInput={300}
            lengthInput={catatan.length}
          />

          <Group position="right"></Group>
        </Stack>
      </Modal> */}
    </>
  );
}
