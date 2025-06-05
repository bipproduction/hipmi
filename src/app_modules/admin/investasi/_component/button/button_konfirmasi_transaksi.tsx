"use client";

import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import {
  notifikasiToUser_funCreate
} from "@/app_modules/notifikasi/fun";
import { IRealtimeData } from "@/lib/global_state";
import { clientLogger } from "@/util/clientLogger";
import { Button, Group } from "@mantine/core";
import { IconBan, IconCircleCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WibuRealtime } from "wibu-pkg";
import {
  adminInvestasi_funAcceptTransaksiById,
  adminInvestasi_funRejectInvoiceById
} from "../../fun";

export function AdminInvestasi_ComponentButtonKonfirmasiTransaksi({
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
  const router = useRouter()
  const [isLoadingAccpet, setLoadingAccept] = useState(false);
  const [isLoadingReject, setLoadingReject] = useState(false);

  async function onReject() {
    try {
      setLoadingReject(true);

      const res = await adminInvestasi_funRejectInvoiceById({ invoiceId });
      if (res.status == 200) {
        const notifikasiInvestor: IRealtimeData = {
          appId: invoiceId as string,
          userId: res.userId as string,
          status: res.statusName as any,
          pesan: "Transaksi anda gagal, coba hubungi admin",
          kategoriApp: "INVESTASI",
          title: "Transaksi Gagal",
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

          
          ComponentAdminGlobal_NotifikasiBerhasil(res.message);
          router.back();
        }
      } else {
        ComponentAdminGlobal_NotifikasiGagal(res.message);
      }
    } catch (error) {
      clientLogger.error("Error rejected investasi:", error);
    } finally {
      setLoadingReject(false);
    }
  }

  async function onAccept() {
    try {
      setLoadingAccept(true);
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

        // const dataTransaksi = await adminInvestasi_funGetAllTransaksiById({
        //   investasiId,
        //   page: 1,
        // });
        // onLoadData?.(dataTransaksi);

        
        ComponentAdminGlobal_NotifikasiBerhasil(res.message);
        router.back();
      }
    } catch (error) {
      clientLogger.error("Error accept invoice", error);
    } finally {
      setLoadingAccept(false);
    }
  }

  return (
    <>
      <Group position="center">
        <Button
          loaderPosition="center"
          loading={isLoadingAccpet}
          leftIcon={<IconCircleCheck />}
          radius={"xl"}
          color="green"
          onClick={() => {
            onAccept();
          }}
        >
          Terima
        </Button>
        <Button
          loaderPosition="center"
          loading={isLoadingReject}
          leftIcon={<IconBan />}
          radius={"xl"}
          color="red"
          onClick={() => onReject()}
        >
          Tolak
        </Button>
      </Group>
    </>
  );
}
