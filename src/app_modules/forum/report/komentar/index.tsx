"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import mqtt_client from "@/util/mqtt_client";
import { Button, Radio, Stack, Text, Title } from "@mantine/core";
import { toNumber } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { forum_funCreateReportKomentar } from "../../fun/create/fun_create_report_komentar";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import forum_getOneKategoriById from "../../fun/get/get_one_kategori_by_id";
import { MODEL_FORUM_MASTER_REPORT } from "../../model/interface";

export default function Forum_ReportKomentar({
  komentarId,
  listReport,
  userLoginId,
}: {
  komentarId: string;
  listReport: MODEL_FORUM_MASTER_REPORT[];
  userLoginId: string;
}) {
  const [reportValue, setReportValue] = useState("1");

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

      setLoading(true);
      router.back();
      return ComponentGlobal_NotifikasiBerhasil(report.message, 2000);
    } else {
      ComponentGlobal_NotifikasiGagal(report.message);
    }
  }
  return (
    <>
      <Stack mt={"md"}>
        <Button
          loaderPosition="center"
          loading={isLoadingLain ? true : false}
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
          loading={loading ? true : false}
          onClick={() => onReport()}
        >
          Report
        </Button>
      </Stack>
    </>
  );
}
