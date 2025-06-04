"use client";

import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { apiNewGetUserIdByToken } from "@/app_modules/_global/lib/api_fetch_global";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { clientLogger } from "@/util/clientLogger";
import mqtt_client from "@/util/mqtt_client";
import { Button, Radio, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { toNumber } from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetMasterReportForum } from "../../component/api_fetch_forum";
import { forum_funCreateReportPosting } from "../../fun/create/fun_create_report_posting";
import forum_getOneKategoriById from "../../fun/get/get_one_kategori_by_id";
import { MODEL_FORUM_MASTER_REPORT } from "../../model/interface";

export default function Forum_ReportPosting() {
  const param = useParams<{ id: string }>();
  const postingId = param.id;
  const [listReport, setListReport] = useState<
    MODEL_FORUM_MASTER_REPORT[] | null
  >(null);
  const [reportValue, setReportValue] = useState("1");
  const [userLoginId, setUserLoginId] = useState<string | null>(null);

  useShallowEffect(() => {
    handleGetUserLoginId();
  }, []);

  async function handleGetUserLoginId() {
    try {
      const response = await apiNewGetUserIdByToken();
      if (response.success) {
        setUserLoginId(response.userId);
      } else {
        setUserLoginId(null);
      }
    } catch (error) {
      setUserLoginId(null);
    }
  }

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

  if (!listReport || !userLoginId)
    return <CustomSkeleton height={400} width={"100%"} />;

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
          onChange={(val: any) => {
            setReportValue(val);
          }}
        >
          <Stack spacing={"xl"}>
            {listReport.map((e) => (
              <Stack key={e?.id.toString()}>
                <Radio
                  value={e.id.toString()}
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
          postingId={postingId}
          userLoginId={userLoginId}
        />
      </Stack>
    </>
  );
}

function ButtonAction({
  kategoriId,
  postingId,
  userLoginId,
}: {
  kategoriId: number;
  postingId: string;
  userLoginId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLain, setIsLoadingLain] = useState(false);

  async function onReport() {
    try {
      setIsLoading(true);

      const report = await forum_funCreateReportPosting({
        postingId: postingId,
        kategoriId: kategoriId,
      });
      if (report.status === 201) {
        const getKategori = await forum_getOneKategoriById({
          kategoriId: toNumber(kategoriId),
        });
        // console.log(getKategori);

        ComponentGlobal_NotifikasiBerhasil(report.message, 2000);
        router.back();

        const dataNotif = {
          appId: postingId,
          pesan: getKategori?.deskripsi,
          kategoriApp: "FORUM",
          title: getKategori?.title,
          userId: userLoginId,
          status: "Report Posting",
        };

        const createNotifikasi = await notifikasiToAdmin_funCreate({
          data: dataNotif as any,
        });

        if (createNotifikasi.status === 201) {
          mqtt_client.publish("ADMIN", JSON.stringify({ count: 1 }));
        }
      } else {
        setIsLoading(false);
        ComponentGlobal_NotifikasiGagal(report.message);
      }
    } catch (error) {
      clientLogger.error("Error Report Posting", error);
      setIsLoading(false);
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
            router.replace(RouterForum.report_posting_lainnya + postingId);
          }}
        >
          Lainnya
        </Button>
        <Button
          radius={"xl"}
          color="orange"
          loaderPosition="center"
          loading={isLoading ? true : false}
          onClick={() => onReport()}
        >
          Report
        </Button>
      </Stack>
    </>
  );
}
