"use client";

import { MODEL_INVESTASI } from "@/app_modules/investasi/_lib/interface";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";
import mqtt_client from "@/util/mqtt_client";
import {
  Button,
  Group,
  SimpleGrid,
  Stack
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Admin_ComponentModalReport } from "../../_admin_global/_component";
import { ComponentAdminGlobal_NotifikasiBerhasil } from "../../_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "../../_admin_global/admin_notifikasi/notifikasi_gagal";
import { ComponentAdminGlobal_NotifikasiPeringatan } from "../../_admin_global/admin_notifikasi/notifikasi_peringatan";
import AdminGlobal_ComponentBackButton from "../../_admin_global/back_button";
import adminNotifikasi_funCreateToUser from "../../notifikasi/fun/create/fun_create_notif_user";
import { ComponentAdminInvestasi_DetailDataAuthor } from "../_component/detail_data_author";
import { ComponentAdminInvestasi_DetailData } from "../_component/detail_data_investasi";
import { ComponentAdminInvestasi_DetailGambar } from "../_component/detail_gambar_investasi";
import { ComponentAdminInvestasi_UIDetailFile } from "../_component/ui_detail_file";
import { adminInvestasi_funEditStatusPublishById } from "../fun/edit/fun_status_publish_by_id";
import Admin_funRejectInvestasi from "../fun/fun_reject_investasi";

export default function AdminInvestasi_DetailReview({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [data, setData] = useState(dataInvestasi);
  const [publish, setPublish] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isLoadingPublish, setIsLoadingPublish] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);
  const [report, setReport] = useState("");

  useShallowEffect(() => {
    cekStatusPublish();
  }, []);

  async function cekStatusPublish() {
    if (data.MasterStatusInvestasi.id === "3") setPublish(false);
  }

  async function onReject() {
    const body = {
      id: data.id,
      catatan: report,
      status: "4",
    };
    if (_.isEmpty(body.catatan))
      return ComponentAdminGlobal_NotifikasiPeringatan("Lengkapi alasan");

    const res = await Admin_funRejectInvestasi(body);
    if (res.status === 200) {
      setIsLoadingReject(true);

      const dataNotif = {
        appId: res.data?.id,
        userId: res.data?.authorId,
        pesan: res.data?.title,
        status: res.data?.MasterStatusInvestasi?.name,
        kategoriApp: "INVESTASI",
        title: "Investasi anda di tolak !",
      };

      const notif = await adminNotifikasi_funCreateToUser({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({ userId: res?.data?.authorId, count: 1 })
        );
      }

      const loadData = await getOneInvestasiById(data.id);
      setData(loadData as any);

      ComponentAdminGlobal_NotifikasiBerhasil(res.message);
      router.back();
      setOpenModal(false);
      setIsLoadingReject(false);
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
      setOpenModal(false);
    }
  }

  async function onPublish() {
    const res = await adminInvestasi_funEditStatusPublishById({
      investasiId: data.id,
      statusId: "1",
      progesInvestasiId: "1",
    });
    if (res.status === 200) {
      const dataNotif = {
        appId: res.data?.id,
        userId: res.data?.authorId as any,
        pesan: res.data?.title as any,
        status: res.data?.MasterStatusInvestasi?.name as any,
        kategoriApp: "INVESTASI",
        title: "Investasi publish",
      };

      const notif = await adminNotifikasi_funCreateToUser({
        data: dataNotif as any,
      });

      if (notif.status === 201) {
        mqtt_client.publish(
          "USER",
          JSON.stringify({ userId: res?.data?.authorId, count: 1 })
        );

        mqtt_client.publish(
          "Beranda_Investasi",
          JSON.stringify({ update: true })
        );

        const loadData = await getOneInvestasiById(data.id);
        setData(loadData as any);

        ComponentAdminGlobal_NotifikasiBerhasil("Proyek Investasi Di Publish");
        router.back();
        // router.push(RouterAdminInvestasi_OLD.table_status_review);
      }
    } else {
      ComponentAdminGlobal_NotifikasiGagal(res.message);
    }
  }

  return (
    <>
      <Stack px={"lg"}>
        <Group position="apart">
          <AdminGlobal_ComponentBackButton />

          {data.masterStatusInvestasiId === "2" ? (
            <Group>
              <Button
                loaderPosition="center"
                loading={isLoadingPublish}
                radius={"xl"}
                color="green"
                onClick={() => onPublish()}
              >
                Publish
              </Button>
              <Button
                radius={"xl"}
                color="red"
                onClick={() => setOpenModal(true)}
              >
                Reject
              </Button>
            </Group>
          ) : (
            ""
          )}
        </Group>

        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {/* Data Author */}
          <ComponentAdminInvestasi_DetailDataAuthor data={data.author} />

          {/* Data Foto */}
          <ComponentAdminInvestasi_DetailGambar imagesId={data.imageId} />

          {/* Data Detail */}
          <ComponentAdminInvestasi_DetailData data={data} />
        </SimpleGrid>

        <ComponentAdminInvestasi_UIDetailFile
          title={data.title}
          dataProspektus={data.ProspektusInvestasi}
          listDokumen={data.DokumenInvestasi}
          prospektusFileId={data.prospektusFileId}
        />
      </Stack>

      <Admin_ComponentModalReport
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Alasan Penolakan"
        onHandlerChange={(val) => setReport(val.target.value)}
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
        buttonKanan={
          <Button
            loaderPosition="center"
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

      {/* <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Alasan Penolakan"
        size={"sm"}
        centered
        withCloseButton={false}
      >
        <Stack>
          <Textarea
            autosize
            minRows={3}
            maxRows={5}
            placeholder="Masukan alasan penolakan"
            onChange={(val) => setReport(val.target.value)}
          />
          <Group position="right"></Group>
        </Stack>
      </Modal> */}
    </>
  );
}
