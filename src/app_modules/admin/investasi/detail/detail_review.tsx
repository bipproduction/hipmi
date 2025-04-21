"use client";

import { MainColor } from "@/app_modules/_global/color";
import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import { IRealtimeData } from "@/lib/global_state";
import { clientLogger } from "@/util/clientLogger";
import { Button, Group, SimpleGrid, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import { Admin_ComponentModalReport } from "../../_admin_global/_component";
import Admin_ComponentModalPublish from "../../_admin_global/_component/comp_admin_modal_publish";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import { ComponentAdminInvestasi_DetailDataAuthor } from "../_component/detail_data_author";
import { ComponentAdminInvestasi_DetailData } from "../_component/detail_data_investasi";
import { ComponentAdminInvestasi_DetailGambar } from "../_component/detail_gambar_investasi";
import SkeletonAdminInvestasi from "../_component/skeleton_admin_investasi";
import { ComponentAdminInvestasi_UIDetailFile } from "../_component/ui_detail_file";
import { apiGetAdminInvestasiById } from "../_lib/api_fetch_admin_investasi";
import { adminInvestasi_funEditStatusPublishById } from "../fun/edit/fun_status_publish_by_id";
import Admin_funRejectInvestasi from "../fun/fun_reject_investasi";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { AdminInvestasi_ViewDetailData } from "../_view";
import { Admin_V3_ComponentBreakpoint } from "../../_components_v3/comp_simple_grid_breakpoint";
import { Admin_V3_ComponentSkeletonBreakpoint } from "../../_components_v3/comp_skeleton_breakpoint";
import { AdminInvestasi_ComponentNewDetailData } from "../_component/new_detail_data";

export default function AdminInvestasi_DetailReview() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<MODEL_INVESTASI | null>(null);
  const [publish, setPublish] = useState(true);
  const [openModalPublish, setOpenModalPublish] = useState(false);
  const [openModalReject, setOpenModalReject] = useState(false);
  const [isLoadingPublish, setIsLoadingPublish] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);
  const [report, setReport] = useState("");
  const investasiId = params;

  useShallowEffect(() => {
    cekStatusPublish();
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const response = await apiGetAdminInvestasiById({
        id: params.id,
      });

      if (response?.success && response?.data) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Invalid data format recieved:", error);
      setData(null);
    }
  };

  async function cekStatusPublish() {
    if (data?.MasterStatusInvestasi.id === "3") setPublish(false);
  }

  async function onReject() {
    const body = {
      id: data?.id,
      catatan: report,
      status: "4",
    };
    if (_.isEmpty(body.catatan))
      return ComponentAdminGlobal_NotifikasiPeringatan("Lengkapi alasan");

    try {
      setIsLoadingReject(true);
      const res = await Admin_funRejectInvestasi(body);
      if (res.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as string,
          userId: res.data?.authorId as string,
          pesan: res.data?.title as string,
          status: res.data?.MasterStatusInvestasi?.name as any,
          kategoriApp: "INVESTASI",
          title: "Investasi anda di tolak !",
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

        ComponentAdminGlobal_NotifikasiBerhasil(res.message);
        router.back();
        setOpenModalReject(false);
        setIsLoadingReject(false);
      } else {
        ComponentAdminGlobal_NotifikasiGagal(res.message);
        setOpenModalReject(false);
        setIsLoadingReject(false);
      }
    } catch (error) {
      console.log(error);
      setOpenModalReject(false);
      setIsLoadingReject(false);
    }
  }

  async function onPublish() {
    try {
      setIsLoadingPublish(true);
      const res = await adminInvestasi_funEditStatusPublishById({
        investasiId: data?.id as any,
        statusId: "1",
        progesInvestasiId: "1",
      });
      if (res.status === 200) {
        const dataNotifikasi: IRealtimeData = {
          appId: res.data?.id as string,
          userId: res.data?.authorId as any,
          pesan: res.data?.title as any,
          status: res.data?.MasterStatusInvestasi?.name as any,
          kategoriApp: "INVESTASI",
          title: "Investasi publish",
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

          ComponentAdminGlobal_NotifikasiBerhasil(
            "Proyek Investasi Di Publish"
          );
          setOpenModalPublish(false);
          setIsLoadingPublish(false);
          router.back();
          // router.push(RouterAdminInvestasi_OLD.table_status_review);
        }
      } else {
        ComponentAdminGlobal_NotifikasiGagal(res.message);
        setOpenModalPublish(false);
        setIsLoadingPublish(false);
      }
    } catch (error) {
      console.log(error);
      setOpenModalPublish(false);
      setIsLoadingPublish(false);
    }
  }

  return (
    <>
      <Stack>
        <ComponentAdminGlobal_HeaderTamplate name="Investasi: Review" />
        <Group position="apart">
          <AdminGlobal_ComponentBackButton />

          {data?.masterStatusInvestasiId === "2" ? (
            <Group>
              <Button
                radius={"xl"}
                color="green"
                onClick={() => setOpenModalPublish(true)}
              >
                Publish
              </Button>
              <Button
                radius={"xl"}
                color="red"
                onClick={() => setOpenModalReject(true)}
              >
                Reject
              </Button>
            </Group>
          ) : (
            ""
          )}
        </Group>

        {/* <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          <ComponentAdminInvestasi_DetailDataAuthor
            data={data?.author as any}
          />

          <ComponentAdminInvestasi_DetailGambar imagesId={data?.imageId} />

          <ComponentAdminInvestasi_DetailData data={data} />
        </SimpleGrid> */}

        {!data ? (
          <Admin_V3_ComponentSkeletonBreakpoint />
        ) : (
          <Admin_V3_ComponentBreakpoint md={2} lg={2}>
            <AdminInvestasi_ComponentNewDetailData data={data as any} />
            {/* Data Foto */}
            <Admin_V3_ComponentBreakpoint cols={1}>
              <ComponentAdminInvestasi_DetailGambar imagesId={data?.imageId} />
              <ComponentAdminInvestasi_UIDetailFile
                title={data?.title}
                dataProspektus={data?.ProspektusInvestasi}
                listDokumen={data?.DokumenInvestasi}
                prospektusFileId={data?.prospektusFileId}
              />
            </Admin_V3_ComponentBreakpoint>
          </Admin_V3_ComponentBreakpoint>
        )}
      </Stack>

      <Admin_ComponentModalReport
        opened={openModalReject}
        onClose={() => setOpenModalReject(false)}
        title="Alasan Penolakan"
        onHandlerChange={(val) => setReport(val.target.value)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModalReject(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            style={{ backgroundColor: MainColor.green }}
            loading={isLoadingReject}
            radius={"xl"}
            onClick={() => {
              onReject();
            }}
          >
            Simpan
          </Button>
        }
      />
      <Admin_ComponentModalPublish
        opened={openModalPublish}
        onClose={() => setOpenModalPublish(false)}
        title="Anda Yakin Ingin Mempublish Investasi Ini ?"
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModalPublish(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
            loading={isLoadingPublish}
            style={{ backgroundColor: MainColor.green }}
            radius={"xl"}
            onClick={() => {
              onPublish();
            }}
          >
            Simpan
          </Button>
        }
      />
    </>
  );
}
