"use client";

import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { RouterForum } from "@/lib/router_hipmi/router_forum";
import mqtt_client from "@/util/mqtt_client";
import { Button, Radio, Stack, Text, Title } from "@mantine/core";
import { toNumber } from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { forum_funCreateReportKomentar } from "../../fun/create/fun_create_report_komentar";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { clientLogger } from "@/util/clientLogger";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetMasterReportForum } from "../../component/api_fetch_forum";
import forum_getOneKategoriById from "../../fun/get/get_one_kategori_by_id";
import { MODEL_FORUM_MASTER_REPORT } from "../../model/interface";

export default function Forum_ReportKomentar({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const param = useParams<{ id: string }>();
  const komentarId = param.id;
  const [listReport, setListReport] = useState<
    MODEL_FORUM_MASTER_REPORT[] | null
  >(null);
  const [reportValue, setReportValue] = useState("1");

  useShallowEffect(() => {
    handleLoadMasterReport();
  }, []);

  const handleLoadMasterReport = async () => {
    try {
      const response = await apiGetMasterReportForum();
      if (response.success) {
        setListReport(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get master report", error);
    }
  };

  if (!listReport) return <CustomSkeleton height={50} width={"100%"} />;

  return (
    <>
      <Stack
        mb={"md"}
        p={"sm"}
        bg={MainColor.darkblue}
        style={{
          border: `2px solid ${AccentColor.blue}`,
          borderRadius: "10px 10px 10px 10px",
        }}
      >
        <Radio.Group
          c={"white"}
          value={reportValue as any}
          onChange={(val) => {
            setReportValue(val);
          }}
        >
          <Stack spacing={"xl"}>
            {listReport.map((e) => (
              <Stack key={e?.id.toString()}>
                <Radio
                  value={e?.id.toString()}
                  label={
                    <Title c={"white"} order={5}>
                      {e.title}
                    </Title>
                  }
                />
                <Text>{e.deskripsi}</Text>
              </Stack>
            ))}
          </Stack>
        </Radio.Group>
        <ButtonAction
          kategoriId={toNumber(reportValue)}
          komentarId={komentarId}
          userLoginId={userLoginId}
        />
      </Stack>
    </>
  );
}

function ButtonAction({
  kategoriId,
  komentarId,
  userLoginId,
}: {
  kategoriId: number;
  komentarId: string;
  userLoginId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoadingLain, setIsLoadingLain] = useState(false);

  async function onReport() {
    try {
      setLoading(true);
      const report = await forum_funCreateReportKomentar({
        komentarId: komentarId,
        kategoriId: kategoriId,
      });

      if (report.status === 201) {
        const getKategori = await forum_getOneKategoriById({
          kategoriId: kategoriId,
        });
        // console.log(getKategori);
        const dataNotif = {
          appId: komentarId,
          pesan: getKategori?.deskripsi,
          kategoriApp: "FORUM",
          title: getKategori?.title,
          userId: userLoginId,
          status: "Report Komentar",
        };
        const createNotif = await notifikasiToAdmin_funCreate({
          data: dataNotif as any,
        });

        if (createNotif.status === 201) {
          mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));
        }

        router.back();
        return ComponentGlobal_NotifikasiBerhasil(report.message, 2000);
      } else {
        setLoading(false);
        ComponentGlobal_NotifikasiGagal(report.message);
      }
    } catch (error) {
      clientLogger.error("Error report komentar", error);
      setLoading(false);
    }
  }
  return (
    <>
      <Stack mt={"md"}>
        <Button
          loaderPosition="center"
          loading={isLoadingLain}
          radius={"xl"}
          onClick={() => {
            setIsLoadingLain(true);
            router.replace(RouterForum.report_komentar_lainnya + komentarId);
          }}
        >
          Lainnya
        </Button>
        <Button
          radius={"xl"}
          color="orange"
          loaderPosition="center"
          loading={loading}
          onClick={() => onReport()}
        >
          Report
        </Button>
      </Stack>
    </>
  );
}
