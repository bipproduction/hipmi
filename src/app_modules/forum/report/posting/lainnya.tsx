"use client";

import { RouterForum } from "@/lib/router_hipmi/router_forum";
import { Button, Group, Stack, Textarea } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { forum_funCreateReportPosting } from "../../fun/create/fun_create_report_posting";
import { ComponentGlobal_NotifikasiBerhasil } from "@/app_modules/_global/notif_global/notifikasi_berhasil";
import { ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global/notifikasi_gagal";
import { forum_funCreateReportPostingLainnya } from "../../fun/create/fun_create_report_posting_lainnya";
import mqtt_client from "@/util/mqtt_client";
import notifikasiToAdmin_funCreate from "@/app_modules/notifikasi/fun/create/create_notif_to_admin";
import { clientLogger } from "@/util/clientLogger";

export default function Forum_ReportPostingLainnya({
  userLoginId,
}: {
  userLoginId: string;
}) {
  const param = useParams<{ id: string }>();
  const postingId = param.id;
  const [deskripsi, setDeskripsi] = useState("");

  return (
    <>
      <Stack>
        <Textarea
          label={"Kirimkan Laporan"}
          placeholder="Ketik laporan anda tentang postingan ini ..."
          minRows={5}
          onChange={(val) => {
            setDeskripsi(val.currentTarget.value);
          }}
        />
        <ButtonAction
          postingId={postingId}
          deskripsi={deskripsi}
          userLoginId={userLoginId}
        />
      </Stack>
    </>
  );
}

function ButtonAction({
  postingId,
  deskripsi,
  userLoginId,
}: {
  postingId: string;
  deskripsi: string;
  userLoginId: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onReport() {
    try {
      setIsLoading(true);
      const report = await forum_funCreateReportPostingLainnya(
        postingId,
        deskripsi
      );
      if (report.status === 201) {
        ComponentGlobal_NotifikasiBerhasil(report.message);
        router.back();

        const dataNotif = {
          appId: postingId,
          pesan: deskripsi,
          kategoriApp: "FORUM",
          title: "Lainnya",
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
      setIsLoading(false);
      clientLogger.error("Error create report posting", error);
    }
  }
  return (
    <>
      <Group position="apart" grow>
        <Button
          style={{
            transition: "0.5s",
          }}
          disabled={isLoading}
          radius={"xl"}
          onClick={() => router.replace(RouterForum.report_posting + postingId)}
        >
          Batal
        </Button>
        <Button
          loading={isLoading}
          loaderPosition="center"
          style={{
            transition: "0.5s",
          }}
          disabled={deskripsi === ""}
          radius={"xl"}
          color="orange"
          onClick={() => onReport()}
        >
          Report
        </Button>
      </Group>
    </>
  );
}
