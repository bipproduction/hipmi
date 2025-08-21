"use client";

import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { notifikasiToUser_funCreate } from "@/app_modules/notifikasi/fun";
import { IRealtimeData } from "@/lib/global_state";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import {
  adminInvestasi_funAcceptTransaksiById
} from "../../fun";

export function AdminInvestasi_ComponentButtonBandingTransaksi({
  invoiceId,
  investasiId,
  lembarTerbeli,
  onLoadData,
}: {
  invoiceId: string;
  investasiId: string;
  lembarTerbeli: string;
  onLoadData?: (val: any) => void;
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  async function onAccept() {
    const res = await adminInvestasi_funAcceptTransaksiById({
      invoiceId,
      investasiId,
      lembarTerbeli,
    });

    if (res.status == 200) {
      const dataNotifikasi: IRealtimeData = {
        appId: investasiId,
        status: res.data?.dataInvestasi?.MasterStatusInvestasi?.name as any,
        userId: res.data?.dataInvestasi.authorId as string,
        pesan: "Cek investasi anda, Anda memiliki investor baru",
        kategoriApp: "INVESTASI",
        title: "Investor baru",
      };

      const notif = await notifikasiToUser_funCreate({
        data: dataNotifikasi as any,
      });

      if (notif.status === 201) {
        WibuRealtime.setData({
          type: "notification",
          pushNotificationTo: "USER",
          dataMessage: dataNotifikasi,
        });
      }

      const notifikasiInvestor: IRealtimeData = {
        appId: res.data?.dataInvestor.id as string,
        status: "Berhasil",
        userId: res.data?.dataInvestor.authorId as string,
        pesan: "Selamat, anda telah menjadi investor baru",
        kategoriApp: "INVESTASI",
        title: "Investasi berhasil",
      };

      const notifToInvestor = await notifikasiToUser_funCreate({
        data: notifikasiInvestor as any,
      });

      if (notifToInvestor.status === 201) {
        WibuRealtime.setData({
          type: "notification",
          pushNotificationTo: "USER",
          dataMessage: notifikasiInvestor,
        });
      }

      ComponentAdminGlobal_NotifikasiBerhasil(res.message);
      router.back();
    }
  }

  return (
    <>
      <Button
        radius={"xl"}
        color="orange"
        onClick={() => {
          onAccept();
        }}
      >
        Banding Diterima
      </Button>
    </>
  );
}
