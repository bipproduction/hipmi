"use client";

import { ComponentAdminGlobal_NotifikasiBerhasil } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_berhasil";
import { ComponentAdminGlobal_NotifikasiGagal } from "@/app_modules/admin/_admin_global/admin_notifikasi/notifikasi_gagal";
import { Box, Button, Flex, Stack } from "@mantine/core";
import { IconBan, IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import {
  adminInvestasi_funAcceptTransaksiById,
  adminInvestasi_funGetAllTransaksiById,
  adminInvestasi_funRejectInvoiceById,
} from "../../fun";
import { clientLogger } from "@/util/clientLogger";
import { IRealtimeData } from "@/lib/global_state";
import {
  notifikasiToAdmin_funCreate,
  notifikasiToUser_funCreate,
} from "@/app_modules/notifikasi/fun";
import { WibuRealtime } from "wibu-pkg";
import { useRouter } from "next/navigation";

export function AdminInvestasi_ComponentButtonKonfirmasiTransaksi({
  invoiceId,
  investasiId,
  lembarTerbeli,

}: {
  invoiceId: string;
  investasiId: string;
  lembarTerbeli: string;

}) {
  const [isLoadingAccpet, setLoadingAccept] = useState(false);
  const [isLoadingReject, setLoadingReject] = useState(false);
  const router = useRouter();

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
        }
        router.back();
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
        ComponentAdminGlobal_NotifikasiBerhasil(res.message);
        router.back();
      }
    } catch (error) {
      clientLogger.error("Error accept invoice", error);
      setLoadingAccept(false);
    } finally {
      setLoadingAccept(false);
    }
  }

  return (
    <>
      <Flex px={135} align={"center"} justify={"center"} gap={"md"} >
        <Box>
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
        </Box>
        <Box>
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
        </Box>
      </Flex>
    </>
  );
}
